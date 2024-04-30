import React, { useState } from 'react';

import StackedBarChart from './StackedBarChart';
import ParallelBarCharts from './ParallelBarCharts'
import SBC from './sbc.js';


const TotalTimeOnInternet = () => {

    const data = [
        { year: "2008", Smartphones: 0.3, DesktopLaptop: 2.2, Other: 0.2 },
        { year: "2009", Smartphones: 0.3, DesktopLaptop: 2.3, Other: 0.3 },
        { year: "2010", Smartphones: 0.4, DesktopLaptop: 2.4, Other: 0.4 },
        { year: "2011", Smartphones: 0.8, DesktopLaptop: 2.6, Other: 0.3 },
        { year: "2012", Smartphones: 1.6, DesktopLaptop: 2.5, Other: 0.3 },
        { year: "2013", Smartphones: 2.3, DesktopLaptop: 2.3, Other: 0.3 },
        { year: "2014", Smartphones: 2.6, DesktopLaptop: 2.2, Other: 0.3 },
        { year: "2015", Smartphones: 2.8, DesktopLaptop: 2.2, Other: 0.4 },
        { year: "2016", Smartphones: 3.1, DesktopLaptop: 2.2, Other: 0.4 },
        { year: "2017", Smartphones: 3.3, DesktopLaptop: 2.1, Other: 0.6 },
        { year: "2018", Smartphones: 3.6, DesktopLaptop: 2.0, Other: 0.7 }
    ];


    return (
        <div className='TotalTimeOnInternet-container'>
            <StackedBarChart data={data} />
            <ParallelBarCharts data={data} />
            {/*<SBC data={data}/>*/}

        </div>
    );
};

export default TotalTimeOnInternet;
