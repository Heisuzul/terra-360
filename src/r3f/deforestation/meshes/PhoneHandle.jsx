import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PhoneHandle({ 
  position: initialPosition, 
  rotation, 
  onDragStart,
  onDragEnd,
  sceneIndex,
  ...props 
}) {
  const { nodes, materials } = useGLTF('/models-3d/deforestation/phone-handle.glb');
  
  const groupRef = useRef();
  const positionRef = useRef({
    initial: initialPosition[1],
    current: initialPosition[1],
    target: initialPosition[1]
  });
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Reset dragging state when scene changes
  useEffect(() => {
    if (sceneIndex !== 3 && isDraggingRef.current) {
      isDraggingRef.current = false;
      onDragEnd?.();
    }
  }, [sceneIndex]);

  const CONSTRAINTS = {
    MIN_Y: initialPosition[1],
    MAX_Y: initialPosition[1] + 0.3,
    SMOOTHING_FACTOR: 0.92,
    MOMENTUM_DECAY: 0.2,
    MOVEMENT_SENSITIVITY: 0.005
  };

  const calculateRotation = useCallback((height) => {
    const liftProgress = (height - CONSTRAINTS.MIN_Y) / (CONSTRAINTS.MAX_Y - CONSTRAINTS.MIN_Y);
    return liftProgress * (Math.PI / 2);
  }, [CONSTRAINTS.MIN_Y, CONSTRAINTS.MAX_Y]);

  const handlePointerDown = useCallback((e) => {
    if (sceneIndex === 3) {
      e.stopPropagation();
      isDraggingRef.current = true;
      velocityRef.current = 0;
      e.target.setPointerCapture(e.pointerId);
      onDragStart?.();
    }
  }, [sceneIndex, onDragStart]);

  const handlePointerUp = useCallback((e) => {
    if (isDraggingRef.current) {
      e.stopPropagation();
      isDraggingRef.current = false;
      e.target.releasePointerCapture(e.pointerId);
      onDragEnd?.();
    }
  }, [onDragEnd]);

  const handlePointerMove = useCallback((e) => {
    if (sceneIndex === 3 && isDraggingRef.current) {
      e.stopPropagation();
      const movementY = e.movementY * CONSTRAINTS.MOVEMENT_SENSITIVITY;
      const newTargetY = positionRef.current.target - movementY;
      positionRef.current.target = Math.max(
        CONSTRAINTS.MIN_Y,
        Math.min(CONSTRAINTS.MAX_Y, newTargetY)
      );
    }
  }, [sceneIndex, CONSTRAINTS.MIN_Y, CONSTRAINTS.MAX_Y, CONSTRAINTS.MOVEMENT_SENSITIVITY]);

  useFrame(() => {
    if (!groupRef.current) return;

    const { current: pos } = positionRef;
    
    const newY = THREE.MathUtils.lerp(
      pos.current,
      pos.target,
      isDraggingRef.current ? (1 - CONSTRAINTS.SMOOTHING_FACTOR) : (1 - CONSTRAINTS.SMOOTHING_FACTOR * 0.5)
    );

    velocityRef.current = newY - pos.current;
    
    if (!isDraggingRef.current) {
      velocityRef.current *= CONSTRAINTS.MOMENTUM_DECAY;
      pos.target = Math.max(
        CONSTRAINTS.MIN_Y,
        Math.min(CONSTRAINTS.MAX_Y, pos.target + velocityRef.current)
      );
    }

    const targetRotation = calculateRotation(newY);
    const newRotation = THREE.MathUtils.lerp(
      rotationRef.current,
      targetRotation,
      1 - CONSTRAINTS.SMOOTHING_FACTOR
    );

    pos.current = newY;
    rotationRef.current = newRotation;
    
    groupRef.current.position.y = newY;
    groupRef.current.rotation.z = -newRotation/2;
  });

  const combinedRotation = rotation ? [
    rotation[0],
    rotation[1],
    rotation[2] + rotationRef.current
  ] : [0, 0, rotationRef.current];

  return (
    <group 
      ref={groupRef}
      position={[initialPosition[0], positionRef.current.current, initialPosition[2]]}
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