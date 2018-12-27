import { clips, currentClip } from './clips.js';
import { videoSrc } from './videoPlayer.js';
import { reproStatus } from './reproducingStatus.js';

const initialState = {
    videoSrc: '../sintel_trailer-480p.mp4',
    clips: [],
    currentClip: {name:'', start: 0, end: 0},
    reproStatus: { reproducing: false,  clipId: 0, isWaiting: false}
}

export default ( state=initialState, action) => {
    const newState = {
        reproStatus: reproStatus(state.reproStatus, action),
        videoSrc: videoSrc(state.videoSrc, action),
        clips: clips(state.clips, action),
        currentClip: currentClip(state.currentClip, action)
    }
    return newState;
};