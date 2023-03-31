import React, { useEffect } from 'react';

function YouTubeVideo({ videoId }) {
    let player;

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = initializePlayer;

        return () => {
            delete window.onYouTubeIframeAPIReady;
        };
    }, [videoId]);

    function initializePlayer() {
        player = new window.YT.Player('player', {
            height: '360',
            width: '640',
            videoId: videoId,
            events: {
                onReady: onPlayerReady,
            },
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function stopVideo() {
        player.stopVideo();
    }

    return (
        <div>
            <div id="player"></div>
            <button onClick={stopVideo}>Stop Video</button>
        </div>
    );
}

export default YouTubeVideo;