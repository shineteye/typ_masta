import React from 'react'

function VideoPlayer({ source }) {
    return (
        <div>
            <iframe
                title='typmasta-videos'
                width="560"
                height="315"
                src={source}
                frameborder="0"
                allowfullscreen
            />
        </div>
    )
}

export default VideoPlayer
