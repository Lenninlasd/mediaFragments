export const clips = (clips, action) => {
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
};

export const currentClip = (currentClip, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CLIP':
            return Object.assign(
                {}, currentClip, action.clip
            );
        default:
            return currentClip;
    }
};