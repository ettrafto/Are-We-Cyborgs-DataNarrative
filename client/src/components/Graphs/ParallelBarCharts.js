import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import './BarChart.css'; // Make sure to import the CSS styles

const BarChart = ({ label, data, category, color, maxVal, className }) => {
    const ref = useRef();
    const [tooltip, setTooltip] = useState({ visibility: 'hidden', data: null, x: 0, y: 0 });

    useEffect(() => {
        const margin = { top: 50, right: 30, bottom: 40, left: 50 },
            width = 250 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
    
        d3.select(ref.current).selectAll("svg").remove();
    
        const svg = d3.select(ref.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
    
        const x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(d => d.year))
            .padding(0.1);
    
        // Calculate indices for first, middle, and last ticks
        const dataLength = data.length;
        const middleIndex = Math.floor(dataLength / 2);
        const tickValues = dataLength > 1 ? [data[0].year, data[middleIndex].year, data[dataLength - 1].year] : [data[0].year];
    
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x)
                .tickValues(tickValues) // Set only specific ticks to display
                .tickSizeOuter(0));
    
        const y = d3.scaleLinear()
            .domain([0, maxVal])
            .range([height, 0]);
    
        svg.append("g")
            .call(d3.axisLeft(y));
    
        svg.selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.year))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d[category]))
            .attr("height", d => height - y(d[category]))
            .attr("fill", color)
            .on("mouseover", (event, d) => {
                setTooltip({
                    visibility: 'visible',
                    data: d,
                    x: event.pageX,
                    y: event.pageY
                });
            })
            .on("mouseout", () => {
                setTooltip({ visibility: 'hidden', data: null, x: 0, y: 0 });
            });
    }, [data, maxVal]);

    return (
        <>
            <div className='chart-cell'>
                <div className='graph-label'>{label}</div>
                <div className={className} ref={ref}>
                    {tooltip.visibility === 'visible' && (
                        <div className="tooltip" style={{ position: 'absolute', left: `${tooltip.x}px`, top: `${tooltip.y}px`, backgroundColor: 'white', padding: '10px', border: '1px solid black', visibility: tooltip.visibility }}>
                            <div>Year: {tooltip.data.year}</div>
                            <div>{category}: {tooltip.data[category]} Hours</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};



const ParallelBarCharts = ({ data }) => {
    // Calculate the maximum value across all categories
    const maxValue = Math.max(
        ...data.map(d => Math.max(d.Smartphones, d.DesktopLaptop, d.Other))
    );

    return (
        <div className='parallelChart-container' style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
            <BarChart label={'SmartPhones'} className={'smartphone-chart'} data={data} category="Smartphones" color="#6f42c1" maxVal={maxValue} />
            <BarChart label={'Desktops'} className={'desktop-chart'} data={data} category="DesktopLaptop" color="#7D7D7D" maxVal={maxValue} />
            <BarChart label={'Other'} className={'other-chart'} data={data} category="Other" color="#9E9E9E" maxVal={maxValue} />
        </div>
    );
};

export default ParallelBarCharts;
