import React from 'react';

import NumberOfSmartphone from '../Graphs/NumberOfSmartphone';
import PercentOfUS from '../Graphs/PercentOfUS';

const History = (()=>{
    return(
        <>
            <div className='history-label'>The way humans have lived their day-to-day lives has changed drastically since the invention of the smartphone, most notably, changing the ways we interact each other and information.</div>
            <div className='numberOfSmartphone'>
                <NumberOfSmartphone />
            </div>
            <div className='total-smartphone-text'>Today there are 312 Million Smartphones in the US</div>

            <div className='percentOfUS'>
                <PercentOfUS/>
            </div>
            <div className='percent-change-text'>The number of smartphones in the US has increased right 400% since 2014</div>
            {/*<div className='invented'>The Smartphone was invented in 2007</div>*/}



        </>
        
    );
});

export default History;