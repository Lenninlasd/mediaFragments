import React, { Component } from 'react';
import styles from '../styles/thumbnails.css';
import PropTypes from 'prop-types';

class CanvasThumbnail extends Component {

    constructor (props){
        super(props);
        this.resize = 0.15;
        this.jumpEvent = this.jumpEvent.bind(this);
        this.removeThumbnail = this.removeThumbnail.bind(this);
        this.editThumbnail = this.editThumbnail.bind(this);
    }

    componentDidMount(){
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        const {clientWidth, clientHeight} = this.props.video;
        const w = clientWidth*this.resize;
        const h = clientHeight*this.resize;
        this.refs.canvas.width = w;
        this.refs.canvas.height = h;
        ctx.drawImage( this.props.video, 0, 0, w, h );
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

    render (){
        return (
            <div className={`${styles.thumbnail} ${ this.props.isPlaying ? styles.playing : '' }`}>
                {this.props.id > 0 &&
                    <div className={styles.thumbnailControls}>
                        <div className={`${styles.editThumbnail} ${styles.thumbnailIcon}`}
                            onClick={this.editThumbnail}>
                            ✎
                        </div>
                        <div className={`${styles.rmThumbnail} ${styles.thumbnailIcon}`}
                            onClick={this.removeThumbnail}>
                            ×
                        </div>
                    </div>
                }
                <div className={styles.label}>
                    {Math.floor(this.props.clip.start)}
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
    isPlaying: PropTypes.bool.isRequired
}

export default CanvasThumbnail;