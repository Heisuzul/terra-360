import { useState } from 'react';
import { Environment } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Staging = () => {
  const { camera } = useThree();
  const [hdrFile, setHdrFile] = useState('/hdris/erosion/dikhololo_night_2k.hdr');
  const [scale, setScale] = useState(2);

  const initialPosition = new THREE.Vector3(0.52, 0.42, 0.24);
  const targetPosition = new THREE.Vector3(0.33, 0.58, 0.11);

  useFrame(() => {
    const currentDistanceToInitial = camera.position.distanceTo(initialPosition);
    const currentDistanceToTarget = camera.position.distanceTo(targetPosition);

    const threshold = 0.1;

    if (currentDistanceToInitial < threshold) {
      if (hdrFile !== '/hdris/erosion/dikhololo_night_2k.hdr') {
        setHdrFile('/hdris/erosion/dikhololo_night_2k.hdr');
        setScale(2);  
      }
    } else if (currentDistanceToTarget < threshold) {
      if (hdrFile !== '/hdris/erosion/industrial_sunset_2k.hdr') {
        setHdrFile('/hdris/erosion/industrial_sunset_2k.hdr');
        setScale(5);
      }
    }
  });

  return (
    <Environment
      ground={{
        height: 10,
        radius: 400,
        scale: scale,
      }}
      files={hdrFile}
      background={true}
    />
  );
};

export default Staging;