import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props, {scale}) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/red-valve.glb')
  const [hovered, setHovered] = useState(false)

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
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
            setHovered(true)
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto'
            setHovered(false)
          }}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/red-valve.glb')