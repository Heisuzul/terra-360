import React from 'react'
import styles from './Navbar.module.css'

const navbar = () => {
  return (
    <div className={styles.navbar}>
        <ul className={styles.navMenu}>
            <li>Biodiversidad</li>
            <li>Consecuencias</li>
        </ul>   
        <div className={styles.navQuiz}>Quiz</div>
    </div> 
  )
}

export default navbar