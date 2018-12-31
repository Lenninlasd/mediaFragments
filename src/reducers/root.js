import { clips, currentClip } from './clips.js';
import { videoSrc } from './videoPlayer.js';
import { reproStatus } from './reproducingStatus.js';
import { updateId } from './updateId.js';
import { endableEditing } from './endableEditing.js';

export default ( state={}, action) => ({
        endableEditing: endableEditing(state.endableEditing, action),
        updateId:    updateId(state.updateId, action),
        reproStatus: reproStatus(state.reproStatus, action),
        videoSrc:    videoSrc(state.videoSrc, action),
        clips:       clips(state.clips, action),
        currentClip: currentClip(state.currentClip, action)
});