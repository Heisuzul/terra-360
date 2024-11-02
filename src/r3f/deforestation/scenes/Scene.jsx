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

  const cameraStates = [
    {
      position: { x: 17.895, y: 21, z: -45.858},
      target: { x:-3, y: 20, z: 0},
    },
    {
      position: { x: 46.12, y: 4.94, z: -28.44 },
      target: { x: 42.6, y: 4.5, z: -25.8 },
    },
    {
      position: { x: 33.476, y: 21.296, z: 45.260 },
      target: { x: 29.1, y: 19.9, z: 40 },
    },
    {
      position: { x: 17.895, y: 21, z: -48.858},
      target: { x: 17.895, y: 20, z: -45.858},
    },
  ];

  const [stateIndex, setStateIndex] = useState(0);

  const currentState = cameraStates[stateIndex];
  
  const handleNext = useCallback(() => {
    setStateIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= cameraStates.length ? 0 : nextIndex;
    });
  }, []);

  const handleBack = useCallback(() => {
    setStateIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? cameraStates.length - 1 : nextIndex;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setStateIndex(0); // Reset to initial camera state
        console.log('Reset camera state');
      } else if (event.key === 'ArrowRight') {
        handleBack();
      } else if (event.key === 'ArrowLeft') {
        handleNext();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleBack]);

  return (
    <div className={styles.pageContainer}>
      <Canvas shadows camera={{ 
        position: [currentState.position.x,currentState.position.y-3.5,currentState.position.z-1],
        fov: 70 }}
      >
        {/* <CameraLogger /> */}
        <CameraController 
          target={currentState.target}
          position={currentState.position}
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
          position={[28.5, 18.550, 41.5]} 
          rotation={[0,Math.PI*(2.5/12),0]} 
          onNextClick={handleNext} 
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