import React from 'react'
import beginnerVideo from '../../assets/videos/Feed.mp4'
import VidTutCard from '../../components/VideoTutorialCard/VidTutCard'
import styles from './TutorialPage.module.css'

const TutorialPage = () => {
    return (
        <div className={styles.container}>
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
