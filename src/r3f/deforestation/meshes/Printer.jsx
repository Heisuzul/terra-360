import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/printer.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.node_id46.geometry}
        material={materials['69']}
        position={[0, -0.193, 0.232]}
        scale={0.05}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/printer.glb')