import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/phone-body.glb')
  return (
    <group {...props} dispose={null}>
      <group name="b7aa45308bd94a0cb1d5844e5949e405fbx" scale={0.01}>
        <mesh
          name="body_low_M_Telephone_0"
          castShadow
          receiveShadow
          geometry={nodes.body_low_M_Telephone_0.geometry}
          material={materials.M_Telephone}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={6.025}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto'
          }}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/phone-body.glb')