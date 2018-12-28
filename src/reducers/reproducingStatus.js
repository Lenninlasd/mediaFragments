export const reproStatus = (reproStatus, action) => {
    switch (action.type) {
        case 'SET_REPRODUCING_CLIP':
            return Object.assign({}, reproStatus, {
                clipId: action.clipId,
                reproducing: true
            });
        case 'STOP_CLIP':
            return Object.assign({}, reproStatus, {
                reproducing: false
            });
        case 'SET_WAITING':
            return Object.assign({}, reproStatus, {
                isWaiting: true
            });
        case 'NO_WAITING':
            return Object.assign({}, reproStatus, {
                isWaiting: false
            })
        default:
            return reproStatus;
    }
};