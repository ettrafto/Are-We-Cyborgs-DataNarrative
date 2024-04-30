import React from 'react';
import TotalTimeOnInternet from '../Graphs/TotalTimeOnInternet';

const Change = (()=>{
    return(
        <>
            <div className='change-label'>This has changed the world in many positive ways, but most don't consider the negative effects</div>
            <div className='totalTimeOnInternet'>
                <TotalTimeOnInternet />
            </div>
        </>
    );
});

export default Change;