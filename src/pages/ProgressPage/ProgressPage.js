import React, { useContext } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { ScoreContext } from '../../contexts/scoreContext';
import styles from './ProgressPage.module.css';

export const ProgressPage = () => {
    const [accur, , wpm] = useContext(ScoreContext)

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
                    <h3>{accur} </h3>
                    <h3>{wpm} </h3>
                </div>
                <div className={styles.scoreSection}>
                    <h1>Advanced</h1>
                    <h3>{accur} </h3>
                    <h3>{wpm} </h3>
                </div>
                <div className={styles.scoreSection}>
                    <h1>Professional</h1>
                    <h3>{accur} </h3>
                    <h3>{wpm} </h3>
                </div>
            </div>
        </div>
    )
}
