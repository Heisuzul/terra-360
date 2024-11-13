import React from 'react';
import DesertLowPoly from '/src/r3f/Erosion/meshes/desert-low-poly';

/**
 * Terrain component that renders multiple instances of the DesertLowPoly mesh.
 * This component is designed to represent the terrain in a desert environment.
 * 
 * @param {Function} handleDesertLoad - Callback function to handle loading of desert meshes.
 * 
 * @returns {JSX.Element} A group of desert terrain meshes positioned and rotated appropriately.
 */
const Terrain = ({ handleDesertLoad }) => {
  return (
    <group receiveShadow>
      {/* Render the first DesertLowPoly mesh at the origin */}
      <DesertLowPoly onDesertLoad={handleDesertLoad} position={[0, 0, 0]} scale={[1, 1, 1]} />
      
      {/* Render the second DesertLowPoly mesh at a specified position */}
      <DesertLowPoly onDesertLoad={handleDesertLoad} position={[-0.9, -0.03, 0]} scale={[1, 1, 1]} />
      
      {/* Render the third DesertLowPoly mesh, rotated 180 degrees around the Y-axis */}
      <DesertLowPoly onDesertLoad={handleDesertLoad} position={[0, 0, -0.9]} rotation={[0, Math.PI, 0]} scale={[1, 1, 1]} />
      
      {/* Render the fourth DesertLowPoly mesh, rotated and positioned accordingly */}
      <DesertLowPoly onDesertLoad={handleDesertLoad} position={[-0.9, -0.03, -0.9]} rotation={[0, Math.PI, 0]} scale={[1, 1, 1]} />
    </group>
  );
};

export default Terrain;