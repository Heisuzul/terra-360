import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Model(props, {type = 'dynamic'}) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/bag-seeds.glb')
  return (
    <group {...props} dispose={null}>
      <group name="1ed43f16ae304953893d6f620c31e069fbx" scale={0.01}>
        <RigidBody type={type} colliders="hull">
            <mesh
            name="Plane_Material003_0"
            castShadow
            receiveShadowS
            geometry={nodes.Plane_Material003_0.geometry}
            material={materials['Material.003']}
            position={[0, 25.3, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={4.062}
            />
        </RigidBody>
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/deforestation/bag-seeds.glb')
