import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './PracticePageR.module.css';
import Content from './paragraphs';

export default function PracticePageR() {

    const [generatedParagraph, setGeneratedParagraph] = useState('');
    const [typedText, setTypedText] = useState('');
    const [correctness, setCorrectness] = useState([]);
    const [start, setStart] = useState(false)


    useEffect(() => {
        const paragraph = Content[1]
        setGeneratedParagraph(paragraph)
    }, [])

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
    }

    const handleStart = () => {
        setStart(true)
    }

    const handleStop = () => {
        setStart(false)
    }

    const handleRestart = () => {
        setTypedText('')
    }


    return (
        <>
            <Navbar />
            <div className={styles.practiceInfo}>
                <p>Time:  </p>
                <p>Mistakes: </p>
                <p>Accuracy:</p>
                <p>WPM: </p>
            </div>

            <div className={styles.body}>
                <div className={styles.container}>
                    <p>
                        {generatedParagraph.split('').map((char, index) => (
                            <span key={index} style={{
                                color:
                                    correctness[index] === 'correct' ? 'green' : 'red'
                            }}
                            >
                                {char}
                            </span>
                        ))}</p>
                    {start ? <textarea
                        rows={3}
                        placeholder='Start typing...'
                        value={typedText}
                        onChange={handleInputChange}
                    >
                    </textarea> :
                        <textarea
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
                </div>
            </div>
        </>
    )
}