import React from 'react';
import { usePlane } from '@react-three/cannon';

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], // Plano horizontal
    position: [0, -2965, 0], // Ubicación del suelo
    friction: 1, // Mayor fricción para evitar deslizamientos
    restitution: 0, // Reduce el rebote
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[300, 300]} /> {/* Tamaño del plano */}
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

export default Plane;
