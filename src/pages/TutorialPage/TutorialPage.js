import React from 'react'
import { Link } from 'react-router-dom'
import beginnerVideo from '../../assets/videos/Feed.mp4'
import VidTutCard from '../../components/VideoTutorialCard/VidTutCard'
import styles from './TutorialPage.module.css'

const TutorialPage = () => {
    return (
        <div className={styles.container}>
            <Link to='/menu'>
                <button style={{
                    width: 300,
                    height: 50,
                    margin: 10,
                    padding: 10,
                    backgroundColor: "#cde",
                    border: "none"
                }}>
                    Back</button>
            </Link>
            <VidTutCard
                mainHeading="TUTORIAL"
                subheading='click to begin'
                videoSrc={beginnerVideo} />
            <VidTutCard
                mainHeading="TUTORIAL"
                subheading='click to begin'
                videoSrc={beginnerVideo} />
            <VidTutCard
                mainHeading="TUTORIAL"
                subheading='click to begin'
                videoSrc={beginnerVideo} />
        </div>
    )
}

export default TutorialPage
