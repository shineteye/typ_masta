import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import styles from './LaunchPage.module.css';

const LaunchPage = () => {


    return (
        <>
            <Navbar />
            <Header />
            <div className={styles.container}>
                <div>
                    <Link to='/menu'>
                        <Button text="Next" />
                    </Link>
                </div>

                <Outlet />
            </div>
        </>
    )
}

export default LaunchPage
