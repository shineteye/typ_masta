import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './PracticePage.module.css';

const PracticePage = () => {
    const [currentText, setCurrentText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    function startTimer() {
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        }, 1000);
    }

    function stopTimer() {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    }

    function handleStart() {
        setCurrentText(getText());
        setElapsedTime(0);
        setCorrectKeystrokes(0);
        setTypingSpeed(0);
        setUserInput('');
        startTimer();
    }

    useEffect(() => {
        // Generate a new paragraph or essay for the user to type
        setCurrentText(getText());
    }, []);

    useEffect(() => {
        // Start the timer when the current text changes
        const startTime = Date.now();
        const timer = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }, [currentText]);

    function handleInputChange(event) {
        const value = event.target.value;
        setUserInput(value);
        if (currentText.endsWith(value)) {
            // The user has typed the correct text
            setCorrectKeystrokes(correctKeystrokes + currentText.length);
            setCurrentText(getText());
            setUserInput('');
        }
    }

    function getText() {
        const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat.Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officiadeserunt mollit anim id est laborum.';

        const useText = text.split(" ")

        const index = Math.floor(Math.random() * useText.length);
        console.log(useText);
        return useText[index];

    }

    useEffect(() => {
        // Calculate the user's typing speed based on the elapsed time and the number of correct keystrokes
        setTypingSpeed(Math.floor((correctKeystrokes / elapsedTime) * 60));
    }, [correctKeystrokes, elapsedTime]);

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.practiceInfo}>
                <p>Total Words: {"300 Words"}</p>
                <p>Elapsed Time: {elapsedTime}s </p>
                <p>Mistakes: {correctKeystrokes} </p>
                <p>WPM: {typingSpeed} </p>
            </div>
            <div className={styles.sampleText}>
                <p>
                    {currentText}
                </p>
            </div>
            <input style={{ padding: 10, margin: 10, width: '40%', border: 'none', backgroundColor: "#cde", outline: 'none', fontSize: 20 }} value={userInput} onChange={handleInputChange} />
            <button onClick={handleStart} disabled={isRunning}>
                Start
            </button>
            <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
        </div>
    )
}

export default PracticePage
