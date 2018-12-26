import React from 'react';
import styles from '../styles/thumbnails.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CanvasThumbnail from './thumbnail.js';

const ThumbnailList = props => {
    const status = props.reproStatus;
    const thumbnails = props.clips.map( (clip, index) => (
        <CanvasThumbnail
            key={clip.name+clip.start+clip.end}
            id={index}
            video={props.video}
            clip={clip}
            jumpClick={props.jumpClick}
            remove={props.remove}
            edit={props.edit}
            isPlaying={status.clipId === index && status.reproducing}
        />
    ));

    return  <div className={styles.thumbnails}>{ thumbnails }</div>;
};

ThumbnailList.propTypes = {
    video: PropTypes.object,
    reproStatus: PropTypes.shape({
        clipId: PropTypes.number.isRequired,
        reproducing: PropTypes.bool.isRequired
    }).isRequired,
    clips: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            start: PropTypes.number.isRequired,
            end: PropTypes.number.isRequired
        })
    ).isRequired,
    jumpClick: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    reproStatus: state.reproStatus
});

export default connect(mapStateToProps)(ThumbnailList);