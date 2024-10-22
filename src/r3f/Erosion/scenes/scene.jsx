import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Terrain from '/src/r3f/Erosion/3d-models/terrain.jsx';
import Field from '/src/r3f/Erosion/3d-models/field.jsx';
import Tumbleweed from '/src/r3f/Erosion/3d-models/tumbleweed.jsx';
import Tree from '/src/r3f/Erosion/3d-models/tree.jsx';
import Desert_low_poly from '/src/r3f/Erosion/3d-models/desert-low-poly';
import Low_poly_field from '/src/r3f/Erosion/3d-models/low-poly-field';

const Scene = () => {
  const terrainRef = useRef();

  const handleTerrainLoad = (terrain) => {
    terrainRef.current = terrain;
    console.log('Terrain loaded', terrain);
  };
  const fieldRef = useRef();

  const handleFieldLoad = (field) => {
    fieldRef.current = field;
    console.log('Field loaded', field);
  };

  const desertRef = useRef();

  const handleDesertLoad = (Desert_low_poly) => {
    desertRef.current = Desert_low_poly;
    console.log('desert loaded', Desert_low_poly);
  };

  const LPfieldRef = useRef();

  const handleLPfieldLoad = (Low_poly_field) => {
    LPfieldRef.current = Low_poly_field;
    console.log('Field loaded', Low_poly_field);
  };

  return (
    <Canvas shadows camera={{ position: [-1.5, 0.7, 0] }}>

      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} castShadow />

      <Tumbleweed position={[0.1, 0.04, 0.1]} scale={[0.01, 0.01, 0.01]} />

      <Tree position={[0.1, 0.04, -1.2]} scale={[0.0027, 0.0027, 0.0027]} />

      <Terrain onTerrainLoad={handleTerrainLoad} position={[0, 0, 0]} />

      <Field onFieldLoad={handleFieldLoad} position={[0, 0, -0.9]} />

      <Desert_low_poly onDesertLoad={handleDesertLoad} position={[-2, 0, 0]} />

      <Low_poly_field onLPfieldLoad={handleLPfieldLoad} position={[-2, 0, -0.9]} scale={[0.00005, 0.00005, 0.00005]}/>


      <OrbitControls />
    </Canvas>
  );
};

export default Scene;