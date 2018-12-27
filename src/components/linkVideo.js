import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import styles from '../styles/clipForm.css';

const LinkVideo = props => {
    return (
        <form className={styles.formContainer}>
            <input
                className={styles.inputUrl}
                type='text' 
                placeholder='Video URL'
                value={props.videoSrc}
                readOnly
                required
            />
        </form>
    );
};

const mapStateToProps = state => ({
    videoSrc: state.videoSrc
});

export default connect(
    mapStateToProps
)(LinkVideo);