import * as THREE from 'three';

export const handleBeeClick = (cameraRef, setIsBeeClicked) => {
  if (cameraRef.current) {
    const camera = cameraRef.current;
    camera.position.set(11, -15, 130);
    camera.lookAt(new THREE.Vector3(10, -23, 110));
  }

  setIsBeeClicked(true);
};

export const handlePointerBeeMissed = (cameraRef, setIsBeeClicked) => {
  if (cameraRef.current) {
    const camera = cameraRef.current;
    camera.position.set(10, -20, 150);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  setIsBeeClicked(false);
};

export const handleOrchidClick = (cameraRef, setIsOrchidClicked) => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      camera.position.set(2, -25, 135);
      camera.lookAt(new THREE.Vector3(10, -10, 110));
      
    }
  
    setIsOrchidClicked(true);
};

export const handlePointerOrchidMissed = (cameraRef, setIsOrchidClicked) => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      camera.position.set(10, -20, 150);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  
    setIsOrchidClicked(false);
  };
  

export const handleWolfClick = (cameraRef, setIsWolfClicked) => {
  if (cameraRef.current) {
    const camera = cameraRef.current;
    camera.position.set(-8, -25, 140);
    camera.lookAt(new THREE.Vector3(10, -10, 110));
    
  }

  setIsWolfClicked(true);
};

export const handlePointerWolfMissed = (cameraRef, setIsWolfClicked) => {
  if (cameraRef.current) {
    const camera = cameraRef.current;
    camera.position.set(10, -20, 150);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  setIsWolfClicked(false);
};

export const handleCrocClick = (cameraRef, setIsCrocClicked) => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      camera.position.set(10, -50, 150);
      camera.position.set(10, Math.PI *0.6, 170);
      camera.position.set(12, -26.8, 130);
      camera.lookAt(new THREE.Vector3(10, 0, 110));
      
    }
  
    setIsCrocClicked(true);
};

export const handlePointerCrocMissed = (cameraRef, setIsCrocClicked) => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      camera.position.set(10, -20, 150);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  
    setIsCrocClicked(false);
};

export const handleCondorClick = (cameraRef, setIsCondorClicked) => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      camera.position.set(35, -6, 120);
      camera.lookAt(new THREE.Vector3(10, -10, 110));
      
    }
  
    setIsCondorClicked(true);
};

export const handlePointerCondorMissed = (cameraRef, setIsCondorClicked) => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      camera.position.set(10, -20, 150);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  
    setIsCondorClicked(false);
};

export const handleFrogClick = (cameraRef, setIsFrogClicked) => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      camera.position.set(20.5, -23.2, 130);
      camera.lookAt(new THREE.Vector3(10, -10, 110));
      
    }
  
    setIsFrogClicked(true);
};

export const handlePointerFrogMissed = (cameraRef, setIsFrogClicked) => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      camera.position.set(10, -20, 150);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  
    setIsFrogClicked(false);
};