import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/wood-platform.glb')
  return (
    <group {...props} dispose={null}>
      <group name="Cylinder001" position={[-50, 0, -50]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh
          name="Cylinder001_Material_#26_0"
          castShadow
          receiveShadow
          geometry={nodes['Cylinder001_Material_#26_0'].geometry}
        >
          <meshStandardMaterial color="#874a1c" />
        </mesh>
        <mesh
          name="Cylinder001_Material_#25_0"
          castShadow
          receiveShadow
          geometry={nodes['Cylinder001_Material_#25_0'].geometry}
        >
          <meshStandardMaterial color="#9e6a3a" />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/wood-platform.glb')