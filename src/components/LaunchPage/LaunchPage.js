import React from 'react';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import styles from './LaunchPage.module.css';

const handleClick = () => {
    alert("clicked")
}

function LaunchPage() {
    return (
        <div className={styles.container}>
            <Navbar />
            <Header />
            <Button text="Next" handler={handleClick} />
        </div>
    )
}

export default LaunchPage
