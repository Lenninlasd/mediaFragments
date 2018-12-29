import React from 'react';
import styles from '../styles/thumbnails.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CanvasThumbnail from './thumbnail.js';
import { setCurrentClip, setUpdateId, removeClip } from '../actions.js';


const ThumbnailList = props => {

    const editClip = (id, clip) => {
        props.setCurrentClip(clip);
        props.setUpdateId(id);
    }

    const status = props.reproStatus;
    const thumbnails = props.clips.map( (clip, index) => (
        <CanvasThumbnail
            key={clip.name+clip.start+clip.end}
            id={index}
            video={props.video}
            clip={clip}
            jumpClick={props.jumpClick}
            remove={props.removeClip}
            edit={editClip}
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
    setCurrentClip: PropTypes.func.isRequired,
    setUpdateId: PropTypes.func.isRequired,
    removeClip: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    reproStatus: state.reproStatus
});

const mapDispatchToProps = dispatch => ({
    setCurrentClip: clip     => dispatch(setCurrentClip(clip)),
    setUpdateId:    updateId => dispatch(setUpdateId(updateId)),
    removeClip:     id       => dispatch(removeClip(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThumbnailList);