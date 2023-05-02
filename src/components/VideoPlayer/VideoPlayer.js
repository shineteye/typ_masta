import React from 'react'

function VideoPlayer({ source }) {
    return (
        <div>
            <iframe
                width="560"
                height="315"
                src={source}
                frameborder="0"
                allowfullscreen
            >
            </iframe>
        </div>
    )
}

export default VideoPlayer
