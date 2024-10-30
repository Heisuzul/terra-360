// src/pages/deforestation/Deforestation.jsx
import React from 'react';
import Scene from '../../r3f/deforestation/scenes/Scene';

const Deforestation = ({ ready, setReady }) => {
  return (
    <div className="deforestation-container">
      {/* <h1>Deforestation Awareness</h1> */}
      <Scene ready={ready} setReady={setReady}/>
    </div>
  );
};

export default Deforestation;