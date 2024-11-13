import React from 'react';
import Pine from '/src/r3f/Erosion/meshes/pine-without-leaves';
import Tree from '/src/r3f/Erosion/meshes/tree-without-leaves';

// Function to generate a random position within specified ranges
const getRandomPosition = (xRange, zRange, yValue) => {
  // Generates a random x value within the specified x range
  const x = Math.random() * (xRange[1] - xRange[0]) + xRange[0];
  // Generates a random z value within the specified z range
  const z = Math.random() * (zRange[1] - zRange[0]) + zRange[0];
  // Returns the position in the format [x, y, z]
  return [x, yValue, z];
};

const DesertForest = () => {
  // Define ranges for random positions
  const xRange = [-1.3, -0.8]; // x-axis range
  const zRange = [-1.3, 0.3];  // z-axis range
  const yValue = 0.019; // Constant value for Y position

  return (
    <>
      {/* Render 10 pine trees at random positions */}
      {Array.from({ length: 10 }).map((_, index) => (
        <Pine key={`pine-${index}`} position={getRandomPosition(xRange, zRange, yValue)} scale={[0.0001, 0.0001, 0.0001]} />
      ))}
      {/* Render 10 generic trees at random positions */}
      {Array.from({ length: 10 }).map((_, index) => (
        <Tree key={`tree-${index}`} position={getRandomPosition(xRange, zRange, yValue)} scale={[0.0001, 0.0001, 0.0001]} />
      ))}
    </>
  );
};

export default DesertForest;
