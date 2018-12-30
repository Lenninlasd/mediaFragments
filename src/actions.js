export const addClip = data => ({
    type: 'ADD_CLIP',
    data
});

export const updateClip = (id, data) => ({
    type: 'UPDATE_CLIP',
    id,
    data
});

export const removeClip = id => ({
    type: 'REMOVE_CLIP',
    id
});

export const setCurrentClip = clip => ({
    type: 'SET_CURRENT_CLIP',
    clip
});

export const setReproClip = clipId => ({
    type: 'SET_REPRODUCING_CLIP',
    clipId
});

export const stopClip = () => ({
    type: 'STOP_CLIP'
});

export const setWaitClip = () => ({
    type: 'SET_WAITING'
});

export const noWaitClip = () => ({
    type: 'NO_WAITING'
});

export const removeUpdateId = () => ({
    type: 'REMOVE_UPDATE_ID'
});

export const setUpdateId = updateId => ({
    type: 'SET_UPDATE_ID',
    updateId
});

export const setSrcVideo = videoSrc => ({
    type: 'SET_SRC',
    videoSrc
})