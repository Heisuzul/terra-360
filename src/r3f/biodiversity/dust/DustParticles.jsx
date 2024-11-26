import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function DustParticles({ count = 500, size = 0.5, spread = 100, position = [0, 0, 0] }) {
  const points = useRef();
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const index = i * 3;

      // Random positions in a cube (controlled by spread)
      positions[index] = (Math.random() - 0.5) * spread; // X
      positions[index + 1] = (Math.random() - 0.5) * spread; // Y
      positions[index + 2] = (Math.random() - 0.5) * spread; // Z

      // Random velocities
      velocities[index] = (Math.random() - 0.5) * 0.09; // X velocity
      velocities[index + 1] = (Math.random() - 0.5) * 0.09; // Y velocity
      velocities[index + 2] = (Math.random() - 0.5) * 0.09; // Z velocity
    }

    return { positions, velocities };
  }, [count, spread]);

  useFrame(() => {
    const positions = points.current.geometry.attributes.position.array;
    const velocities = particles.velocities;

    for (let i = 0; i < count; i++) {
      const index = i * 3;

      // Update positions with velocities
      positions[index] += velocities[index];
      positions[index + 1] += velocities[index + 1];
      positions[index + 2] += velocities[index + 2];

      // Reset particle position if it moves too far (based on spread)
      if (positions[index] > spread / 2 || positions[index] < -spread / 2) velocities[index] *= -1;
      if (positions[index + 1] > spread / 2 || positions[index + 1] < -spread / 2) velocities[index + 1] *= -1;
      if (positions[index + 2] > spread / 2 || positions[index + 2] < -spread / 2) velocities[index + 2] *= -1;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={position}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          sizeAttenuation
          color="#746252"
          transparent
          opacity={0.5}
        />
      </points>
    </group>
  );
}
