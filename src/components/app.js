import React from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from './videoPlayer.js';
import Thumbnails from './thumbnails.js';
import AddClip from './clipForm.js';
import ProgressLoader from './progressLoader.js'
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
                jumpClick={props.jumpClick}
            />
            <div className={styles.videoContainer}>
                <ProgressLoader video={props.video} />
                <VideoPlayer
                    videoref={props.videoref}
                    onLoadedData={props.onLoadedData}
                    onCanPlay={props.onCanPlay}
                    width='800'
                    height='450'
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
    video: PropTypes.object,
    videoref: PropTypes.object.isRequired,
    jumpClick: PropTypes.func.isRequired,
    onLoadedData: PropTypes.func.isRequired,
    onCanPlay: PropTypes.func.isRequired,
    onPauseClip: PropTypes.func.isRequired,
    shoot: PropTypes.func.isRequired
}

export default LayoutApp;