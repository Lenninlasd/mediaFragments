import React from 'react';
import { connect } from 'react-redux';


import VideoPlayer from './videoPlayer.js';
import Thumbnails from './thumbnails.js';
import AddClip from './clipForm.js';
import styles from './styles.css';

class VideoApp extends React.Component {
    constructor (props){
        super(props);
        this.shoot = this.shoot.bind(this);
        this.jumpClick = this.jumpClick.bind(this);
        this.onLoadedData = this.onLoadedData.bind(this);
        this.onCanPlay = this.onCanPlay.bind(this);
        this.removeThumnail = this.removeThumnail.bind(this);
        this.editThumnail = this.editThumnail.bind(this);
        this.videoref = React.createRef();
        this.shooting = false;
        this.updateId = null;
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
        const {start, end} = this.props.clips[ThumbnailId];
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

    render (){
        return (
            <div className={styles.container}>
                <Thumbnails
                    video={this.video}
                    clips={this.props.clips}
                    jumpClick={this.jumpClick}
                    remove={this.removeThumnail}
                    edit={this.editThumnail}
                />
                <div>
                    <VideoPlayer
                        videoref={this.videoref}
                        src={this.props.videoSrc}
                        onLoadedData={this.onLoadedData}
                        onCanPlay={this.onCanPlay}
                        width='800px'
                    />
                    <AddClip onShoot={this.shoot}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    videoSrc: state.videoSrc,
    clips: state.clips,
    currentClip: state.currentClip
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
    })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoApp);