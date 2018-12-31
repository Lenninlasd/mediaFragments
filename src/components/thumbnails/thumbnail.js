import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './thumbnails.css';

class CanvasThumbnail extends Component {

    constructor (props){
        super(props);
        this.resize = 0.15;
        this.width = 120;
        this.jumpEvent = this.jumpEvent.bind(this);
        this.removeThumbnail = this.removeThumbnail.bind(this);
        this.editThumbnail = this.editThumbnail.bind(this);
    }

    componentDidMount(){
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        const ratio = this.props.video.videoHeight/this.props.video.videoWidth;
        const height =  this.width * ratio;

        this.refs.canvas.width = this.width;
        this.refs.canvas.height = height;
        ctx.drawImage( this.props.video, 0, 0, this.width,  height);
    }

    jumpEvent(){
        this.props.jumpClick(this.props.id);
    }

    removeThumbnail(){
        this.props.remove(this.props.id);
    }

    editThumbnail(){
        this.props.edit(this.props.id, this.props.clip);
    }

    formatTime(time){
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor( (time%3600) / 60);
        const seconds = Math.floor(time % 60);
        const format = `${minutes}:${seconds}`
        return hours > 0 ? `${hours}:${format}` : format;
    }

    tagContainer(tagList){
        return tagList.split(',').filter(t => t !== '').map( (tag, i) => (
            <div key={tag+i} className={styles.clipTag}>{tag.trim()}</div>
        ));
    }

    render (){
        return (
            <div className={`${styles.thumbnail} ${ this.props.isPlaying ? styles.playing : '' }`}>

                <div className={styles.thumbnailTitle}>
                    <abbr title={this.props.clip.name}>{this.props.clip.name}</abbr>
                </div>
                <div className={styles.tagContainer}>
                    {this.tagContainer(this.props.clip.tags)}
                </div>
                {this.props.id > 0 && this.props.endableEditing &&
                    <div className={styles.thumbnailControls}>
                        <div className={`${styles.rmThumbnail} ${styles.thumbnailIcon}`}
                            onClick={this.removeThumbnail}>
                            ×
                        </div>
                        <div className={`${styles.editThumbnail} ${styles.thumbnailIcon}`}
                            onClick={this.editThumbnail}>
                            ✎
                        </div>
                    </div>
                }
                <div className={styles.label}>
                    {
                       `${this.formatTime(this.props.clip.start)} /
                        ${this.formatTime(this.props.clip.end)}`
                    }
                </div>
                <canvas className={styles.canvas} ref="canvas" onClick={this.jumpEvent}/>
            </div>
        );
    }
}

CanvasThumbnail.propTypes = {
    video: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    clip: PropTypes.shape({
        name: PropTypes.string.isRequired,
        start: PropTypes.number.isRequired,
        end: PropTypes.number.isRequired
    }).isRequired,
    jumpClick: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    endableEditing: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    endableEditing: state.endableEditing
});

export default connect(
    mapStateToProps
)(CanvasThumbnail);