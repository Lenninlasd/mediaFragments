import React from 'react';
import { connect } from 'react-redux';


import VideoPlayer from './videoPlayer.js';
import Thumbnails from './thumbnails.js';
import styles from './styles.css';

class VideoApp extends React.Component {
    constructor (props){
        super(props);
        this.shoot = this.shoot.bind(this);
        this.jumpClick = this.jumpClick.bind(this);
        this.onLoadedData = this.onLoadedData.bind(this);
        this.videoref = React.createRef();
    }
    
    onLoadedData(){
        if(!this.props.clips.length){
            this.shoot();
        }
    }

    shoot(){
        if(!this.video){
            this.video = this.videoref.current;
        }
        this.props.addClip(this.video.currentTime);
    }

    jumpClick(ThumbnailId){
        const start = this.props.clips[ThumbnailId].start;
        this.video.setAttribute('src', `${this.props.videoSrc}#t=${start},${start+10}`)
        this.video.load();
        this.video.play();
    }

    render (){
        return (
            <div className={styles.container}>
                <Thumbnails
                    video={this.video}
                    clips={this.props.clips}
                    jumpClick={this.jumpClick} 
                />
                <div>
                    <VideoPlayer
                        videoref={this.videoref}
                        src={this.props.videoSrc}
                        onLoadedData={this.onLoadedData}
                        width='800px'
                        start='10'
                        end='50'
                    />
                    <div>
                        <button onClick={this.shoot}>Capture</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    videoSrc: state.videoSrc,
    clips: state.clips
});

const mapDispatchToProps = dispatch => ({
    addClip: start => dispatch({
        type: 'ADD_CLIP',
        start
    })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoApp);