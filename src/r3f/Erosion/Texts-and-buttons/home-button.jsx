import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './home-button.module.css';


const HomeButton = ({ label }) => {
  const navigate = useNavigate();  


  const handleClick = () => {
    navigate('/world');  
  };

  return (
    <button className={styles.homeButton} onClick={handleClick}>
      {label}
    </button>
  );
};

export default HomeButton;