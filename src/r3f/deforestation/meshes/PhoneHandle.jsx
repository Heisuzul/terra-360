import React, { useRef, useState, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PhoneHandle({ position: initialPosition, rotation, ...props }) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/phone-handle.glb');
  
  // Create refs for position tracking
  const groupRef = useRef();
  const initialY = useRef(initialPosition[1]);
  
  // Define movement constraints
  const MAX_LIFT = 0.3; // Maximum lift from initial position
  const MIN_Y = initialY.current; // Minimum Y position (initial position)
  const MAX_Y = initialY.current + MAX_LIFT; // Maximum Y position
  
  // State to track if we're currently dragging and target position
  const [isDragging, setIsDragging] = useState(false);
  const [currentY, setCurrentY] = useState(initialY.current);
  const [targetY, setTargetY] = useState(initialY.current);
  const [currentRotationZ, setCurrentRotationZ] = useState(0);

  // Smoothing factor (0 = no smoothing, 1 = maximum smoothing)
  const SMOOTHING_FACTOR = 0.92;
  
  // Velocity tracking for momentum
  const velocity = useRef(0);
  const lastY = useRef(initialY.current);

  // Calculate rotation based on height
  const calculateRotation = (height) => {
    const liftProgress = (height - MIN_Y) / (MAX_Y - MIN_Y);
    return liftProgress * (Math.PI / 2); // 90 degrees in radians
  };

  // Handle pointer down event
  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    velocity.current = 0; // Reset velocity on new drag
    e.target.setPointerCapture(e.pointerId);
  };

  // Handle pointer up event
  const handlePointerUp = (e) => {
    e.stopPropagation();
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  // Handle pointer move event
  const handlePointerMove = useCallback((e) => {
    if (isDragging) {
      e.stopPropagation();
      
      // Calculate new Y position
      const movementY = e.movementY * 0.01; // Adjust sensitivity
      const newTargetY = targetY - movementY;
      
      // Constrain the Y position
      const clampedY = Math.max(MIN_Y, Math.min(MAX_Y, newTargetY));
      
      setTargetY(clampedY);
    }
  }, [isDragging, targetY]);

  // Update position each frame
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Calculate new position with smoothing
      const newY = THREE.MathUtils.lerp(
        currentY,
        targetY,
        isDragging ? (1 - SMOOTHING_FACTOR) : (1 - SMOOTHING_FACTOR * 0.5)
      );

      // Update velocity
      velocity.current = newY - lastY.current;
      lastY.current = newY;

      // Apply momentum when not dragging
      if (!isDragging) {
        // Apply decay to velocity
        velocity.current *= 0.2;
        
        // Update target position with momentum
        const momentumTargetY = targetY + velocity.current;
        setTargetY(Math.max(MIN_Y, Math.min(MAX_Y, momentumTargetY)));
      }

      // Calculate target rotation based on height
      const targetRotation = calculateRotation(newY);
      
      // Smooth the rotation
      const newRotation = THREE.MathUtils.lerp(
        currentRotationZ,
        targetRotation,
        1 - SMOOTHING_FACTOR
      );

      setCurrentY(newY);
      setCurrentRotationZ(newRotation);
      
      // Apply position and rotation
      groupRef.current.position.y = newY;
      // groupRef.current.rotation.x = -newRotation/2;
      groupRef.current.rotation.z = -newRotation/2;
    }
  });

  // Combine the initial rotation with our dynamic Z rotation
  const combinedRotation = rotation ? [
    rotation[0],
    rotation[1],
    rotation[2] + currentRotationZ
  ] : [0, 0, currentRotationZ];

  return (
    <group 
      ref={groupRef}
      position={[initialPosition[0], currentY, initialPosition[2]]}
      rotation={combinedRotation}
      {...props}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <mesh
        name="tube_low_M_Telephone_0"
        castShadow
        receiveShadow
        geometry={nodes.tube_low_M_Telephone_0.geometry}
        material={materials.M_Telephone}
        position={[-0.207, 0.047, -0.128]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.04}
      />
    </group>
  );
}

useGLTF.preload('/models-3d/deforestation/phone-handle.glb');