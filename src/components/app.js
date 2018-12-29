import React from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from './videoPlayer.js';
import Thumbnails from './thumbnails.js';
import AddClip from './clipForm.js';
import ProgressBar from './progressBar.js'
import LinkVideo from './linkVideo.js';
import styles from '../styles/app.css';

const LayoutApp = props => (
    <div className={styles.appContainer}
        tabIndex='0'
        onKeyDown={props.keyControls} >
        <LinkVideo />
        <div className={styles.container}>
                    <Thumbnails
                        video={props.video}
                        clips={props.clips}
                        jumpClick={props.jumpClick}
                    />
                    <div className={styles.videoContainer}>
                        <ProgressBar isWaiting={props.reproStatus.isWaiting} />
                        <VideoPlayer
                            videoref={props.videoref}
                            src={props.videoSrc}
                            onLoadedData={props.onLoadedData}
                            onCanPlay={props.onCanPlay}
                            width='800px'
                            onPause={props.onPauseClip}
                            jumpClick={props.jumpClick}
                        />
                        <AddClip onShoot={props.shoot}/>
                    </div>
        </div>
    </div>
);

LayoutApp.propTypes = {
    keyControls: PropTypes.func.isRequired,
    videoSrc: PropTypes.string.isRequired,
    video: PropTypes.object,
    videoref: PropTypes.object.isRequired,
    clips: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            start: PropTypes.number.isRequired,
            end: PropTypes.number.isRequired
        })
    ).isRequired,
    jumpClick: PropTypes.func.isRequired,
    reproStatus: PropTypes.shape({
        clipId: PropTypes.number.isRequired,
        reproducing: PropTypes.bool.isRequired,
        isWaiting: PropTypes.bool.isRequired
    }).isRequired,
    onLoadedData: PropTypes.func.isRequired,
    onCanPlay: PropTypes.func.isRequired,
    onPauseClip: PropTypes.func.isRequired,
    shoot: PropTypes.func.isRequired
}

export default LayoutApp;