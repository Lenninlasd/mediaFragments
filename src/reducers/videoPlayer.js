export const videoSrc = (videoSrc, action) => {
    switch (action.type) {
        case 'SET_SRC':
            return action.videoSrc;
        default:
            return videoSrc;
    }
};