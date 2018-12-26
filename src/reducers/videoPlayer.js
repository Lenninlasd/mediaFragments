export const videoSrc = (videoSrc, action) => {
    switch (action.type) {
        case 'SET_SRC':
            return action.src;
        default:
            return videoSrc;
    }
};