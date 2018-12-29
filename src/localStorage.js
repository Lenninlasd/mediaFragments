export const loadClipState = () => {
    try {
        const serializedData = localStorage.getItem('clipState');
        return JSON.parse(serializedData) || [];
    }
    catch (error) {
        return [];
    }
}

export const saveClipsState = state => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('clipState', serializedState);
    } catch (error) {
    
    }
}