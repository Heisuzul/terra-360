import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'

const Leaf = ({ height = 1, distance = 0, direction = 1, speed = 1, amplitude = 1, frequency = 1, boundary = 5 }) => {
  const leafRef = useRef();
  const directionRef = useRef(direction); // 1 for right, -1 for left

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Update the horizontal position
    leafRef.current.position.x += directionRef.current * speed * delta;

    leafRef.current.rotation.x += 1 * delta;
    
    // Reverse direction if the leaf reaches the boundary
    if (Math.abs(leafRef.current.position.x) > boundary) {
      directionRef.current = -directionRef.current;
    }

    // Update the vertical position with a cosine wave
    leafRef.current.position.y = height + amplitude * Math.cos(time * frequency);
  });

  return (
    <mesh ref={leafRef} position={[0, height, distance]} scale={0.5}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshStandardMaterial 
        color={"#556B2F"} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Leaf;