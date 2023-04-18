import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import progress from '../../assets/img/graphic-progression.png'
import home from '../../assets/img/home-icon-silhouette.png'
import practice from '../../assets/img/keyboard.png'
import menu from '../../assets/img/list.png'
import styles from './Sidebar.module.css'

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.img}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img src={home} alt='home' />
                </Link>
                <Link to="/menu" style={{ textDecoration: 'none' }}>
                    <img src={menu} alt='menu' />
                </Link>
                <Link to="/practiceR" style={{ textDecoration: 'none' }}>
                    <img src={practice} alt='home' />
                </Link>
                <Link to="/progress" style={{ textDecoration: 'none' }}>
                    <img src={progress} alt='home' />
                </Link>
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar
