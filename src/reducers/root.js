const videoSrc = (videoSrc, action) => {
    switch (action.type) {
        case 'SET_SRC':
            return action.src;
        default:
            return videoSrc;
    }
};

const clips = (clips, action) => {
    switch (action.type) {
        case 'ADD_CLIP':
            return [
                ...clips,
                action.data
            ];
        case 'UPDATE_CLIP':
            return clips.map( (clip, i) => {
                if(i === action.id){
                    return Object.assign({}, clip, action.data);
                }
                return clip;
            })
        case 'REMOVE_CLIP':
            return [
                ...clips.slice(0, action.id),
                ...clips.slice(action.id + 1)
            ];
        default:
            return clips;
    }
}

const currentClip = (currentClip, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CLIP':
            return Object.assign(
                {}, currentClip, action.clip
            );
        default:
            return currentClip;
    }
}

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