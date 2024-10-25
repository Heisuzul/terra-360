import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';

export default function BackNextArrows({ onNextClick, onBackClick, ...props }) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/back-next-arrows-sign.glb');
  const meshRef = useRef();

  const handleClick = (event) => {
    event.stopPropagation();

    // Calculate bounding box and midpoint
    const boundingBox = new Box3().setFromObject(meshRef.current);
    const meshCenter = new Vector3();
    boundingBox.getCenter(meshCenter);

    // Call the appropriate function based on click location
    if (event.point.y > meshCenter.y) {
        if (onNextClick) onNextClick();
      } else {
        if (onBackClick) onBackClick();
      }
  };

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="Sign6">
          <mesh
            ref={meshRef}
            onClick={handleClick}
            name="Cylinder005"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder005.geometry}
            material={materials['Light Wood']}
          />
          
          <mesh
            name="Cylinder005_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder005_1.geometry}
            material={materials['Dark Wood']}
          />
          <mesh
            name="Cylinder005_2"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder005_2.geometry}
            material={materials.Herbs}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/back-next-arrows-sign.glb');
