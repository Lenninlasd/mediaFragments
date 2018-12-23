import React from 'react';

export default props => {
    const t = `#t=${props.start},${props.end}`;
    const videoPath = `${props.src}${t}`;
    return (
        <video 
            ref={props.videoref} 
            controls 
            src={ videoPath }
            width={props.width} 
            onLoadedData={props.onLoadedData}
        />
    );
};