import React from 'react';

const Lights = () => (
  <>
    <directionalLight position={[-1, 5, 0.4]} intensity={1.5} castShadow />
    <ambientLight intensity={2} />
  </>
);

export default Lights;