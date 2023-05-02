import React from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import styles from './VidTutCard.module.css';


const VidTutCard = ({ mainHeading, subheading, videoSrc }) => {

    return (
        <div className={styles.container}>
            <div className={styles.vidContainer}>
                <VideoPlayer source={videoSrc} />
                {/* <video src={videoSrc} controls style={{ margin: 10, width: 400, height: 400 }}></video> */}
            </div>
        </div>
    )
};

export default VidTutCard