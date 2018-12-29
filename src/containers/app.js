import React, { Component } from 'react'; 
import { connect } from 'react-redux';

import { loadClipState } from '../localStorage.js';
import LayautApp from '../components/app.js';

class VideoApp extends Component {
    constructor (props){
        super(props);
        this.shoot = this.shoot.bind(this);
        this.jumpClick = this.jumpClick.bind(this);
        this.onLoadedData = this.onLoadedData.bind(this);
        this.onCanPlay = this.onCanPlay.bind(this);
        this.keyControls = this.keyControls.bind(this);
        this.onPauseClip = this.onPauseClip.bind(this);
        this.videoref = React.createRef();
        this.shooting = false;
        this.timeOut = null;
        this.iniClips = loadClipState();
    }

    *setCips() {
        for (let clip of this.iniClips) {
            yield requestAnimationFrame(() => {
                this.props.setCurrentClip(clip);
                this.shoot();
                return clip.start;
            });
        }
    }

    onLoadedData(){
        if(this.props.clips.length || this.video){
            return;
        }

        this.video = this.videoref.current;
        if(this.iniClips.length){
            this.iniClips.gen = this.setCips();
            this.iniClips.state = this.iniClips.gen.next();
            return;
        }

        this.props.setCurrentClip({
            start: this.video.currentTime,
            end: this.video.duration,
            name: 'FullVideo'
        })
        this.shoot();
    }

    jumpClick(ThumbnailId){
        this.props.noWaitClip();
        clearTimeout(this.timeOut);
        const {start, end} = this.props.clips[ThumbnailId];
        this.props.setReproClip(ThumbnailId);
        this.video.setAttribute('src', `${this.props.videoSrc}#t=${start},${end}`)
        this.video.load();
        this.video.play();
    }

    shoot(){
        this.shooting = true;
        if(this.props.clips.length || this.iniClips.state){
            this.video.currentTime = this.props.currentClip.start;
        }
    }

    onCanPlay(){
        if(!this.shooting) return;

        if(this.props.updateId){
            this.props.updateClip(this.props.updateId, this.props.currentClip);
            this.props.removeUpdateId();
        }
        else{
            this.props.addClip(this.props.currentClip);
        }
        this.shooting = false;

        if(this.iniClips.state && !this.iniClips.state.done){
            this.iniClips.state = this.iniClips.gen.next();
        }
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
            this.props.setWaitClip();
            this.timeOut = setTimeout( () => {
                this.jumpClick(status.clipId + 1);
                this.props.noWaitClip();
            }, 3000);
        }else {
            this.props.stopClip();
        }
    }

    render (){
        return (
            <LayautApp
                keyControls={this.keyControls}
                video={this.video}
                clips={this.props.clips}
                jumpClick={this.jumpClick}
                reproStatus={this.props.reproStatus}
                videoref={this.videoref}
                videoSrc={this.props.videoSrc}
                onLoadedData={this.onLoadedData}
                onCanPlay={this.onCanPlay}
                onPauseClip={this.onPauseClip}
                shoot={this.shoot}
            />
        );
    }
}

const mapStateToProps = state => ({
    updateId: state.updateId,
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
    setWaitClip: () => dispatch({
        type: 'SET_WAITING'
    }),
    noWaitClip: () => dispatch({
        type: 'NO_WAITING'
    }),
    removeUpdateId: () => dispatch({
        type: 'REMOVE_UPDATE_ID'
    })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoApp);