import React from 'react';
import Scene from '../../r3f/Erosion/scenes/scene';

/**
 * Erosion component that renders the main scene for the erosion visualization.
 * This component acts as a wrapper for the 3D scene defined in the Scene component.
 * 
 * @returns {JSX.Element} - A div containing the erosion Scene component.
 */
const Erosion = () => {
  return (
    // Container div for the erosion scene, potentially for applying CSS styling specific to this view
    <div className="deforestation-container">
      <Scene /> {/* Renders the 3D scene */}
    </div>
  );
};

export default Erosion;