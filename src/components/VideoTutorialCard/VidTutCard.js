import React from 'react';
import styles from './VidTutCard.module.css';

const VidTutCard = ({ mainHeading, subheading, videoSrc }) => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <h1>{mainHeading}</h1>
                <h3>{subheading}</h3>
            </div>
            <div className={styles.vidContainer}>
                <video src={videoSrc} controls style={{ margin: 10, width: 400, height: 400 }}></video>
            </div>
        </div>
    )
};

export default VidTutCard