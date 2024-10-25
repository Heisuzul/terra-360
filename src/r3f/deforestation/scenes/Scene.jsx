import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Staging from '../staging/Staging';
import Terrain from '../meshes/Terrain';
import AmbientLight from '../lights/AmbientLight';
import DirectionalLight from '../lights/DirectionalLight';
import PathsSign from '../meshes/PathsSign';
import Trees from '../meshes/Trees';
import styles from './Scene.module.css';
import OneWoodSign from '../meshes/OneWoodSign';
import BigIrregularSign from '../meshes/BigIrregularSign';
import BackNextArrows from '../meshes/BackNextArrows';

function CameraLogger() {
  const { camera } = useThree();
  const [lastLogged, setLastLogged] = useState(0); // Track the last logged time
  const delay = 1000; // Log the camera position every 1000ms (1 second)
  const timer = useRef(0); // Ref to hold the timer

  useFrame(() => {
    // Get the current time
    const currentTime = performance.now();

    // If the time since last log exceeds the delay, log the camera position
    if (currentTime - lastLogged > delay) {
      console.log("Camera position:", camera.position);
      console.log("Camera rotation:", camera.rotation);

      setLastLogged(currentTime); // Update the last logged time
    }
  });

  return null; // No visual output needed
}

const Scene = () => {
  const terrainRef = useRef();

  const handleTerrainLoad = (terrain) => {
    terrainRef.current = terrain;
    console.log("Terrain loaded", terrain);
  };

  const handleNext = () => {
    console.log("Next clicked");
  };

  const handleBack = () => {
    console.log("Back clicked");
  };

  return (
    <div className={styles.pageContainer}>
      <Canvas shadows camera={{ position: [18.23, 22.84, -45.42], fov: 70 }}>
        <Suspense fallback={null}>
          {/* <CameraLogger /> */}
          <Staging/>
          <ambientLight intensity={0.5} />
          <OrbitControls />
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