import React, { useRef, useEffect, forwardRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";

const FloatingText = forwardRef(({ text, position }, ref) => {
  const { camera } = useThree();
  const textRef = useRef();

  useEffect(() => {
    if (ref) {
      ref.current = textRef.current;
    }
  }, [ref]);

  return (
    <Text3D
      ref={textRef}
      position={position}
      rotation={[0, Math.PI / 12 * 11, 0]}
      font="/fonts/TiltWarp-Regular.json" // Ensure this path is correct
      size={0.1}
      height={0.02}
      visible={false} // Initially invisible
    >
      {text}
      <meshStandardMaterial 
        color="#d4682a" 
        emissive="#ffd700" // Add emissive color for glow
        emissiveIntensity={2} // Adjust intensity as needed
      />
    </Text3D>
  );
});

export default FloatingText;