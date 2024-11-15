import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FirstPersonSawController = ({ 
  enabled = false, 
  onPositionChange = () => {}, 
  sensitivity = 0.002 
}) => {
  const { camera } = useThree()
  const mousePos = useRef({ x: 0, y: 0 })
  const rotation = useRef({ x: 0, y: 0 })
  const isLocked = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const onMouseMove = (e) => {
      if (!isLocked.current) return

      // Update rotation based on mouse movement
      rotation.current.x -= e.movementY * sensitivity
      rotation.current.y -= e.movementX * sensitivity

      // Clamp vertical rotation to avoid over-rotation
      rotation.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.current.x))

      // Create direction vector from rotation
      const direction = new THREE.Vector3(
        Math.sin(rotation.current.y) * Math.cos(rotation.current.x),
        Math.sin(rotation.current.x),
        Math.cos(rotation.current.y) * Math.cos(rotation.current.x)
      )

      onPositionChange({
        position: camera.position.clone(),
        direction: direction
      })
    }

    const onPointerLockChange = () => {
      isLocked.current = document.pointerLockElement === document.body
    }

    const onPointerLockError = () => {
      console.error('Pointer lock error')
    }

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('pointerlockchange', onPointerLockChange)
    document.addEventListener('pointerlockerror', onPointerLockError)

    // Request pointer lock on click
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('click', () => {
        if (!isLocked.current) {
          document.body.requestPointerLock()
        }
      })
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('pointerlockchange', onPointerLockChange)
      document.removeEventListener('pointerlockerror', onPointerLockError)
      if (document.exitPointerLock) {
        document.exitPointerLock()
      }
    }
  }, [enabled, camera, sensitivity, onPositionChange])

  return null
}

export default FirstPersonSawController