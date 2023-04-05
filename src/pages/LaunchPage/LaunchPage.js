import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import styles from './LaunchPage.module.css';

const LaunchPage = () => {


    return (
        <div className={styles.container}>
            <Navbar />
            <div style={{ marginTop: 200, height: '80vh' }}>
                <Header header="Welcome to TYPMASTA" />
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
            </div >

        </div>
    )
}

export default LaunchPage
