/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 bee.gltf 
Author: EsiHere (https://sketchfab.com/EsiHere)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/bee-low-poly-0416f30815d6422791746b379f802405
Title: Bee (Low Poly)
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models-3d/biodiversity/bee/bee.gltf');
  const groupRef = useRef();
  const baseYPosition = props.baseY || -20; // Permite ajustar la posición base desde las props
  let floatDirection = 0; // Dirección inicial de la flotación

  useFrame(() => {
    // Usa la posición base en Y y añade el efecto de flotación
    if (groupRef.current) {
      groupRef.current.position.y = baseYPosition + Math.sin(floatDirection) * 0.2;
      floatDirection += 0.1; // Ajusta la velocidad de flotación si es necesario
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[0, 800, 1009]} rotation={[-Math.PI / 2.5, 0, -1]} scale={80}>
          <mesh geometry={nodes.beehive006_Atlas_Alpha_0.geometry} material={materials.Atlas_Alpha} />
          <mesh geometry={nodes.beehive006_Atlas_0.geometry} material={materials.Atlas} />
          <mesh geometry={nodes.beehive006_Atlas_Shiny_0.geometry} material={materials.Atlas_Shiny} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models-3d/biodiversity/bee/bee.gltf');
