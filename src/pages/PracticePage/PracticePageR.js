import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './PracticePageR.module.css';
import Content from './paragraphs';

export default function PracticePageR() {

    const [generatedParagraph, setGeneratedParagraph] = useState('');
    const [typedText, setTypedText] = useState('');
    const [correctness, setCorrectness] = useState([]);
    const [start, setStart] = useState(false)
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [typingSpeed, setTypingSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    const inputRef = useRef(null);


    useEffect(() => {
        const paragraph = Content[13]
        setGeneratedParagraph(paragraph)
    }, [])

    useEffect(() => {
        if (generatedParagraph && !startTime) {
            setStartTime(Date.now());
        }
    }, [generatedParagraph, startTime])

    const handleInputChange = (e) => {
        const inputText = e.target.value;
        setTypedText(inputText);

        // Check the correctness of each character
        const correctnessArray = inputText.split('').map((char, index) => {
            if (char === generatedParagraph[index]) {
                return 'correct'
            } else {
                return 'incorrect'
            }
        });
        setCorrectness(correctnessArray) //set the correctness of the char to the return value of the checks above

        // Update typing speed and accuracy
        const elapsedTime = (Date.now() - startTime) / 1000; // in seconds
        const typedWordCount = inputText.trim().split(' ').length;
        const typingSpeed = typedWordCount / elapsedTime;
        setTypingSpeed(typingSpeed);

        const correctCharCount = correctnessArray.filter((correctness) => correctness === 'correct').length;
        const accuracy = (correctCharCount / inputText.length) * 100;
        setAccuracy(accuracy);
    }

    const handleStart = () => {
        setStart(true)
        inputRef.current.focus()
    }

    const handleStop = () => {
        setStart(false)
    }

    const handleRestart = () => {
        inputRef.current.focus()
        setCorrectness([])
        setTypedText('')
        setStartTime(null);
        setEndTime(null);
        setTypingSpeed(0);
        setAccuracy(0);
    }


    return (
        <>
            <Sidebar />
            <div className={styles.practiceInfo}>
                <p>Time:  </p>
                <p>Mistakes: </p>
                <p>Accuracy: {accuracy.toFixed(2)}%</p>
                <p>WPM: </p>
            </div>

            <div className={styles.body}>
                <div className={styles.container}>
                    {generatedParagraph && startTime && (
                        <p className={styles.paragraph}>
                            {generatedParagraph.split('').map((char, index) => (
                                <span key={index} style={{
                                    color:
                                        correctness[index] === 'correct' ? 'green' : 'red'
                                }}
                                >
                                    {char}
                                </span>
                            ))}</p>
                    )}
                    {start ?
                        <textarea
                            ref={inputRef}
                            rows={3}
                            placeholder='Start typing...'
                            value={typedText}
                            onChange={handleInputChange}
                        >
                        </textarea> :
                        <textarea
                            ref={inputRef}
                            rows={3}
                            placeholder='Start Typing on start'
                            value={typedText}
                            disabled={true}
                        >
                        </textarea>}

                    {!start ?
                        <button className={styles.startBtn} onClick={handleStart}>Start</button> : (
                            <>
                                <button className={styles.stopBtn} onClick={handleStop}>Stop</button>
                                <button className={styles.restartBtn} onClick={handleRestart}>Restart</button>
                            </>
                        )
                    }
                    {endTime && start && (
                        <p>
                            Typing Speed: {typingSpeed.toFixed(2)} words per second | Accuracy: {accuracy.toFixed(2)}%
                        </p>
                    )}
                    {endTime ? (
                        <button onClick={handleRestart}>Restart</button>
                    ) : (
                        <button
                            disabled={typedText.length !== generatedParagraph.length}
                            onClick={() => {
                                setEndTime(Date.now());
                                inputRef.current.blur();
                            }}
                        >
                            Finish
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}