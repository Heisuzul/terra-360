import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'


const Navbar = ({pointsRef}) => {

  const [points, setPoints] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(pointsRef.current);
    }, 1000); // Update every 1000 milliseconds (1 second)

    // Cleanup the interval if the component unmounts
    return () => clearInterval(interval);
  }, [pointsRef]);

  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <button className={styles.backButton} onClick={() => navigate('/world')}> ← Go Back</button>
        <button className={styles.resultsButton}>{points}</button>
    </div> 
  )
}

export default Navbar
