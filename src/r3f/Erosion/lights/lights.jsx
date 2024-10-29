import React from 'react';

/**
 * Lights component provides lighting for the 3D scene.
 * - Includes a directional light and an ambient light for balanced illumination.
 */

const Lights = () => (
  <>
    {/* Directional Light: Mimics sunlight with shadow casting */}
    <directionalLight 
      position={[-1, 5, 0.4]} // Light source position
      intensity={1.5}         // Brightness of the light
      castShadow              // Enables shadow casting
    />

    {/* Ambient Light: Softens shadows and adds base light to the scene */}
    <ambientLight intensity={2} />
  </>
);

export default Lights;