import React, { useCallback, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function InteractiveBlade(props, {scale}) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/circular-blade.glb')
  const rbSawRef = useRef()

  const handleSaw = useCallback((e) => {
    e.stopPropagation()
    rbSawRef.current.applyImpulse({x: (Math.random() - 0.6) * 0.01, y: 0.001, z: 0.002}, true)
    // rbSawRef.current.addTorque({x: 0, y: 0.5, z: 0}, true)
  }, [])


  return (
    
        <group {...props} dispose={null}>
            <RigidBody type="dynamic" colliders="hull" ref={rbSawRef}>
                <group name="Sketchfab_Scene" 
                onClick={handleSaw}
                onPointerOver={() => {
                    document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'auto'
                }}>
                    <group name="Sketchfab_model" rotation={[-0.201, 0, 0]} scale={scale}>
                    <group name="BLADE1fbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                        <group name="RootNode">
                        <group
                            name="Circular_saw_blade"
                            position={[-29.604, 0, 0]}
                            rotation={[-Math.PI / 2, 0, 0]}>
                            <mesh
                            name="Circular_saw_blade_Material001_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.Circular_saw_blade_Material001_0.geometry}
                            material={materials['Material.001']}
                            />
                            <mesh
                            name="Circular_saw_blade_Material003_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.Circular_saw_blade_Material003_0.geometry}
                            material={materials['Material.003']}
                            />
                            <mesh
                            name="Circular_saw_blade_Material004_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.Circular_saw_blade_Material004_0.geometry}
                            material={materials['Material.004']}
                            />
                        </group>
                        </group>
                    </group>
                    </group>
                </group>
            </RigidBody>
        </group>
  )
}

useGLTF.preload('/models-3d/deforestation/circular-blade.glb')