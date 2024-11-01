
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/phone-handle.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        name="tube_low_M_Telephone_0"
        castShadow
        receiveShadow
        geometry={nodes.tube_low_M_Telephone_0.geometry}
        material={materials.M_Telephone}
        position={[-0.207, 0.047, -0.128]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.04}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/phone-handle.glb')