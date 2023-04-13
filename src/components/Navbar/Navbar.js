import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
    return (
        <div className={styles.container}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <p className={styles.navbarText}>Home</p>
            </Link>
            <Link to="/menu" style={{ textDecoration: 'none' }}>
                <p className={styles.navbarText}>Menu</p>
            </Link>
            <Link to="/practiceR" style={{ textDecoration: 'none' }}>
                <p className={styles.navbarText}>Practice</p>
            </Link>
            <Link to="/progress" style={{ textDecoration: 'none' }}>
                <p className={styles.navbarText}>Progress</p>
            </Link>

            <Outlet />
        </div>
    )
}

export default Navbar
