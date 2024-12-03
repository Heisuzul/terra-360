import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { RigidBody } from '@react-three/rapier';

const ToggleButton = ({ onClick, initialPosition = [0, 0, 0], scaleFactor = 0.1, color='orange'}) => {
  const [pressed, setPressed] = useState(false);

  const { position } = useSpring({
    position: pressed ? [initialPosition[0], initialPosition[1] - 0.01, initialPosition[2]] : initialPosition,
    config: { tension: 300, friction: 10 }
  });

  const handlePointerDown = () => {
    setPressed(true);
  };

  const handlePointerUp = () => {
    setPressed(false);
    onClick();
  };

  return (
    <RigidBody type='fixed'>
        <animated.mesh
            position={position}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            scale={[1*scaleFactor, 1.2*scaleFactor, 1*scaleFactor]}
            castShadow
            receiveShadow
            onPointerOver={() => {
                document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
                setPressed(false)
                document.body.style.cursor = 'auto'
            }}
        >
            <boxGeometry args={[1, 0.2, 1]} />
            <meshStandardMaterial roughness={0.0} metalness={0.4} color={color} />
        </animated.mesh>
    </RigidBody>
  );
};

export default ToggleButton;