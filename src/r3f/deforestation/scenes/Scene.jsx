import React, { Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import Staging from '../staging/Staging';
import Terrain from '../meshes/Terrain';
import Platform from '../meshes/Platform';
import Desk from '../meshes/Desk';
import Laptop from '../meshes/Laptop';
import Printer from '../meshes/Printer';
import PhoneBody from '../meshes/PhoneBody';
import PhoneHandle from '../meshes/PhoneHandle';
import AmbientLight from '../lights/AmbientLight';
import DirectionalLight from '../lights/DirectionalLight';
import Trees from '../meshes/Trees';
import styles from './Scene.module.css';
import OneWoodSign from '../meshes/OneWoodSign';
import BigIrregularSign from '../meshes/BigIrregularSign';
import BackNextArrows from '../meshes/BackNextArrows';
import CameraController from '../controllers/CameraController';
import CameraLogger from '../../utils/CameraLogger';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/use-auth-store';
import { Loader, PositionalAudio } from '@react-three/drei';


const Scene = ({ ready}) => {
  const terrainRef = useRef();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const audioRef = useRef();

  const handleTerrainLoad = useCallback((terrain) => {
    terrainRef.current = terrain;
    console.log("Terrain loaded", terrain);
  }, []);

  const handleLogout = useCallback(async() => {
      await logout();
      navigate('/'); // Navega a "/" después de desloguearse
  }, [logout], [navigate]);

  const cameraStatesSet1 = [
    {
      position: { x: 17.895, y: 21, z: -45.858},
      target: { x: 16.1, y: 21, z: -42},
      // target: { x:-3, y: 20, z: 0},
      minDistance: 3,
      maxDistance: 55,
    },
    {
      position: { x: 46.12, y: 4.94, z: -28.44 },
      target: { x: 42.6, y: 4.5, z: -25.8 },
      minDistance: 3,
      maxDistance: 5,
    },
    {
      position: { x: 32.842379721055174, y: 20.361752278322804, z: 44.614349325416484 },
      target: { x: 30.05, y: 21.0, z: 41 },
      minDistance: 2,
      maxDistance: 8,
    },
  ];

  const cameraStatesSet2 = [
    {
      position: { x: 17.895, y: 21, z: -48.858},
      target: { x: 17.895, y: 20, z: -45.858},
      minDistance: 1,
      maxDistance: 8,
    },
    {
      position: { x: 20.097741955824603, y: 20.2, z: -46.2096748619},
      target: { x: 19.95, y: 20.05, z: -45.30},
      minDistance: 1,
      maxDistance: 2,
    },
    {
      position: { x: 19.594912373471416, y: 20.266932236068055, z: -46.529617574715886},
      target: { x: 19.05, y: 20.14, z: -45.65},
      minDistance: 1,
      maxDistance: 2,
    },
    {
      position: { x: 19.47957256085322, y: 20.28159496741572, z: -47.28132092043356},
      target: { x: 19.1, y: 19.95, z: -46.7},
      minDistance: 1,
      maxDistance: 5,
    },
  ];

  // State to control the active set and index within the set
  const [stateIndex, setStateIndex] = useState(0);
  const [activeSet, setActiveSet] = useState(1); // 1 for set 1, 2 for set 2

  // Determine the current set based on activeSet
  const currentCameraStates = activeSet === 1 ? cameraStatesSet1 : cameraStatesSet2;
  const currentState = currentCameraStates[stateIndex];

  // Handlers for switching camera states within the active set
  const handleNext = useCallback(() => {
    setStateIndex((prevIndex) => (prevIndex + 1) % currentCameraStates.length);
  }, [currentCameraStates.length]);

  const handleBack = useCallback(() => {
    setStateIndex((prevIndex) => (prevIndex - 1 + currentCameraStates.length) % currentCameraStates.length);
  }, [currentCameraStates.length]);

  const handleStartQuiz = useCallback(() => {
    toggleCameraSet();
  }, []);

  // Function to toggle between the two sets
  const toggleCameraSet = () => {
    setActiveSet((prevSet) => (prevSet === 1 ? 2 : 1));
    setStateIndex(0); // Reset to the first state in the new set
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setStateIndex(0); // Reset to initial state
      } else if (event.key === 'ArrowRight' && activeSet === 1) {
        // handleNext();
        handleBack();
      } else if (event.key === 'ArrowLeft' && activeSet === 1) {
        // handleBack();
        handleNext();
      } else if (event.key === 'ArrowRight' && activeSet === 2) {
        handleNext();
        // handleBack();
      } else if (event.key === 'ArrowLeft' && activeSet === 2) {
        handleBack();
        // handleNext();
      } else if (event.key === 'Enter') {
         // Switch between sets on Enter key
         toggleCameraSet();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleBack, toggleCameraSet]);

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let startTime = 0;
    const SWIPE_THRESHOLD = 75;
    const SWIPE_DURATION_THRESHOLD = 300;
  
    const handleTouchStart = (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      startTime = Date.now();
    };
  
    const handleTouchMove = (event) => {
      endX = event.touches[0].clientX;
      endY = event.touches[0].clientY;
    };
  
    const handleTouchEnd = () => {
      const deltaX = startX - endX;
      const deltaY = startY - endY;
      const duration = Date.now() - startTime;
  
      // Check if swipe is primarily horizontal and exceeds the threshold
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD && activeSet === 1 &&
      duration < SWIPE_DURATION_THRESHOLD) {
        if (deltaX > 0) {
          // Swipe left for next camera state
          // handleNext();
          handleBack();
        } else {
          // Swipe right for previous camera state
          // handleBack();
          handleNext();
        }
      }

      // Check if swipe is primarily horizontal and exceeds the threshold
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD && activeSet === 2 &&
      duration < SWIPE_DURATION_THRESHOLD) {
        if (deltaX > 0) {
          // Swipe left for next camera state
          handleNext();
          // handleBack();
        } else {
          // Swipe right for previous camera state
          handleBack();
          // handleNext();
        }
      }
      // Reset start and end positions
      startX = 0;
      startY = 0;
      endX = 0;
      endY = 0;
      startTime = 0;
    };
  
    // Attach touch listeners to the Canvas or a specific div to avoid conflicts
    const canvasElement = document.querySelector('canvas');
    if (canvasElement) {
      canvasElement.addEventListener("touchstart", handleTouchStart);
      canvasElement.addEventListener("touchmove", handleTouchMove);
      canvasElement.addEventListener("touchend", handleTouchEnd);
    }
  
    return () => {
      if (canvasElement) {
        canvasElement.removeEventListener("touchstart", handleTouchStart);
        canvasElement.removeEventListener("touchmove", handleTouchMove);
        canvasElement.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [handleNext, handleBack]);

  return (
    <div className={styles.pageContainer}>
      <Canvas shadows camera={{ 
        position: [currentState.position.x,currentState.position.y-3.5,currentState.position.z-1],
        fov: 70 }}
      >
        <CameraLogger />
        <CameraController 
          target={currentState.target}
          position={currentState.position}
          minDistance={currentState.minDistance}
          maxDistance={currentState.maxDistance}
        />
        <Staging/>
        {/* <ambientLight intensity={0.5} /> */}
        <AmbientLight intensity={1.5} color="#ffffff" />
        <DirectionalLight intensity={2} position={[30, 50, 20]}/>
        <Terrain onTerrainLoad={handleTerrainLoad} />
        <Trees terrain={terrainRef} amount_rows={12} amount_cols={16} phase_x={0} phase_z={0} space={6}/>
        <BackNextArrows 
          position={[15,18.48,-42]} 
          rotation={[0,Math.PI*(11/12),0]} 
          onNextClick={handleNext} 
          onBackClick={handleLogout}
          textNext={"Explore the forest"}
          textBack={"Sign Out"}
        />
        <OneWoodSign 
          position={[42,2.9,-26]} 
          rotation={[0,Math.PI*(8/12),0]} 
          text={"Deforestation is a global challenge, but together, we can make a difference. Discover how to protect our forests!"}
        />
        <BackNextArrows 
          position={[43,2.9,-25]} 
          rotation={[0,Math.PI*(8/12),0]} 
          onNextClick={handleNext} 
          onBackClick={handleBack}
          textNext={"Continue"}
          textBack={"Back"}
        />
        <BigIrregularSign 
          position={[30, 18.65, 40]} 
          rotation={[0,Math.PI*(2.5/12),0]}
          text={"Forests are essential for a balanced planet, providing clean air, habitats, and climate stability. While deforestation poses a serious threat, every action counts. Join this quiz to learn how you can help protect our forests and play a part in restoring Earth's natural balance!"}
        />
        <BackNextArrows 
          position={[29.0, 18.550, 41.5]} 
          rotation={[0,Math.PI*(2.5/12),0]} 
          onNextClick={handleStartQuiz} 
          onBackClick={handleBack}
          textNext={"Start Quiz"}
          textBack={"Back"}
        />
        {ready && (
          <>
            <group position={[25, 25, 10]}>
              <PositionalAudio
                ref={audioRef}
                autoplay
                loop
                url="/sounds/nature.mp3"
                distance={5}
              />
            </group>
            <group position={[-25, 25, -10]}>
              <PositionalAudio
                ref={audioRef}
                autoplay
                loop
                url="/sounds/nature2.mp3"
                distance={7}
              />
            </group>
          </>
        )}
        <Platform position={[16.895, 19, -45.858]}/>
        <Desk position={[19.7, 19.2, -46.2]} rotation={[0,Math.PI,0]}/>
        <Laptop position={[20, 19.95, -45.75]} rotation={[0,Math.PI,0]}/>
        <Printer position={[18.98, 20.14, -45.65]} rotation={[0,Math.PI*3/4,0]}/>
        <PhoneBody position={[19.1, 19.95, -46.7]} rotation={[0,Math.PI*2/4,0]}/>
        <PhoneHandle position={[19.1, 19.95, -46.7]} rotation={[0,Math.PI*2/4,0]}/>
      </Canvas>
      <Loader />
    </div>
  );
};

export default Scene;