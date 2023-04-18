import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './LaunchPage.module.css';

const LaunchPage = () => {


    return (
        <>
            <Sidebar />
            <div className={styles.container}>
                <p className={styles.headerText}>Welcome to TYPMASTA</p>
                <Link to='/menu'>
                    <button style={{
                        width: 250,
                        height: 50,
                        margin: 10,
                        padding: 10,
                        backgroundColor: "rgb(47, 130, 254)",
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                        borderRadius: 5,
                        border: "none",
                        cursor: 'pointer'
                    }}
                    >Get Started</button>
                </Link>
                <Outlet />
            </div>
        </>
    )
}

export default LaunchPage
