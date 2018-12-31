import React from 'react';
import { connect } from 'react-redux';
import styles from './progressLoader.css';
import PropTypes from 'prop-types';

const ProgressLoader = props => {
    
    const getVideoStyle = video => ({
        width: video.clientWidth, 
        height: video.clientHeight
    });
    const getCenter = video => ({
        top: video.clientHeight/2 -50,
        left: video.clientWidth/2 - 50
    });

    return (
        props.isWaiting && props.video &&
        <div style={getVideoStyle(props.video)} className={styles.container}>
            <div style={getCenter(props.video)}
                className={styles.wrapper}
                data-anim="base wrapper">
                <div className={styles.circle} data-anim="base left"></div>
                <div className={styles.circle} data-anim="base right"></div>
            </div>
        </div>
    );
};

ProgressLoader.propTypes = {
    isWaiting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isWaiting: state.reproStatus.isWaiting
});

export default connect(mapStateToProps)(ProgressLoader);