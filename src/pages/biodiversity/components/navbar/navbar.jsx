import React from 'react'
import styles from './navbar.module.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <button className={styles.backButton} onClick={() => navigate('/world')}> ← Go Back</button>
        <ul className={styles.navMenu}>
            <li>Biodiversity</li>
            <li>Consequences</li>
        </ul>   
        <div className={styles.navQuiz}>Quiz</div>
    </div> 
  )
}

export default Navbar
