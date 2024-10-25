import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Vector3, Raycaster } from 'three';
import Tree from "../meshes/Tree";

const Trees = ({ terrain, delta, amount_rows, amount_cols, phase_x, phase_z, space}) => {
  const [treePositions, setTreePositions] = useState([]);
  const raycaster = useMemo(() => new Raycaster(), []);

  const calculateTreePositions = useCallback(() => {
    if (terrain && terrain.current && terrain.current.geometry.boundingBox) {
      const positions = [];
      const rows = amount_rows;
      const cols = amount_cols;
      const spacing = space;
      const halfRows = Math.floor(rows / 2);
      const halfCols = Math.floor(cols / 2);

      const boundingBox = terrain.current.geometry.boundingBox;
      const startY = boundingBox.max.y + 10;

      for (let x = -halfCols + phase_x; x <= halfCols+ phase_x; x++) {
        for (let z = -halfRows + phase_z; z <= halfRows + phase_z; z++) {
          // if (x === 0) continue; // Skip central road
          const xPos = x * spacing + Math.pow(-1, z);
          const zPos = z * spacing + Math.pow(-1, z);

          raycaster.set(new Vector3(xPos, startY, zPos), new Vector3(0, -1, 0));
          const intersects = raycaster.intersectObject(terrain.current);

          const yPosition = intersects.length > 0 ? intersects[0].point.y : 0;
          positions.push(new Vector3(xPos, yPosition, zPos));
          
        }
      }
      // console.log(positions);
      setTreePositions(positions);
    }
  }, [terrain, raycaster]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (terrain?.current?.geometry?.boundingBox) {
        console.log("Calculating tree positions after delay...");
        calculateTreePositions();
      } else {
        console.log("Waiting for terrain to be fully ready...");
      }
    }, 10*delta); // Set delay to 1 second (adjust as needed)

    return () => clearTimeout(delay);
  }, [terrain, calculateTreePositions]);

  return (
    <>
      {treePositions.map((position, index) => (
        <Tree key={index} position={position} scale={1} />
      ))}
      {/* Optional debug spheres */}
      {/* {treePositions.map((position, index) => (
        <mesh key={`debug-${index}`} position={position}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="red" />
        </mesh>
      ))} */}
    </>
  );
};

export default Trees;
