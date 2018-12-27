import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VideoPlayer from './videoPlayer.js';
import Thumbnails from './thumbnails.js';
import AddClip from './clipForm.js';
import ProgressBar from './progressBar.js'
import LinkVideo from './linkVideo.js';
import styles from '../styles/app.css';

class VideoApp extends React.Component {
    constructor (props){
        super(props);
        this.shoot = this.shoot.bind(this);
        this.jumpClick = this.jumpClick.bind(this);
        this.onLoadedData = this.onLoadedData.bind(this);
        this.onCanPlay = this.onCanPlay.bind(this);
        this.removeThumnail = this.removeThumnail.bind(this);
        this.editThumnail = this.editThumnail.bind(this);
        this.keyControls = this.keyControls.bind(this);
        this.onPauseClip = this.onPauseClip.bind(this);
        this.videoref = React.createRef();
        this.shooting = false;
        this.updateId = null;
        this.timeOut = null;
    }
    
    onLoadedData(){
        if(!this.props.clips.length){
            this.video = this.videoref.current;

            this.props.setCurrentClip({
                start: this.video.currentTime,
                end: this.video.duration,
                name: 'FullVideo'
            })
            this.shoot();
        }
    }

    jumpClick(ThumbnailId){
        clearTimeout(this.timeOut);
        const {start, end} = this.props.clips[ThumbnailId];
        this.props.setReproClip(ThumbnailId);
        this.video.setAttribute('src', `${this.props.videoSrc}#t=${start},${end}`)
        this.video.load();
        this.video.play();
    }

    shoot(){
        this.shooting = true;
        if(this.props.clips.length){
            this.video.currentTime = this.props.currentClip.start;
        }
    }

    onCanPlay(){
        if(!this.shooting){
            return;
        }
        if(this.updateId){
            this.props.updateClip(this.updateId, this.props.currentClip);
            this.updateId = null;
        }
        else{
            this.props.addClip(this.props.currentClip);
        }
        this.shooting = false;
    }

    removeThumnail(id){
        this.props.removeClip(id);
    }

    editThumnail(id, data){
        this.props.setCurrentClip(data);
        this.updateId = id;
    }

    keyControls(event){
        if(!this.props.reproStatus.reproducing){
            return;
        }
        const key = event.keyCode;
        const clipId = this.props.reproStatus.clipId;
        const maxId = this.props.clips.length - 1;

        if( (key === 37 || key === 38) && clipId > 0){
            this.jumpClick(clipId - 1);
        }
        else if( (key === 39 || key === 40) && clipId < maxId){
            this.jumpClick(clipId + 1);
        }
    }

    onPauseClip(){
        const status = this.props.reproStatus;
        const maxId = this.props.clips.length - 1;
        const endCurrentclip = this.props.clips[status.clipId].end;

        if(!status.reproducing || endCurrentclip > this.video.currentTime){
            return;
        }
        if(status.clipId < maxId){
            this.props.toggleWaitClip();
            this.timeOut = setTimeout( () => {
                this.jumpClick(status.clipId + 1);
                this.props.toggleWaitClip();
            }, 3000);
        }else {
            this.props.stopClip();
        }
    }

    render (){
        return (
            <div className={styles.appContainer}
                tabIndex='0'
                onKeyDown={this.keyControls} >
                <LinkVideo />
                <div className={styles.container}>
                    <Thumbnails
                        video={this.video}
                        clips={this.props.clips}
                        jumpClick={this.jumpClick}
                        remove={this.removeThumnail}
                        edit={this.editThumnail}
                    />
                    <div className={styles.videoContainer}>
                        <ProgressBar isWaiting={this.props.reproStatus.isWaiting} />
                        <VideoPlayer
                            videoref={this.videoref}
                            src={this.props.videoSrc}
                            onLoadedData={this.onLoadedData}
                            onCanPlay={this.onCanPlay}
                            width='800px'
                            onPause={this.onPauseClip}
                        />
                        <AddClip onShoot={this.shoot}/>
                    </div>
                </div>
            </div>
        );
    }
}

VideoApp.propTypes = {
    videoSrc: PropTypes.string.isRequired,
    addClip: PropTypes.func.isRequired,
    updateClip: PropTypes.func.isRequired,
    removeClip: PropTypes.func.isRequired,
    setCurrentClip: PropTypes.func.isRequired,
    clips: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            start: PropTypes.number.isRequired,
            end: PropTypes.number.isRequired
        })
    ).isRequired,
    reproStatus: PropTypes.shape({
        clipId: PropTypes.number.isRequired,
        reproducing: PropTypes.bool.isRequired,
        isWaiting: PropTypes.bool.isRequired
    }).isRequired,
    setCurrentClip: PropTypes.func.isRequired,
    stopClip: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    videoSrc: state.videoSrc,
    clips: state.clips,
    currentClip: state.currentClip,
    reproStatus: state.reproStatus
});

const mapDispatchToProps = dispatch => ({
    addClip: data => dispatch({
        type: 'ADD_CLIP',
        data
    }),
    updateClip: (id, data) => dispatch({
        type: 'UPDATE_CLIP',
        id,
        data
    }),
    removeClip: id => dispatch({
        type: 'REMOVE_CLIP',
        id
    }),
    setCurrentClip: clip => dispatch({
        type: 'SET_CURRENT_CLIP',
        clip
    }),
    setReproClip: clipId => dispatch({
        type: 'SET_REPRODUCING_CLIP',
        clipId
    }),
    stopClip: () => dispatch({
        type: 'STOP_CLIP'
    }),
    toggleWaitClip: () => dispatch({
        type: 'TOGGLE_WAIT'
    })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoApp);