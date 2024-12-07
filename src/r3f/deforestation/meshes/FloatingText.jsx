import React, { useRef, useEffect, forwardRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";

const FloatingText = forwardRef(({ text, position, scale = 1, rotationDelta=0, color='#d4682a', emissive="#ffd700", emissiveIntensity=10, onClick=()=>{}, visible = false }, ref) => {
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
      rotation={[0, Math.PI / 12 * 11 + rotationDelta, 0]}
      font="/fonts/TiltWarp-Regular.json" // Ensure this path is correct
      size={0.15}
      scale={scale}
      height={0.02}
      visible={visible} // Initially invisible
      onPointerOver={() => {
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
      }}
      onClick={onClick}
    >
      {text}
      <meshStandardMaterial 
        color={color} 
        emissive={emissive} // Add emissive color for glow
        emissiveIntensity={emissiveIntensity} // Adjust intensity as needed
      />
    </Text3D>
  );
});

export default FloatingText;