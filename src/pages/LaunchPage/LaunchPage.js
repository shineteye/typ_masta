import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
// import styles from './LaunchPage.module.css';

const LaunchPage = () => {
    const styles = {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100vh'
    };

    const mainContentStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        minHeight: '100%',
    }

    const headerText = {
        color: "rgb(11, 28, 102)",
        padding: 10,
        marginBottom: 10,
        fontSize: 30,
        fontWeight: 700,
        justifyContent: "center",
        alignItems: "center",
    }

    return (
        <div style={styles}>
            <Sidebar />
            <div style={mainContentStyles}>
                <h1>Welcome to TYPMASTA</h1>
                <p className={headerText}></p>
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
        </div>
    );
}

export default LaunchPage
