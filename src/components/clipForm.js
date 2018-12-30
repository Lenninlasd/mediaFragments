import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { saveClipsState } from '../localStorage.js';
import styles from '../styles/clipForm.css';
import { setCurrentClip } from '../actions.js';

class AddClip extends Component {
    constructor(props){
        super(props);
        this.createClip = this.createClip.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    }

    createClip(event){
        event.preventDefault();
        this.props.onShoot();
    }

    handleChange(event){
        const tg = event.target;
        const value = tg.name === 'name' ? tg.value : this.formatedTextToSeconds(tg.value);
        this.props.setCurrentClip({
            [tg.name]: value
        });
    }

    formatedTextToSeconds(text){
        const timeArray = text.split(':').map(Number);
        const seconds = timeArray[timeArray.length-1];
        const minutes = timeArray[timeArray.length-2] || 0;
        const hours = timeArray.length === 3 ? timeArray[0] : 0;
        const totalMinutes = minutes < 60 ? minutes : 59;
        const totalSeconds = seconds < 60 ? seconds : 59;

        return hours*3600 + totalMinutes*60 + totalSeconds;
    }

    formatTime(time){
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor( (time%3600) / 60);
        const seconds = Math.floor(time % 60);
        const format = `${minutes}:${seconds}`
        return hours > 0 ? `${hours}:${format}` : format;
    }

    saveToLocalStorage(){
        saveClipsState(this.props.clips);
    }

    render(){
        return this.props.endableEditing && (
            <div className={styles.formContainer}>
                <form onSubmit={this.createClip}
                    autoComplete='off'>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={this.props.currentClip.name}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        className={styles.inputTime}
                        name='start'
                        type='text'
                        placeholder='0:00'
                        value={this.formatTime(this.props.currentClip.start)}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        className={styles.inputTime}
                        name='end'
                        type='text'
                        placeholder='0:00'
                        value={this.formatTime(this.props.currentClip.end)}
                        onChange={this.handleChange}
                        required
                    />
                    <button type="submit">
                        { this.props.updateId ? 'Update' : 'Clip' }
                    </button>
                </form>
                <button onClick={this.saveToLocalStorage}>Save</button>
            </div>
        );
    }
}

const clipPropType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired
}).isRequired

AddClip.propTypes = {
    endableEditing: PropTypes.bool.isRequired,
    onShoot: PropTypes.func.isRequired,
    setCurrentClip: PropTypes.func.isRequired,
    currentClip: clipPropType,
    clips: PropTypes.arrayOf(clipPropType).isRequired
}

const mapStateToProps = state => ({
    endableEditing: state.endableEditing,
    updateId: state.updateId,
    currentClip: state.currentClip,
    clips: state.clips
});

const mapDispatchToProps = dispatch => ({
    setCurrentClip: clip => dispatch(setCurrentClip(clip))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddClip);