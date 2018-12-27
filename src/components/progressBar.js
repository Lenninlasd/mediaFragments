import React from 'react';
import styles from '../styles/progressBar.css';
import PropTypes from 'prop-types';

const ProgresBar = props => {
    return (
        props.isWaiting &&  
        <div style={{width:'800px', height:'450px'}}className={styles.container}>
            <div 
                style={{top:'175px', left:'350px'}} 
                className={styles.wrapper} 
                data-anim="base wrapper">
                <div className={styles.circle} data-anim="base left"></div>
                <div className={styles.circle} data-anim="base right"></div>
            </div>
        </div>
    );
};

ProgresBar.propTypes = {
    isWaiting: PropTypes.bool.isRequired
};

export default ProgresBar;