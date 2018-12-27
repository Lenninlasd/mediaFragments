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
            })
        case 'TOGGLE_WAIT':
            return Object.assign({}, reproStatus, {
                isWaiting: !reproStatus.isWaiting
            })
        default:
            return reproStatus;
    }
};