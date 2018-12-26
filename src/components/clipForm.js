import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/clipForm.css';

class AddClip extends Component {
    constructor(props){
        super(props);
        this.createClip = this.createClip.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createClip(event){
        event.preventDefault();
        this.props.onShoot();
    }

    handleChange(event){
        const tg = event.target;
        const value = tg.name === 'name' ? tg.value : Number(tg.value);
        this.props.setCurrentClip({
            [tg.name]: value
        });
    }

    render(){
        return (
            <form className={styles.formContainer} onSubmit={this.createClip} autoComplete='off'>
                <input
                    type='text' 
                    name='name' 
                    placeholder='Name'
                    value={this.props.data.name}
                    onChange={this.handleChange}
                    required
                />
                <input
                    className={styles.inputTime}
                    name='start' 
                    type='number' 
                    placeholder='0:00' 
                    value={this.props.data.start} 
                    onChange={this.handleChange}
                    required
                />
                <input
                    className={styles.inputTime}
                    name='end'
                    type='number'
                    placeholder='0:00'
                    value={this.props.data.end}
                    onChange={this.handleChange}
                    required
                />
                <button type="submit">Clip</button>
            </form>
        );
    }
}

AddClip.propTypes = {
    onShoot: PropTypes.func.isRequired,
    setCurrentClip: PropTypes.func.isRequired,
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        start: PropTypes.number.isRequired,
        end: PropTypes.number.isRequired
    }).isRequired
}

const mapStateToProps = state => ({
    data: state.currentClip
});

const mapDispatchToProps = dispatch => ({
    setCurrentClip: clip => dispatch({
        type: 'SET_CURRENT_CLIP',
        clip
    })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddClip);