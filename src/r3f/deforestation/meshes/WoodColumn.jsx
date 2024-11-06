import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/wood-column.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        name="log02_log02-1480514742170-289-67-7_0"
        castShadow
        receiveShadow
        geometry={nodes['log02_log02-1480514742170-289-67-7_0'].geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <meshStandardMaterial color="#9c5f2a" />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/wood-column.glb')