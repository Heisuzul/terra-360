import React from 'react';
import { RigidBody } from '@react-three/rapier';
import DesertLowPoly from '/src/r3f/Erosion/meshes/desert-low-poly';

/**
 * Wall component to render an invisible wall between two points.
 *
 * @param {Array} start - Starting position [x, y, z] of the wall.
 * @param {Array} end - Ending position [x, y, z] of the wall.
 * @param {number} thickness - Thickness of the wall.
 * @param {number} height - Height of the wall.
 * @param {Array} rotation - Custom rotation values for the wall.
 */
const Wall = ({ start, end, thickness = 0.1, height = 2, rotation = [0, 0, 0] }) => {
  // Calculate center position of the wall
  const center = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];

  // Calculate direction and length of the wall
  const direction = [
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2],
  ];
  const length = Math.sqrt(
    direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2
  );

  // Calculate rotation to align the wall with the direction
  const rotationY = Math.atan2(direction[2], direction[0]);

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh
        position={center}
        rotation={rotation} // Use the provided rotation instead of just the Y-axis
        visible={true} // Visible wall for debugging
      >
        <boxGeometry args={[length, height, thickness]} />
        <meshStandardMaterial color="red" transparent opacity={0} />
      </mesh>
    </RigidBody>
  );
};

/**
 * Terrain component that renders desert terrain and invisible walls.
 *
 * @param {Function} handleDesertLoad - Callback function to handle loading of desert meshes.
 */
const Terrain = ({ handleDesertLoad }) => {
  // Coordinates for the walls
  const A = [0.2938, 0.5676, 4.2198];
  const B = [-1.825, -1.312, -2.833];
  const C = [-1, 1.18155356622862537, 0.4027147084307794];
  const D = [0.5118535875687092, 0.1411653710615969, -1.456979783984155];

  // Custom rotation values based on the provided euler values
  const rotationAB = [-0.312513848854346, 0.021188918273763045, 0.06133180584220201];
  const rotationBC = [-2.0764849759001396, -1.5535034240001207, -2.115386429356941];

  return (
    <>
      {/* Render desert terrain */}
      <group receiveShadow>
        <RigidBody type="fixed" colliders="hull">
          <DesertLowPoly onDesertLoad={handleDesertLoad} position={[0, 0, 0]} scale={[1, 1, 1]} />
          <DesertLowPoly onDesertLoad={handleDesertLoad} position={[-0.9, -0.03, 0]} scale={[1, 1, 1]} />
          <DesertLowPoly onDesertLoad={handleDesertLoad} position={[0, 0, -0.9]} rotation={[0, Math.PI, 0]} scale={[1, 1, 1]} />
          <DesertLowPoly onDesertLoad={handleDesertLoad} position={[-0.9, -0.03, -0.9]} rotation={[0, Math.PI, 0]} scale={[1, 1, 1]} />
        </RigidBody>
      </group>

      {/* Render invisible walls */}
      <Wall start={A} end={B} rotation={rotationAB} />
      <Wall start={B} end={C} rotation={rotationBC} />

    </>
  );
};

export default Terrain;

