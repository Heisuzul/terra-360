import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody, useRapier } from '@react-three/rapier'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const InteractiveBlade = ({ 
  position, 
  scale = 1, 
  isFirstPerson, 
  onPickup = () => {}, 
  onRelease = () => {} 
}) => {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/circular-blade.glb')
  const rigidBody = useRef()
  const { camera } = useThree()
  const [isHeld, setIsHeld] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const spinSpeed = useRef(0)
  const holdOffset = useRef(new THREE.Vector3(0, -0.5, -2)) // Offset from camera when held

  // Spin the blade when in use
  useFrame((state, delta) => {
    if (!rigidBody.current) return

    if (isHeld) {
      // Update position when held
      const cameraDirection = new THREE.Vector3()
      camera.getWorldDirection(cameraDirection)
      
      const targetPosition = camera.position.clone()
        .add(cameraDirection.multiplyScalar(holdOffset.current.z))
        .add(new THREE.Vector3(0, holdOffset.current.y, 0))

      rigidBody.current.setTranslation(targetPosition, true)
      
      // Rotate blade to face forward
      const lookRotation = new THREE.Quaternion()
      lookRotation.setFromRotationMatrix(
        new THREE.Matrix4().lookAt(
          new THREE.Vector3(0, 0, 0),
          cameraDirection,
          new THREE.Vector3(0, 1, 0)
        )
      )
      rigidBody.current.setRotation(lookRotation, true)
    }

    // Handle spinning
    if (isSpinning) {
      spinSpeed.current = Math.min(spinSpeed.current + delta * 5, 20)
    } else {
      spinSpeed.current = Math.max(spinSpeed.current - delta * 2, 0)
    }

    // Apply spin rotation
    if (spinSpeed.current > 0) {
      const currentRotation = rigidBody.current.rotation()
      const spinQuat = new THREE.Quaternion()
      spinQuat.setFromAxisAngle(new THREE.Vector3(1, 0, 0), spinSpeed.current * delta)
      rigidBody.current.setRotation(currentRotation.multiply(spinQuat), true)
    }
  })

  const handleInteraction = () => {
    if (!isFirstPerson) return

    if (!isHeld) {
      setIsHeld(true)
      setIsSpinning(true)
      rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rigidBody.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
      onPickup()
    } else {
      setIsHeld(false)
      setIsSpinning(false)
      // Add forward thrust when released
      const cameraDirection = new THREE.Vector3()
      camera.getWorldDirection(cameraDirection)
      rigidBody.current.setLinvel(
        { 
          x: cameraDirection.x * 10, 
          y: cameraDirection.y * 10, 
          z: cameraDirection.z * 10 
        }, 
        true
      )
      onRelease()
    }
  }

  return (
    <RigidBody 
      ref={rigidBody} 
      type={isHeld ? "fixed" : "dynamic"} 
      colliders="hull" 
      position={position}
      onClick={handleInteraction}
    >
      <group dispose={null}>
        <group name="Sketchfab_Scene">
          <group 
            name="Sketchfab_model" 
            rotation={[-0.201, 0, 0]} 
            scale={scale}
          >
            <group 
              name="BLADE1fbx" 
              rotation={[Math.PI / 2, 0, 0]} 
              scale={0.01}
            >
              <group name="RootNode">
                <group
                  name="Circular_saw_blade"
                  position={[-29.604, 0, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
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
      </group>
    </RigidBody>
  )
}

export default InteractiveBlade