import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './ProgressPage.module.css';

export const ProgressPage = () => {


    const container = {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100vh',
    };

    return (
        <div style={container}>
            <Sidebar />
            <div className={styles.body}>
                <h1 className={styles.headerText}>Scores</h1>
                <div className={styles.scoreSection}>
                    <h1>Beginner</h1>
                    <h3>High Score: </h3>
                </div>
                <div className={styles.scoreSection}>
                    <h1>Advanced</h1>
                    <h3>High Score: </h3>
                </div>
                <div className={styles.scoreSection}>
                    <h1>Professional</h1>
                    <h3>High Score: </h3>
                </div>
            </div>
        </div>
    )
}
