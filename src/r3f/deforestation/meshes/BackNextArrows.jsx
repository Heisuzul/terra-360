import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, Text, Html } from '@react-three/drei';
import { Box3, Vector3 } from 'three';
import * as THREE from 'three';
import ToolTip from './HtmlToolTip'

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

  const [dimensions, setDimensions] = useState(null)

  useEffect(() => {
    if (meshRef.current) {
      // Update dimensions based on the mesh bounding box
      const boundingBox = new THREE.Box3().setFromObject(meshRef.current)
      const size = new THREE.Vector3()
      boundingBox.getSize(size)
      setDimensions({ width: size.x, height: size.y })
    }
  }, [meshRef.current])

  const [isHovered, setIsHovered] = useState(false);

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
            onPointerOver={(event) => {
              document.body.style.cursor = 'pointer'
              event.stopPropagation();
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto'
            }}
          />
          
          <mesh
            name="Cylinder005_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder005_1.geometry}
            material={materials['Dark Wood']}
            onPointerOver={() => {
              setIsHovered(true);
            }}
            onPointerOut={() => {
              setIsHovered(false);
            }}
          />
          <mesh
            name="Cylinder005_2"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder005_2.geometry}
            material={materials.Herbs}
          />
          {isHovered && (
            <ToolTip 
              position={[0.4, 0.5, 0.3]} 
              text={'Double Click to enter/exit the quiz area'}
            />
          )}
        </group>
      </group>
      {dimensions && (<Text
        position={[-0.15, 1.685, .05]} // Slight offset from surface
        fontSize={dimensions.height * 0.1} // Scale font size relative to sign height
        maxWidth={dimensions.width * 1.7} // Keep text within sign bounds
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color="#261000"
      >
        {props.textNext}
      </Text>)}
      {dimensions && (<Text
        position={[0.1, 1.275, .05]} // Slight offset from surface
        fontSize={dimensions.height * 0.1} // Scale font size relative to sign height
        maxWidth={dimensions.width * 1.7} // Keep text within sign bounds
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color="#261000"
      >
        {props.textBack}
      </Text>)}
    </group>
  );
}

useGLTF.preload('/back-next-arrows-sign.glb');
