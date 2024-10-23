// src/r3f/deforestation/lights/AmbientLight.jsx
import React from 'react';

const AmbientLight = ({ intensity = 0.5, color = 'white' }) => {
  return <ambientLight intensity={intensity} color={color} />;
};

export default AmbientLight;