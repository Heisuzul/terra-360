/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function ThreeWoodSign(props) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/wood-sign.glb')
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="Sign7" position={[-9.287, -0.01, 0.021]}>
          <mesh
            name="Cylinder004"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004.geometry}
            material={materials['Light Wood']}
          />
          <mesh
            name="Cylinder004_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_1.geometry}
            material={materials['Dark Wood']}
          />
          <mesh
            name="Cylinder004_2"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004_2.geometry}
            material={materials.Herbs}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/wood-sign.glb')