import { useState, useEffect } from 'react';
import * as THREE from 'three';

const keyboardControls = (cameraRef) => {
  const [keys, setKeys] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  useEffect(() => {
    function onKeyDown(event) {
      if (keys.hasOwnProperty(event.key)) {
        setKeys((prev) => ({ ...prev, [event.key]: true }));
      }
    }

    function onKeyUp(event) {
      if (keys.hasOwnProperty(event.key)) {
        setKeys((prev) => ({ ...prev, [event.key]: false }));
      }
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [keys]);

  useEffect(() => {
    // Solo actualizar la cámara si alguna tecla está presionada
    if (cameraRef.current) {
      const camera = cameraRef.current;

      // Definir la velocidad de interpolación
      const speed = 1.2; // Ajusta este valor para cambiar la velocidad de movimiento

      // Movimiento de la cámara en función de las teclas de flecha con interpolación
      if (keys.ArrowUp) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, camera.position.z - 1.7, speed);
      }
      if (keys.ArrowDown) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, camera.position.z + 1.7, speed);
      }
      if (keys.ArrowLeft) {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, camera.position.x - 1.7, speed);
      }
      if (keys.ArrowRight) {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, camera.position.x + 1.7, speed);
      }
    }
  }, [keys, cameraRef]);

  return [keys, setKeys];
};

export default keyboardControls;
