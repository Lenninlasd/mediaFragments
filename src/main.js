import React from 'react';
import ReactDOM from 'react-dom';


const VideoPlayer = props => {
    const t = `#t=${props.start},${props.end}`;
    const videoPath = `${props.src}${t}`;
    return (
        <video 
            ref={props.videoref} 
            controls 
            src={ videoPath }
            width={props.width} 
            onLoadedData={props.onLoadedData}
        />
    );
};

class CanvasThumbnail extends React.Component {

    constructor (props){
        super(props);
        this.resize = 0.25;
        this.jumpEvent = this.jumpEvent.bind(this);
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

    render (){
        return <canvas ref="canvas" onClick={this.jumpEvent}/>;
    }
}

const ThumbnailList = props => {
    const thumbnails = props.listClips.map( (clip, index) => (
        <CanvasThumbnail
            key={index.toString()}
            id={index}
            video={props.video}
            clip={clip}
            jumpClick={props.jumpClick} 
        />
    ));

    return  <div>{ thumbnails }</div>;
};

class App extends React.Component {
    constructor (props){
        super(props);
        this.shoot = this.shoot.bind(this);
        this.jumpClick = this.jumpClick.bind(this);
        this.state = { listClips: [] };
        this.videoref = React.createRef();
    }

    shoot(){
        if(!this.video){
            this.video = this.videoref.current;
        }

        this.setState( state => ({
            listClips: [
                ...state.listClips,
                ...[{start: this.video.currentTime}]
            ]
        }));
    }

    jumpClick(ThumbnailId){
        const clips = this.state.listClips;
        this.video.currentTime = clips[ThumbnailId].start;
    }

    render (){
        return (
            <div>
                <VideoPlayer 
                    videoref={this.videoref}
                    src='../sintel_trailer-480p.mp4' 
                    onLoadedData={this.shoot}
                    width='400px'
                />
                <div>
                    <button onClick={this.shoot}>Capture</button>
                </div>
                <ThumbnailList
                    video={this.video}
                    listClips={this.state.listClips}
                    jumpClick={this.jumpClick} 
                />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
