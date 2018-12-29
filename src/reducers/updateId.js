export const updateId = (updateId=null, action) => {
    switch (action.type) {
        case 'SET_UPDATE_ID':
            return action.updateId;
        case 'REMOVE_UPDATE_ID':
            return null;
        default:
            return updateId;
    }
};