import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/laptop.glb')
  return (
    <group {...props} dispose={null}>
      <group name="Silver_colour_Cover" position={[0, 0.001, 0]} scale={[0.19, 0.146, 0.121]}>
        <mesh
          name="Cover_Plane"
          castShadow
          receiveShadow
          geometry={nodes.Cover_Plane.geometry}
          material={materials['Cover Silver']}
        />
        <mesh
          name="Cover_Plane_1"
          castShadow
          receiveShadow
          geometry={nodes.Cover_Plane_1.geometry}
          material={materials['TouchPad Silver']}
        />
      </group>
      <mesh
        name="Rubber_Strip"
        castShadow
        receiveShadow
        geometry={nodes.Rubber_Strip.geometry}
        material={nodes.Rubber_Strip.material}
        position={[0, 0.001, 0]}
        scale={[0.164, 0.005, 0.004]}
      />
      <mesh
        name="Keyboard"
        castShadow
        receiveShadow
        geometry={nodes.Keyboard.geometry}
        material={materials['Keyboard Black Plastic']}
        position={[0.005, 0.007, -0.034]}
        rotation={[0.029, 0, 0]}
        scale={0.006}
      />
      <group
        name="Display"
        position={[0.002, 0.04, -0.125]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.184, 0.205, 0.113]}>
        <mesh
          name="Display_Plane"
          castShadow
          receiveShadow
          geometry={nodes.Display_Plane.geometry}
          material={materials['Cover Silver']}
        />
        <mesh
          name="Display_Plane_1"
          castShadow
          receiveShadow
          geometry={nodes.Display_Plane_1.geometry}
          material={materials['Display Glass']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/laptop.glb')