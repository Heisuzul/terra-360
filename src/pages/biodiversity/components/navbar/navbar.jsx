import React from 'react'
import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
        <ul className={styles.navMenu}>
            <li>Biodiversity</li>
            <li>Consequences</li>
        </ul>   
        <div className={styles.navQuiz}>Quiz</div>
    </div> 
  )
}

export default Navbar
