import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../clipForm/clipForm.css';
import { setSrcVideo } from '../../actions.js';

const LinkVideo = props => {

    const onChangeLink = event => {
        props.setSrcVideo(event.target.value);
    }
    const submit = event => {
        event.preventDefault();
    }

    return (
        <form onSubmit={submit} className={styles.formContainer}>
            <input
                className={styles.inputUrl}
                type='text' 
                placeholder='Video URL'
                value={props.videoSrc}
                onChange={onChangeLink}
                required
            />
        </form>
    );
};

LinkVideo.propTypes = {
    videoSrc: PropTypes.string.isRequired,
    setSrcVideo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    videoSrc: state.videoSrc
});

const mapDispatchToProps = dispatch => ({
    setSrcVideo: videoSrc => dispatch(setSrcVideo(videoSrc))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LinkVideo);