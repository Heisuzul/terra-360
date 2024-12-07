import React, { useState } from 'react';
import './SolutionsOverlay.css';

const SolutionsOverlay = ({ onHide }) => {
  return (
    <div className="solutions-overlay">
      <div className="solutions-card">
        <button 
          className="close-button"
          onClick={onHide}
        >
          ✕
        </button>
        
        <h3 className="solutions-title">Solutions</h3>
        <ul className="solutions-list">
            <li>🌳 <strong>Plant Trees:</strong> Engage in reforestation and afforestation efforts to restore degraded lands.</li>
            <li>📜 <strong>Support Policies:</strong> Advocate for and support policies that protect forests and promote sustainable land use.</li>
            <li>🪵 <strong>Sustainable Logging:</strong> Encourage sustainable logging practices that minimize environmental impact.</li>
            <li>🌱 <strong>Agroforestry:</strong> Promote agroforestry practices that integrate trees into agricultural landscapes.</li>
            <li>🛍️ <strong>Reduce Consumption:</strong> Reduce consumption of products that contribute to deforestation, such as palm oil and beef.</li>
            <li>💡 <strong>Raise Awareness:</strong> Educate others about the importance of forests and the impact of deforestation.</li>
        </ul>
      </div>
    </div>
  );
};

export default SolutionsOverlay;