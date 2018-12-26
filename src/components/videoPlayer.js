import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = props => {
    const t = `#t=${props.start},${props.end}`;
    const videoPath = props.start ? `${props.src}${t}` : props.src;
    return (
        <video 
            ref={props.videoref} 
            controls 
            src={ videoPath }
            width={props.width} 
            onLoadedData={props.onLoadedData}
            onCanPlay={props.onCanPlay}
        />
    );
};


VideoPlayer.propTypes = {
    start: PropTypes.number,
    end: PropTypes.number,
    src: PropTypes.string.isRequired,
    videoref: PropTypes.object.isRequired,
    onLoadedData: PropTypes.func,
    onCanPlay: PropTypes.func,
    width: PropTypes.string.isRequired
};

export default VideoPlayer;