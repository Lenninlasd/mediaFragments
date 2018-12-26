import React from 'react';
import styles from './thumbnails.css';

class CanvasThumbnail extends React.Component {

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
            <div className={styles.thumbnail}>
                <div className={styles.rmThumbnail} onClick={this.removeThumbnail}> × </div>
                <div className={styles.editThumbnail} onClick={this.editThumbnail}> ✏️ </div>
                <div className={styles.label}>
                    {Math.floor(this.props.clip.start)}
                </div>
                <canvas className={styles.canvas} ref="canvas" onClick={this.jumpEvent}/>
            </div>
        );
    }
}

export default props => {
    const thumbnails = props.clips.map( (clip, index) => (
        <CanvasThumbnail
            key={clip.name+clip.start+clip.end}
            id={index}
            video={props.video}
            clip={clip}
            jumpClick={props.jumpClick}
            remove={props.remove}
            edit={props.edit}
        />
    ));

    return  <div className={styles.thumbnails}>{ thumbnails }</div>;
};