import React from 'react'
import styles from './navbar.module.css'

const navbar = () => {
  return (
    <div className={styles.navbar}>
        <ul className={styles.navMenu}>
            <li>Biodiversidad</li>
            <li>Consecuencias</li>
        </ul>   
    </div> 
  )
}

export default navbar