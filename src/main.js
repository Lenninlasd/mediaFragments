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
    }

    componentDidMount(){
        const canvas = this.refs.canvas;
        this.ctx = canvas.getContext('2d');
    }
   
    componentDidUpdate(){
        const {clientWidth, clientHeight} = this.props.video;
        this.refs.canvas.width = clientWidth;
        this.refs.canvas.height = clientHeight;
        
        this.ctx.drawImage(
            this.props.video, 0, 0, clientWidth*this.resize, clientHeight*this.resize
        );
    }

    render (){
        return <canvas ref="canvas" onClick={this.props.jumpClick}/>;
    }
}

class App extends React.Component {
    constructor (props){
        super(props);
        this.shoot = this.shoot.bind(this);
        this.jumpClick = this.jumpClick.bind(this);
        this.state = {};
        this.videoref = React.createRef();
    }

    shoot(){
        const video = this.videoref.current;
    
        this.setState({
            video,
            start: video.currentTime
        });
    }


    jumpClick(){
        this.videoref.current.currentTime = this.state.start;
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
                <CanvasThumbnail 
                    video={this.state.video} 
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
