import React, { Suspense, useRef, useState, useCallback, useEffect, useMemo } from 'react';
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
import InteractiveBlade from '../meshes/InteractiveBlade';
import SmallTable from '../meshes/SmallTable';
import RedValve from '../meshes/RedValve';
import OrangeBird from '../meshes/OrangeBird';
import FloatingText from '../meshes/FloatingText';
import CameraController from '../controllers/CameraController';
import CameraLogger from '../../utils/CameraLogger';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/use-auth-store';
import { Loader, PositionalAudio, Sparkles, Text3D } from '@react-three/drei';
import { Physics } from "@react-three/rapier";
import { Vector3 } from 'three';

const Scene = ({ ready, isMuted }) => {
  const terrainRef = useRef();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const audioBackgroundRef1 = useRef();
  const audioBackgroundRef2 = useRef();
  const audioBackgroundRef3 = useRef();
  const printerRef = useRef();
  const treesRef = useRef(null);
  const floatingTextRef = useRef();
  const floatingTextRef2 = useRef();
  const floatingTextRef3 = useRef();
  const floatingTextRef4 = useRef();
  const [blades, setBlades] = useState([]);
  const cameraControllerRef = useRef();
  const [treesShown, setTreesShown] = useState(true);

  const handleTerrainLoad = useCallback((terrain) => {
    terrainRef.current = terrain;
    console.log("Terrain loaded", terrain);
  }, []);

  const handleLogout = useCallback(async() => {
      localStorage.clear();
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
      position: { x: 17.737703958511364, y: 20.391742664204138, z: -46.84625729877702 },
      // position: { x: 17.895, y: 21, z: -48.858},
      target: { x: 17.5, y: 19.972, z: -45.856 },
      minDistance: 1,
      maxDistance: 4,
    },
    {
      position: { x: 20.097741955824603, y: 20.2, z: -46.2096748619},
      target: { x: 19.95, y: 20.05, z: -45.30},
      minDistance: 1,
      maxDistance: 4,
    },
    {
      // position: { x: 19.594912373471416, y: 20.266932236068055, z: -46.529617574715886},
      position: { x: 19.546187522229683, y: 20.355783900403754, z: -46.54106880552209},
      target: { x: 19.05, y: 20.14, z: -45.65},
      minDistance: 1,
      maxDistance: 4,
    },
    {
      position: { x: 19.47957256085322, y: 20.28159496741572, z: -47.28132092043356},
      target: { x: 19.1, y: 19.95, z: -46.7},
      minDistance: 1,
      maxDistance: 4,
    },
  ];

  // State to control the active set and index within the set
  const [stateIndex, setStateIndex] = useState(0);
  const [activeSet, setActiveSet] = useState(1); // 1 for set 1, 2 for set 2

  // Determine the current set based on activeSet
  const currentCameraStates = activeSet === 1 ? cameraStatesSet1 : cameraStatesSet2;
  const currentState = currentCameraStates[stateIndex];

  const memoizedPosition = useMemo(() => currentState.position, [currentState.position]);
  const memoizedTarget = useMemo(() => currentState.target, [currentState.target]);
  const memoizedMinDistance = useMemo(() => currentState.minDistance, [currentState.minDistance]);
  const memoizedMaxDistance = useMemo(() => currentState.maxDistance, [currentState.maxDistance]);

  // Example function to enable or disable camera controls
  const toggleCameraControls = (enabled) => {
    cameraControllerRef.current.enableControls(enabled);
  };

  // Handlers for switching camera states within the active set
  const handleNext = useCallback(() => {
    if(activeSet === 1){
      setStateIndex((prevIndex) => (prevIndex + 1) % currentCameraStates.length);
    }
  }, [currentCameraStates.length]);

  const handleBack = useCallback(() => {
    if(activeSet === 1){
      setStateIndex((prevIndex) => (prevIndex - 1 + currentCameraStates.length) % currentCameraStates.length);
    }
  }, [currentCameraStates.length]);

    // Handlers for switching camera states within the active set
    const handleKeyboardNext = useCallback(() => {
      setStateIndex((prevIndex) => (prevIndex + 1) % currentCameraStates.length);
    }, [currentCameraStates.length]);
  
    const handleKeyboardBack = useCallback(() => {
      setStateIndex((prevIndex) => (prevIndex - 1 + currentCameraStates.length) % currentCameraStates.length);
    }, [currentCameraStates.length]);

  const handleStartQuiz = useCallback(() => {
    toggleCameraSet();
  }, []);

  // Function to toggle between the two sets
  const toggleCameraSet = () => {
    setActiveSet((prevSet) => (prevSet === 1 ? 2 : 1));
    setStateIndex(0); // Reset to the first state in the new set

    // Enable to export tree positions
    // if (treesRef.current) {
    //   const positions = treesRef.current.exportPositions();
    //   console.log(positions);
    // }
  };

  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setStateIndex(0); // Reset to initial state
      } else if (event.key === 'm') {
        if (audioBackgroundRef1.current && audioBackgroundRef2.current && audioBackgroundRef3.current) {
          if (isAudioPlaying) {
            audioBackgroundRef1.current.pause();
            audioBackgroundRef2.current.pause();
            audioBackgroundRef3.current.pause();
          } else {
            audioBackgroundRef1.current.play();
            audioBackgroundRef2.current.play();
            audioBackgroundRef3.current.play();
          }
        }
        setIsAudioPlaying(!isAudioPlaying);
      } else if (event.key === 'ArrowRight' && activeSet === 1) {
        if (stateIndex === 0){
          toggleCameraSet();
        } else {
          // handleKeyboardNext();
          handleKeyboardBack();
        }
      } else if (event.key === 'ArrowLeft' && activeSet === 1) {
        if (activeSet === 1 && stateIndex === 2){
          toggleCameraSet();
        } else {
          // handleKeyboardBack();
          handleKeyboardNext();
        }
      } else if (event.key === 'ArrowRight' && activeSet === 2) {
        // if (stateIndex === 0){
        //   toggleCameraSet();
        // } else {
          handleKeyboardNext();
          // handleKeyboardBack();
        // }
      } else if (event.key === 'ArrowLeft' && activeSet === 2) {
        handleKeyboardBack();
        // handleNext();
      } else if (event.key === 'Enter') {
         // Switch between sets on Enter key
         toggleCameraSet();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleBack, toggleCameraSet, setIsAudioPlaying, isAudioPlaying]);

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
          // handleKeyboardNext();
          handleKeyboardBack();
        } else {
          // Swipe right for previous camera state
          // handleKeyboardBack();
          handleKeyboardNext();
        }
      }

      // Check if swipe is primarily horizontal and exceeds the threshold
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD && activeSet === 2 &&
      duration < SWIPE_DURATION_THRESHOLD) {
        if (deltaX > 0) {
          // Swipe left for next camera state
          handleKeyboardNext();
          // handleKeyboardBack();
        } else {
          // Swipe right for previous camera state
          handleKeyboardBack();
          // handleKeyboardNext();
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

  const handlePlatformClick = useCallback((event) => {
    event.stopPropagation();
    toggleCameraSet();
  });

  const handleDoubleClick = useCallback((targetIndex) => (event) => {
    event.stopPropagation();
    if (activeSet === 2) {
    setStateIndex(targetIndex);
    } else {
      event.stopPropagation();
    }
  });

  useEffect(() => {
    if (audioBackgroundRef1.current && audioBackgroundRef2.current && audioBackgroundRef3.current) {
      if (isMuted) {
        audioBackgroundRef1.current.pause();
        audioBackgroundRef2.current.pause();
        audioBackgroundRef3.current.pause();
      } else {
        audioBackgroundRef1.current.play();
        audioBackgroundRef2.current.play();
        audioBackgroundRef3.current.play();
      }
    }
    setIsAudioPlaying(!isAudioPlaying);
  }, [isMuted]);

  const handleRedValveClick = () => {
    const newBlade = {
      id: Date.now(),
      position: [
        17.9 + (Math.random() - 0.5) * 0.5,  // Random X offset
        22 + (Math.random() - 0.5) * 0.5,    // Random Y offset
        -45.858 + (Math.random() - 0.5) * 0.5 // Random Z offset
      ],
      scale: 1
    };
    setBlades(prevBlades => [...prevBlades, newBlade]);
  };

  const handlePointerOver = useCallback(() => {
    if (floatingTextRef.current) {
      floatingTextRef.current.visible = true;
      setTimeout(() => {
        if (floatingTextRef.current) {
          floatingTextRef.current.visible = false;
        }
      }, 3000); // Adjust the duration as needed (3000ms = 3 seconds)
    }
  }, []);

  const handlePointerOver2 = useCallback(() => {
    if (floatingTextRef2.current) {
      floatingTextRef2.current.visible = true;
      setTimeout(() => {
        if (floatingTextRef2.current) {
          floatingTextRef2.current.visible = false;
        }
      }, 3000); // Adjust the duration as needed (3000ms = 3 seconds)
    }
  }, []);

  const handlePointerOver3 = useCallback(() => {
    if (floatingTextRef3.current) {
      floatingTextRef3.current.visible = true;
      setTimeout(() => {
        if (floatingTextRef3.current) {
          floatingTextRef3.current.visible = false;
        }
      }, 3000); // Adjust the duration as needed (3000ms = 3 seconds)
    }
  }, []);

  const handlePointerOver4 = useCallback(() => {
    if (floatingTextRef4.current) {
      floatingTextRef4.current.visible = true;
      setTimeout(() => {
        if (floatingTextRef4.current) {
          floatingTextRef4.current.visible = false;
        }
      }, 3000); // Adjust the duration as needed (3000ms = 3 seconds)
    }
  }, []);

  const handleTreesPuff = useCallback(() => {
    if (treesRef.current) {
      treesRef.current.puffTrees();
    }
  }, [treesRef])

  const handleTreesGrow = useCallback(() => {
    if (treesRef.current) {
      treesRef.current.growTrees();
    }
    setTreesShown(prev => !prev)
  }, [treesRef])

  return (
    <div className={styles.pageContainer}>
      <Canvas shadows camera={{ 
        position: [currentState.position.x,currentState.position.y-3.5,currentState.position.z-1],
        fov: 70 }}
      >
        {/* <CameraLogger /> */}
        <CameraController
          ref={cameraControllerRef}
          target={currentState.target}
          position={currentState.position}
          minDistance={currentState.minDistance}
          maxDistance={currentState.maxDistance}
        />
        <Staging/>
        {/* <ambientLight intensity={0.5} /> */}
        <AmbientLight intensity={1.5} color="#ffffff" />
        <DirectionalLight intensity={2} position={[30, 50, 20]}/>
        <Physics>
          <Terrain onTerrainLoad={handleTerrainLoad} />
          <Trees ref={treesRef} terrain={terrainRef} amount_rows={12} amount_cols={16} phase_x={0} phase_z={0} space={6}/>
          <BackNextArrows 
            position={[15,18.48,-42]} 
            rotation={[0,Math.PI*(11/12),0]} 
            onNextClick={handleNext} 
            onBackClick={handleLogout}
            onDoubleClick={handlePlatformClick}
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
          <Platform onDoubleClick={handleDoubleClick(0)} position={[16.895, 19, -45.858]}/>
          <Desk position={[19.7, 19.2, -46.2]} rotation={[0,Math.PI,0]}/>
          <Laptop onClick={handleDoubleClick(2)} externalRefs={[printerRef]} position={[20, 19.95, -45.75]} rotation={[0,Math.PI,0]}/>
          <Printer onDoubleClick={handleTreesPuff} onClick={handleDoubleClick(3)} ref={printerRef} position={[18.98, 20.14, -45.65]} rotation={[0,Math.PI*3/4,0]} onPointerOver={handlePointerOver4}/>
          <PhoneBody onClick={handleDoubleClick(4)} onPointerOver={handlePointerOver3} position={[19.1, 19.95, -46.7]} rotation={[0, Math.PI*2/4, 0]}/>
          <PhoneHandle 
            position={[19.1, 19.95, -46.7]} 
            rotation={[0, Math.PI*2/4, 0]}
            onDragStart={() => toggleCameraControls(false)}
            onDragEnd={() => toggleCameraControls(true)}
            onClick={handleDoubleClick(4)}
            sceneIndex={stateIndex}
          />
          <OrangeBird position={[14.95,20.412,-41.98]} rotation={[0,Math.PI/12*10,0]}
            onPointerOver={handlePointerOver}
            onClick={handleTreesGrow} 
          />
          { treesShown ? <FloatingText ref={floatingTextRef} text={'Clean the trees'} position={[14.9,20.6,-41.98]} /> : 
            <FloatingText ref={floatingTextRef} text={'Grow trees back'} position={[14.9,20.6,-41.98]} />}
          <FloatingText ref={floatingTextRef2} text={'Get Blades'} position={[17.5, 20.1, -45.856]} scale={0.5}/>
          <FloatingText ref={floatingTextRef3} text={'Pick Up'} position={[19.1, 20.1, -46.5]} scale={0.5} rotationDelta={-Math.PI/12*2}/>
          <FloatingText ref={floatingTextRef4} text={'Kill the Trees'} position={[19.7, 20.2, -45.1]} scale={0.5} rotationDelta={Math.PI/12*1}/>
          <SmallTable position={[17.5, 19.5, -45.858]} scale={0.3} onDoubleClick={handleDoubleClick(1)}/>
          <RedValve position={[17.5, 19.972, -45.856]} scale={0.005} onPointerOver={handlePointerOver2} onClick={handleRedValveClick} onDoubleClick={handleDoubleClick(1)}/>
          {blades.map(blade => (
            <InteractiveBlade 
              key={blade.id}
              position={blade.position}
              scale={blade.scale}
              onDragStart={() => toggleCameraControls(false)}
              onDragEnd={() => toggleCameraControls(true)}
            />
          ))}
        </Physics>
        {ready && (
            <>
              <group position={[25, 25, 10]}>
                <PositionalAudio
                  ref={audioBackgroundRef1}
                  autoplay
                  loop
                  url="/sounds/nature.mp3"
                  distance={5}
                />
              </group>
              <group position={[-25, 25, -10]}>
                <PositionalAudio
                  ref={audioBackgroundRef2}
                  autoplay
                  loop
                  url="/sounds/nature2.mp3"
                  distance={7}
                />
              </group>
              <group position={[14.95,20.412,-41.98]}>
                <PositionalAudio
                  ref={audioBackgroundRef3}
                  autoplay
                  loop
                  url="/sounds/bird-chirp-1.mp3"
                  distance={1}
                />
              </group>
            </>
          )}
        <Sparkles
          position={[25, 15, -25]}
          count= { 256 }
          speed= { 1 }
          opacity= { 0.7 }
          color= { "#ffd45e"}
          size= { 10 }
          scale= { [50, 30, 50]}
          noise= { 1}
        />
        <Sparkles
          position={[25, 20, 25]}
          count= { 256 }
          speed= { 1 }
          opacity= { 0.7 }
          color= { "#ffd45e"}
          size= { 10 }
          scale= { [50, 20, 50]}
          noise= { 1}
        />
        <Sparkles
          position={[-25, 20, -25]}
          count= { 256 }
          speed= { 1 }
          opacity= { 0.7 }
          color= { "#ffd45e"}
          size= { 10 }
          scale= { [50, 20, 50]}
          noise= { 1}
        />
      </Canvas>
      <Loader />
    </div>
  );
};

export default Scene;