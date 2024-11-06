import React from 'react';
import Pine from '/src/r3f/Erosion/meshes/pine-without-leaves';
import Tree from '/src/r3f/Erosion/meshes/tree-without-leaves';

// Función para generar una posición aleatoria dentro de los rangos especificados
const getRandomPosition = (xRange, zRange, yValue) => {
  const x = Math.random() * (xRange[1] - xRange[0]) + xRange[0]; // Genera un valor aleatorio en el rango x
  const z = Math.random() * (zRange[1] - zRange[0]) + zRange[0]; // Genera un valor aleatorio en el rango z
  return [x, yValue, z]; // Devuelve la posición en formato [x, y, z]
};

const DesertForest = () => {
  // Definir rangos para las posiciones aleatorias
  const xRange = [-1.3, -0.8];
  const zRange = [-1.3, 0.3];
  const yValue = 0.019; // Valor constante para Y

  return (
    <>
      {/* Renderizar 5 árboles de cada tipo en posiciones aleatorias */}
      {Array.from({ length: 10 }).map((_, index) => (
        <Pine key={`pine-${index}`} position={getRandomPosition(xRange, zRange, yValue)} scale={[0.0001, 0.0001, 0.0001]} />
      ))}
      {Array.from({ length: 10 }).map((_, index) => (
        <Tree key={`tree-${index}`} position={getRandomPosition(xRange, zRange, yValue)} scale={[0.0001, 0.0001, 0.0001]} />
      ))}
    </>
  );
};

export default DesertForest;