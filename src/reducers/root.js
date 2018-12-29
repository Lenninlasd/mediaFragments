import { clips, currentClip } from './clips.js';
import { videoSrc } from './videoPlayer.js';
import { reproStatus } from './reproducingStatus.js';

export default ( state={}, action) => {
    const newState = {
        reproStatus: reproStatus(state.reproStatus, action),
        videoSrc: videoSrc(state.videoSrc, action),
        clips: clips(state.clips, action),
        currentClip: currentClip(state.currentClip, action)
    }
    return newState;
};