import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'


const Navbar = ({points}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <button className={styles.backButton} onClick={() => navigate('/world')}> ← Go Back</button>
        <button className={styles.resultsButton}>{points}</button>
    </div> 
  )
}

export default Navbar
