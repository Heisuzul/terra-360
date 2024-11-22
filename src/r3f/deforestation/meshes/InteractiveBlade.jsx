import React, { useCallback, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function InteractiveBlade({scale, onDragStart, onDragEnd, ...props}) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/circular-blade.glb')
  const rbSawRef = useRef()
  const [clickStartTime, setClickStartTime] = useState(null)

  const handlePointerDown = useCallback((e) => {
    setClickStartTime(Date.now())
    e.stopPropagation();

    rbSawRef.current.setAngvel({
        x: 0,
        y: 30,
        z: 0
      }, true)
    onDragStart?.();  
  }, [onDragStart])

  const handlePointerUp = useCallback((e) => {
    e.stopPropagation();
    const clickDuration = Date.now() - clickStartTime;
    const impulseStrength = Math.min(clickDuration / 1000, 1.5);

      const randomSign = Math.random() > 0.5 ? 1 : -1;
      const anotherRandom = Math.random();

      rbSawRef.current.applyImpulse({
        x: anotherRandom * 0.004 * randomSign * impulseStrength - 0.002 * impulseStrength,
        y: 0.0015 * impulseStrength,
        z: 0.003 * impulseStrength
      }, true);

      rbSawRef.current.setAngvel({
        x: 0,
        y: 50,
        z: 0
      }, true);


    e.stopPropagation();
    setClickStartTime(null);
    setRelativePosition(null);
    onDragEnd?.();
  }, [clickStartTime, onDragEnd])

  return (
    
        <group {...props} dispose={null}>
            <RigidBody type="dynamic" colliders="hull" ref={rbSawRef}>
                <group name="Sketchfab_Scene" 
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerOver={() => {
                    document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'auto'
                    onDragEnd?.();
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