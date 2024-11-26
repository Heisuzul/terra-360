import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Model(props, {scale}) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/red-valve.glb')

  return (
    <group {...props} dispose={null}>
        <group scale={scale}>
          <RigidBody type="fixed" colliders="hull">
            <mesh
              name="Halflife_valve_Valve_0"
              castShadow
              receiveShadow
              geometry={nodes.Halflife_valve_Valve_0.geometry}
              material={materials.Valve}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
              onPointerOver={() => {
                document.body.style.cursor = 'pointer'
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'auto'
              }}
            />
          </RigidBody>
        </group>
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/red-valve.glb')