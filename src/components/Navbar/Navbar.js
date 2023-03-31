import React from 'react'
import styles from './Navbar.module.css'

function Navbar() {
    return (
        <div className={styles.container}>
            <p className={styles.navbarText}>Navbar</p>
            <p className={styles.navbarText}>Home</p>
        </div>
    )
}

export default Navbar
