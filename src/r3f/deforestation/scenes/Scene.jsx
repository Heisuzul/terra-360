import React, { Suspense, useRef, useState, useCallback } from 'react';
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

const Scene = () => {
  const terrainRef = useRef();

  const handleTerrainLoad = useCallback((terrain) => {
    terrainRef.current = terrain;
    console.log("Terrain loaded", terrain);
  }, []);

  const cameraStates = [
    {
      position: { x: 18.23, y: 22.84, z: -45.42 },
      // target: { x: 17.5, y: 20, z: -42.42 },
      target: { x: 0, y: 0, z: 0 },
    },
    {
      position: { x: 46.12, y: 4.94, z: -28.44 },
      target: { x: 42, y: 4.5, z: -26 },
    },
    {
      position: { x: 32.69, y: 20.98, z: 44.07 },
      target: { x: 30, y: 19.9, z: 40 },
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

  return (
    <div className={styles.pageContainer}>
      <Canvas shadows camera={{ position: [18.23, 22.84, -45.42], fov: 70 }}>
        <Suspense fallback={null}>
          <CameraLogger />
          <CameraController 
            target={currentState.target}
            position={currentState.position}
          />
          <Staging/>
          <ambientLight intensity={0.5} />
          {/* <OrbitControls /> */}
          <AmbientLight intensity={1.5} color="#ffffff" />
          <DirectionalLight intensity={2} position={[30, 50, 20]}/>
          <mesh name="ball" position={[-2, 10, 0]} scale={2} metallness={0.1} castShadow>
            <sphereGeometry args={[1, 16, 32]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
          <Terrain onTerrainLoad={handleTerrainLoad} />
          <Trees terrain={terrainRef} amount_rows={12} amount_cols={16} phase_x={0} phase_z={0} space={6}/>
          <BackNextArrows position={[15,18.48,-42]} rotation={[0,Math.PI*(11/12),0]} onNextClick={handleNext} onBackClick={handleBack}/>
          <OneWoodSign position={[42,2.9,-26]} rotation={[0,Math.PI*(8/12),0]}/>
          <BackNextArrows position={[43,2.9,-25]} rotation={[0,Math.PI*(8/12),0]} onNextClick={handleNext} onBackClick={handleBack}/>
          <BigIrregularSign position={[30, 18.9, 40]} rotation={[0,Math.PI*(2.5/12),0]}/>
          <BackNextArrows position={[28.5, 18.6, 41.5]} rotation={[0,Math.PI*(2.5/12),0]} onNextClick={handleNext} onBackClick={handleBack}/>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;