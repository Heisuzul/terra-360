import React, { useEffect } from 'react';
import { useBox } from '@react-three/cannon';

function Tree({ geometry, material, position, rotation, scale, applyPhysics }) {
  const initialPosition = React.useRef(position);

  const [ref, api] = useBox(() => ({
    mass: applyPhysics ? 1000 : 0 , // Masa del árbol
    position, // Posición inicial
    rotation: [Math.random() * 0.1,0,Math.random() * 0.1], // Rotación inicial
    type: applyPhysics ? 'Dynamic' : 'Static', // Física activa o estática
    friction: 1, // Fricción alta para evitar deslizamientos excesivos
    restitution: 0, // Rebote reducido para mayor realismo
    sleepSpeedLimit: 0.01,
    sleepTimeLimit: 1,
  }));

  useEffect(() => {
    if (applyPhysics) {
 
      api.mass.set(1000); 
      api.velocity.set(0, -5, 0); 
      api.angularVelocity.set(1, 3, 1); 
      api.sleepSpeedLimit.set(0.01);
      api.sleepTimeLimit.set(0.1);
    } else {
    
      api.mass.set(0);   
      api.velocity.set(0, 0, 0); // Elimina cualquier movimiento.
      api.angularVelocity.set(0, 0, 0); // Detiene la rotación.
      api.position.set(...initialPosition.current);
      api.rotation.set(Math.random() * 0.1,0,Math.random() * 0.1);
    }
  }, [applyPhysics, api]);

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      material={material}
      rotation={rotation}
      scale={scale}
      castShadow
    />
  );
}

export default Tree;