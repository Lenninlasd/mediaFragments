import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/videoPlayer.css';

const TimeLineMarkers = props => {
    const margin = 32;
    const width = props.width - 2*margin;
    const totalTime = props.clips.length ? props.clips[0].end : 0;

    const listMarkers = props.clips.map( (clip, index) => {
        const left = clip.start * width/totalTime;
        return (
            <div onClick={ () => props.jumpClick(index)}
                style={{left}}
                key={clip.name+clip.start+clip.end}
                className={styles.marker}>
            </div>
        );
    });

    return (
        <div style={{width, left: margin}}
            className={styles.markerContainer}>
            { listMarkers }
        </div>
    );
}

const VideoPlayer = props => {
    const t = `#t=${props.start},${props.end}`;
    const videoPath = props.start ? `${props.src}${t}` : props.src;
    const minWidthPadding = 2*8+6+100;
    const minHeightPadding = 4*8+ 47;
    const { innerWidth, innerHeight } = window;

    let videoWidth = props.width;
    let videoHeight = props.height;
    if(props.width > innerWidth - minWidthPadding){
        videoWidth = innerWidth - minWidthPadding;
    }
    if(props.height > innerHeight - minHeightPadding){
        videoHeight = innerHeight - minHeightPadding;
    }

    return (
        <div className={styles.videoContainer}>
            <TimeLineMarkers 
                width={videoWidth} 
                clips={props.clips}
                jumpClick={props.jumpClick}
            />
            <video
                className={styles.video}
                ref={props.videoref} 
                controls
                preload='auto'
                src={ videoPath }
                width={videoWidth}
                height={videoHeight}
                onLoadedData={props.onLoadedData}
                onCanPlay={props.onCanPlay}
                onPause={props.onPause}
            />
        </div>
    );
};

TimeLineMarkers.propTypes = {
    width: PropTypes.number.isRequired,
    clips: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            start: PropTypes.number.isRequired,
            end: PropTypes.number.isRequired
        })
    ).isRequired,
    jumpClick: PropTypes.func.isRequired
}

VideoPlayer.propTypes = {
    start: PropTypes.number,
    end: PropTypes.number,
    src: PropTypes.string.isRequired,
    videoref: PropTypes.object.isRequired,
    onLoadedData: PropTypes.func,
    onCanPlay: PropTypes.func,
    onPause: PropTypes.func,
    width: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    clips: state.clips,
    src: state.videoSrc
});

export default connect(
    mapStateToProps
)(VideoPlayer);