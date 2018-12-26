import React from 'react';
import styles from '../styles/thumbnails.css';
import PropTypes from 'prop-types';

import CanvasThumbnail from './thumbnail.js';

const ThumbnailList = props => {
    const thumbnails = props.clips.map( (clip, index) => (
        <CanvasThumbnail
            key={clip.name+clip.start+clip.end}
            id={index}
            video={props.video}
            clip={clip}
            jumpClick={props.jumpClick}
            remove={props.remove}
            edit={props.edit}
        />
    ));

    return  <div className={styles.thumbnails}>{ thumbnails }</div>;
};

ThumbnailList.propTypes = {
    video: PropTypes.object,
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

export default ThumbnailList;