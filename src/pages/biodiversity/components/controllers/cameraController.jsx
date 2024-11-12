import * as THREE from 'three';

export const handleBeeClick = (cameraRef, setIsBeeClicked) => {
  if (cameraRef.current) {
    const camera = cameraRef.current;
    camera.position.set(11, -15, 130);
    camera.lookAt(new THREE.Vector3(10, -23, 110));
  }

  setIsBeeClicked(true);
};

export const handleWolfClick = (cameraRef, setIsWolfClicked) => {
  if (cameraRef.current) {
    const camera = cameraRef.current;
    camera.position.set(-8, -50, 140);
    camera.lookAt(new THREE.Vector3(10, -10, 110));
    
  }

  setIsWolfClicked(true);
};

export const handlePointerBeeMissed = (cameraRef, setIsBeeClicked) => {
  if (cameraRef.current) {
    const camera = cameraRef.current;
    camera.position.set(10, -20, 150);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  setIsBeeClicked(false);
};

export const handlePointerWolfMissed = (cameraRef, setIsWolfClicked) => {
  if (cameraRef.current) {
    const camera = cameraRef.current;
    camera.position.set(10, -20, 150);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  setIsWolfClicked(false);
};
