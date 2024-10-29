import React, { useRef, useEffect, useState } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const AutoSurfaceText = ({ 
  targetMesh, 
  text, 
  position = 'center',  // 'center', 'top', 'bottom'
  offset = 0.01,
  scaleFactor = 0.2,
  textConfig = {} 
}) => {
  const [dimensions, setDimensions] = useState(null);
  
  useEffect(() => {
    if (targetMesh) {
      // Create a bounding box
      const boundingBox = new THREE.Box3().setFromObject(targetMesh);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      
      boundingBox.getSize(size);
      boundingBox.getCenter(center);

      setDimensions({
        width: size.x,
        height: size.y,
        depth: size.z,
        center
      });
    }
  }, [targetMesh]);

  if (!dimensions) return null;

  // Calculate text position based on the position prop
  const getTextPosition = () => {
    const { center, height, depth } = dimensions;
    
    switch (position) {
      case 'top':
        return [center.x, center.y + height/2, center.z + depth/2 + offset];
      case 'bottom':
        return [center.x, center.y - height/2, center.z + depth/2 + offset];
      case 'center':
      default:
        return [center.x, center.y, center.z + depth/2 + offset];
    }
  };

  return (
    <Text
      position={getTextPosition()}
      fontSize={dimensions.height * scaleFactor}
      maxWidth={dimensions.width * 0.9}
      anchorX="center"
      anchorY="middle"
      color="black"
      {...textConfig}
    >
      {text}
    </Text>
  );
};

export default AutoSurfaceText;