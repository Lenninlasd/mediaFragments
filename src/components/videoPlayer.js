import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/videoPlayer.css';

const TimeLineMarkers = props => {
    const margin = 32;
    const width = Number(props.width.split('px')[0]) - 2*margin;
    const totalTime = props.clips.length ? props.clips[0].end : 0;

    const listMarkers = props.clips.map( (clip, index) => {
        const left = clip.start * width/totalTime;
        return (
            <div onClick={ () => props.jumpClick(index)}
                style={{left}}
                key={clip.name+clip.start}
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
    return (
        <div className={styles.videoContainer}>
            <TimeLineMarkers 
                width={props.width} 
                clips={props.clips}
                jumpClick={props.jumpClick}
            />
            <video
                className={styles.video}
                ref={props.videoref} 
                controls
                preload='auto'
                src={ videoPath }
                width={props.width} 
                onLoadedData={props.onLoadedData}
                onCanPlay={props.onCanPlay}
                onPause={props.onPause}
            />
        </div>
    );
};

TimeLineMarkers.propTypes = {
    width: PropTypes.string.isRequired,
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
    clips: state.clips
});

export default connect(
    mapStateToProps
)(VideoPlayer);