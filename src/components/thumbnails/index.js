import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CanvasThumbnail from './thumbnail.js';
import { setCurrentClip, setUpdateId, removeClip } from '../../actions.js';
import styles from './thumbnails.css';

class ThumbnailList extends Component {
    constructor(props){
        super(props);
        this.editClip = this.editClip.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.state = { filerTag: '' };
    }

    editClip(id, clip) {
        this.props.setCurrentClip(clip);
        this.props.setUpdateId(id);
    }

    createThumbnails(){
        const { clipId, reproducing } = this.props.reproStatus;

        return this.props.clips
            .filter( clip => (
                this.state.filerTag === '' ? true :
                clip.tags.includes(this.state.filerTag)
            ))
            .map( (clip, index) => (
                <CanvasThumbnail
                    key={clip.name+clip.start+clip.end}
                    id={index}
                    video={this.props.video}
                    clip={clip}
                    jumpClick={this.props.jumpClick}
                    remove={this.props.removeClip}
                    edit={this.editClip}
                    isPlaying={clipId === index && reproducing}
                />
            ));
    }

    changeFilter(event){
        this.setState({
            filerTag: event.target.value.toLowerCase()
        })
    }

    render(){
        const maxHeight = this.props.video ?
            this.props.video.clientHeight - 32 : null;
        return  (
            <div>
                <input type='text'
                    className={styles.thumbnailsFilter}
                    name='filter'
                    placeholder='Filter thumbnail'
                    onChange={this.changeFilter}
                    value={this.state.filerTag}
                />
                <div style={{maxHeight}} className={styles.thumbnails}>
                    { this.createThumbnails() }
                </div>
            </div>
        );
    }
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
    reproStatus: state.reproStatus,
    clips: state.clips
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