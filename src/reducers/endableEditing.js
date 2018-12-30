export const endableEditing = (endableEditing=true, action) => {
    switch (action.type) {
        case 'DISABLE_EDIT':
            return false;
        default:
            return endableEditing;
    }
};