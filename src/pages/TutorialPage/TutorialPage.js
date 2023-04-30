import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import beginnerVideo from '../../assets/videos/Feed.mp4'
import VidTutCard from '../../components/VideoTutorialCard/VidTutCard'
import { ModeContext } from '../../contexts/modeContext'
import styles from './TutorialPage.module.css'

const TutorialPage = () => {
    const { mode, setMode } = useContext(ModeContext)

    return (
        <div className={styles.container}>
            <Link to='/menu'>
                <button style={{
                    width: 200,
                    height: 50,
                    margin: 20,
                    padding: 10,
                    fontWeight: 700,
                    backgroundColor: "dodgerblue",
                    color: "white",
                    borderWidth: 3,
                    borderStyle: 'solid',
                    borderColor: 'white'
                }}>
                    Back</button>
            </Link>
            {mode === 'begin' && <>
                <h1>Beginner Videos</h1>
                <VidTutCard
                    mainHeading="TUTORIAL"
                    subheading='click to begin'
                    videoSrc={beginnerVideo} />
                <Link to='/practiceR'>
                    <button style={{
                        width: '100%',
                        height: 50,
                        margin: 20,
                        padding: 10,
                        fontWeight: 700,
                        backgroundColor: "white",
                        color: "dodgerblue",
                    }} >Proceed to Practice</button>
                </Link>
            </>}

            {mode === 'adv' && <>
                <h1>Advanced Videos</h1>
                <VidTutCard
                    mainHeading="TUTORIAL"
                    subheading='click to begin'
                    videoSrc={beginnerVideo} />
                <Link to='/practiceR'>
                    <button style={{
                        width: '100%',
                        height: 50,
                        margin: 20,
                        padding: 10,
                        fontWeight: 700,
                        backgroundColor: "white",
                        color: "dodgerblue",
                    }} >Proceed to Practice</button>
                </Link>
            </>}
            {mode === 'pro' && <>
                <h1>Professional Videos</h1>
                <VidTutCard
                    mainHeading="TUTORIAL"
                    subheading='click to begin'
                    videoSrc={beginnerVideo} />
                <Link to='/practiceR'>
                    <button style={{
                        width: '100%',
                        height: 50,
                        margin: 20,
                        padding: 10,
                        fontWeight: 700,
                        backgroundColor: "white",
                        color: "dodgerblue",
                    }} >Proceed to Practice</button>
                </Link>
            </>}

        </div>
    )
}

export default TutorialPage
