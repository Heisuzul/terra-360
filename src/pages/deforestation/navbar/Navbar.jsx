import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <button className={styles.backButton} onClick={() => navigate('/world')}> ← Go Back</button>
        <ul className={styles.navMenu}>
          {/* <li className={styles.navItem}>Causes</li>
          <li className={styles.navItem}>Effects</li> */}
        </ul>   
        {/* <button className={styles.navQuiz}>Results</button> */}
    </div> 
  )
}

export default Navbar
