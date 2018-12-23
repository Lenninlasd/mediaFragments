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
                {
                    start: action.start
                }
            ];
        default:
            return clips;
    }
}

const initialState = {
    videoSrc: '../sintel_trailer-480p.mp4',
    clips: []
}

export default ( state=initialState, action) => ({
    videoSrc: videoSrc(state.videoSrc, action),
    clips: clips(state.clips, action)
});