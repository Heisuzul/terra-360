import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Model(props, {scale}) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/small-table.glb')
  return (
    <group {...props} dispose={null}>
        <RigidBody type="fixed" colliders="hull">
        <group scale={ scale } rotation={[0,Math.PI/2,0]}>
            
                <mesh
                    name="Object_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_4.geometry}
                    material={materials.wood}
                    position={[0, 1.5, 0]}
                    scale={[1, 0.075, 1]}
                />
            
            <mesh
                name="Object_6"
                castShadow 
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials.metal}
                scale={0.1}
            />
            
        </group>
      </RigidBody>
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/small-table.glb')