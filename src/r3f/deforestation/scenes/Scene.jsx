import React, { Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import Staging from '../staging/Staging';
import Terrain from '../meshes/Terrain';
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

const Scene = ({ ready, setReady }) => {
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
    }
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stateIndex]);

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
        <ambientLight intensity={0.5} />
        <AmbientLight intensity={1.5} color="#ffffff" />
        <DirectionalLight intensity={2} position={[30, 50, 20]}/>
        <Terrain onTerrainLoad={handleTerrainLoad} />
        <Trees terrain={terrainRef} setReady={setReady} amount_rows={12} amount_cols={16} phase_x={0} phase_z={0} space={6}/>
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
          position={[30, 18.9, 40]} 
          rotation={[0,Math.PI*(2.5/12),0]}
          text={"Forests are essential for a balanced planet, providing clean air, habitats, and climate stability. While deforestation poses a serious threat, every action counts. Join this quiz to learn how you can help protect our forests and play a part in restoring Earth's natural balance!"}
        />
        <BackNextArrows 
          position={[28.5, 18.6, 41.5]} 
          rotation={[0,Math.PI*(2.5/12),0]} 
          onNextClick={handleNext} 
          onBackClick={handleBack}
          textNext={"Start Quiz"}
          textBack={"Back"}
        />
        {ready && (
          <group position={[0, 25, 0]}>
            <PositionalAudio
              ref={audioRef}
              autoplay
              loop
              url="/sounds/nature.mp3"
              distance={6}
            />
          </group>
        )}
      </Canvas>
      <Loader />
    </div>
  );
};

export default Scene;