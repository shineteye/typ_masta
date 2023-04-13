import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './PracticePageR.module.css';
import Content from './paragraphs';

export default function PracticePageR() {

    const [userInput, setUserInput] = useState('');
    const [charIndex, setCharIndex] = useState(0)
    const [time, setTime] = useState(0)
    const [mistakes, setMistakes] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [start, setStart] = useState(false);
    const typingTextRef = useRef()
    const inputRef = useRef()

    const handleInputChange = (e) => {
        setUserInput(e.target.value)
    }

    const handleStart = () => {
        setStart(true)
        setMistakes(0)
        setAccuracy(0)
        setTime(0)
        setTypingSpeed(0)
        setUserInput('')
    }

    const handleStop = () => {
        setStart(false)

    }


    const getRandomParagraph = () => {
        const randIndex = Math.floor(Math.random() * Content.length)
        console.log(typingTextRef);
        console.log(Content[randIndex].split(""));
        typingTextRef.current.innerHTML = ""
        Content[randIndex].split("").forEach(span => {
            let spanTag = `<span>${span}</span>`
            typingTextRef.current.innerHTML += spanTag
            // console.log(typingTextRef);
        })
        // return Content[randIndex]
    }


    useEffect(() => {
        console.log("Rendered");
        getRandomParagraph()
    }, [])

    useEffect(() => {
        if (userInput.length === 0) return
        const characters = typingTextRef.current.querySelectorAll(("span"))
        const typedChars = userInput.split("")
        console.log(characters[charIndex].getInnerHTML(), typedChars[charIndex])
        if (characters[charIndex].getInnerHTML() === typedChars[charIndex]) {
            characters[charIndex].classList.add("correct")
            characters[charIndex].getInnerHTML().style.color = "red"
            console.log("correct");
        } else {
            characters[charIndex].classList.add("incorrect")
            typingTextRef.current.color = "green"
            console.log("incorrect");

        }
        setCharIndex(charIndex + 1)
    }, [userInput])

    return (
        <>
            <Navbar />
            <div className={styles.practiceInfo}>
                <p>Time: {time}s </p>
                <p>Mistakes: {mistakes} </p>
                <p>Accuracy: {accuracy} </p>
                <p>WPM: {typingSpeed} </p>
            </div>
            <div className={styles.container}>
                <div ref={typingTextRef} >
                    <p className={styles.paragraph}></p>
                </div>
                {start ? <textarea
                    ref={inputRef}
                    rows={3}
                    placeholder='Start Typing on start'
                    value={userInput}
                    onChange={handleInputChange}
                >
                </textarea> :
                    <textarea
                        ref={inputRef}
                        rows={3}
                        placeholder='Start Typing on start'
                        value={userInput}
                        disabled={true}
                    >
                    </textarea>}
                {!start ?
                    <button className={styles.startBtn} onClick={handleStart}>Start</button> :
                    <button className={styles.stopBtn} onClick={handleStop}>Stop</button>
                }
            </div>
        </>
    )
}