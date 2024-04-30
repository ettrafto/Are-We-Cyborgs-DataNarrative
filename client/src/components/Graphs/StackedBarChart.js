import React, { useState } from 'react';
import * as d3 from 'd3';
import { useD3 } from '../hooks/d3-hook';

import './StackedBarChart.css'

const StackedBarChart = ({ data }) => {
    const [tooltip, setTooltip] = useState({
        visibility: 'hidden',
        data: null,
        x: 0,
        y: 0
    });

    const ref = useD3((svg) => {
        // Increased top margin to provide more space
        const margin = { top: 50, right: 10, bottom: 10, left: 50 };
        const width = 700 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
        

        svg.selectAll('*').remove(); // Remove all child elements

        const x = d3.scaleBand()
            .domain(data.map(d => d.year))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        // Calculate max value and increase it by 10% for padding
        const maxVal = d3.max(data, d => Math.max(d.Smartphones, d.DesktopLaptop, d.Other)) * 1.6;
        const y = d3.scaleLinear()
            .domain([0, maxVal])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const tickValues = d3.range(0, Math.ceil(maxVal) + 1).filter(v => Number.isInteger(v));


        // Append or Update X Axis
        const xAxisGroup = svg.selectAll('.x-axis').data([null]); // Select x-axis group or bind empty data
        xAxisGroup.enter().append('g')
            .attr('class', 'x-axis')
            .merge(xAxisGroup)
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        // Append or Update Y Axis
        const yAxisGroup = svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y)
                .tickSize(-width+75)  // Extend ticks across the chart width
                .tickValues(tickValues)
                .tickFormat(d => Number.isInteger(d) ? d : ""));
        yAxisGroup.lower(); // Ensure the grid lines are behind the bars


        // Layers for bars
        const layer = svg.selectAll(".layer")
            .data(d3.stack().keys(['Smartphones', 'DesktopLaptop', 'Other'])(data))
            .enter().append("g")
                .attr("class", "layer")
                .attr("fill", d => {
                    switch (d.key) {
                        case 'Smartphones': return '#6f42c1';
                        case 'DesktopLaptop': return '#7D7D7D';
                        case 'Other': return '#9E9E9E';
                        default: return '#ccc';
                    }
                });

        layer.selectAll("rect")
            .data(d => d)
            .enter().append("rect")
                .attr("x", d => x(d.data.year))
                .attr("width", x.bandwidth())
                .attr("y", d => y(d[1]))
                .attr("height", d => y(d[0]) - y(d[1]))
                .on("mouseover", (event, d) => {
                    setTooltip({
                        visibility: 'visible',
                        data: d.data,
                        x: event.pageX,
                        y: event.pageY
                    });
                })
                .on("mouseout", () => {
                    setTooltip({ visibility: 'hidden', data: null, x: 0, y: 0 });
                });
        }, [data]);

    return (
        <div className='stackedChart'>
            <svg ref={ref} width={700} height={500} />
            {/*<div className="tooltip" style={tooltip.visibility === 'visible' ? {
                visibility: tooltip.visibility,
                position: 'absolute',
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`,
                backgroundColor: 'white',
                padding: '10px',
                border: '1px solid black'
            } : { display: 'none' }}>
                {tooltip.data && (
                    <div>
                        <div>Year: {tooltip.data.year}</div>
                        <div>Smartphone: {tooltip.data.Smartphones?.toFixed(1)} Hours</div>
                        <div>Laptops & Desktops: {tooltip.data.DesktopLaptop?.toFixed(1)} Hours</div>
                        <div>Other: {tooltip.data.Other?.toFixed(1)} Hours</div>
                    </div>
                )}
            </div>*/}
        </div>
    );
};

export default StackedBarChart;