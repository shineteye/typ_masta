import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
    return (
        <div className={styles.container}>
            <Link to="/">
                <p className={styles.navbarText}>Navbar</p>
            </Link>
            <Link to="/home">
                <p className={styles.navbarText}>Home</p>
            </Link>
            <Link to="/menu">
                <p className={styles.navbarText}>Menu</p>
            </Link>

            <Outlet />
        </div>
    )
}

export default Navbar
