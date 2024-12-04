import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './home-button.module.css'


const HomeButton = ({ onConsequencesClick,onErosionClick}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <button className={styles.backButton} onClick={() => navigate('/world')}> ← Go Back</button>

        <button className={styles.navQuiz}>Quiz</button>
    </div> 
  )
}

export default HomeButton;  // Export the HomeButton component
