import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import ScoreContext from '../../contexts/scoreContext';
import styles from './ProgressPage.module.css';

export const ProgressPage = () => {
    const { accur, setAccur, wpm, setWPM } = useContext(ScoreContext)
    const params = useParams();
    const scoreBeginner = localStorage.getItem("begin") ? JSON.parse(localStorage.getItem("begin")) : {}
    const scoreAdv = localStorage.getItem("adv") ? JSON.parse(localStorage.getItem("adv")) : {}
    const scorePro = localStorage.getItem("pro") ? JSON.parse(localStorage.getItem("pro")) : {}


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
                {(!params.mode || params.mode === 'begin') && (

                    <div className={styles.scoreSection}>
                        <h1>Beginner</h1>
                        <h3>Accuracy: {scoreBeginner?.accuracy || 0} </h3>
                        <h3>Words per Minute: {scoreBeginner?.typingSpeed || 0} </h3>
                    </div>
                )
                }
                {(!params.mode || params.mode === 'adv') && (
                    <div className={styles.scoreSection}>
                        <h1>Intermediate</h1>
                        <h3>Accuracy: {scoreAdv?.accuracy || 0} </h3>
                        <h3>Words per Minute: {scoreAdv?.typingSpeed || 0} </h3>
                    </div>
                )}
                {(!params.mode || params.mode === 'pro') && (
                    <div className={styles.scoreSection}>
                        <h1>Advanced</h1>
                        <h3>Accuracy: {scorePro?.accuracy || 0} </h3>
                        <h3>Words per Minute: {scorePro?.typingSpeed || 0} </h3>
                    </div>
                )}
            </div>
        </div>
    )
}
