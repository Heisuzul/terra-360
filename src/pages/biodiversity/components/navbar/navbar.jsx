import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css'


const Navbar = ({ onConsequencesClick, onBiodiversityClick}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <button className={styles.backButton} onClick={() => navigate('/world')}> ← Go Back</button>
        <ul className={styles.navMenu}>
            <li onClick={() => onBiodiversityClick()}>Biodiversity</li>
            <li onClick={() => onConsequencesClick()}>Consequences</li>
        </ul>   
        <button className={styles.navQuiz}>Quiz</button>
    </div> 
  )
}

export default Navbar
