import React from 'react';
import { Text } from '@react-three/drei';

const SurfaceText = ({ 
  text, 
  position = [0, 0, 0.01], // Slight offset from surface
  rotation = [0, 0, 0],
  fontSize = 100,
  color = '#000000',
  maxWidth = 2,
  textAlign = 'center',
  anchorX = 'center',
  anchorY = 'middle',
  font = '/fonts/TiltWarp-Regular.ttf',  // You'll need to provide this font
  ...props 
}) => {
  return (
    <Text
      position={position}
      rotation={rotation}
      fontSize={fontSize}
      color={color}
      maxWidth={maxWidth}
      textAlign={textAlign}
      anchorX={anchorX}
      anchorY={anchorY}
      font={font}
      {...props}
    >
      {text}
    </Text>
  );
};

export default SurfaceText;