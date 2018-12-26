import { clips, currentClip } from './clips.js';
import {videoSrc } from './videoPlayer.js';

const initialState = {
    videoSrc: '../sintel_trailer-480p.mp4',
    clips: [],
    currentClip: {name:'', start: 0, end: 0}
}

export default ( state=initialState, action) => {
    const newState = {
        videoSrc: videoSrc(state.videoSrc, action),
        clips: clips(state.clips, action),
        currentClip: currentClip(state.currentClip, action)
    }
    return newState;
};