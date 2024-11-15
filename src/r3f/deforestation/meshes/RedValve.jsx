import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props, {scale}) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/red-valve.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={scale}>  
        <mesh
            name="Halflife_valve_Valve_0"
            castShadow
            receiveShadow
            geometry={nodes.Halflife_valve_Valve_0.geometry}
            material={materials.Valve}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/red-valve.glb')