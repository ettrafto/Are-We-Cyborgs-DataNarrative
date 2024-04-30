import React, { useState } from 'react';
import * as d3 from 'd3';
import { useD3 } from '../hooks/d3-hook';

const SBC = ({ data }) => {
    const [tooltip, setTooltip] = useState({
        visibility: 'hidden',
        data: null,
        x: 0,
        y: 0
    });
    const ref = useD3((svg) => {
        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const width = 700 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const series = d3.stack().keys(['Smartphones', 'DesktopLaptop', 'Other'])(data);
        const x = d3.scaleBand()
            .domain(data.map(d => d.year))
            .padding(0.1);

        // Initially set the range to calculate the bandwidth
        const tempRange = [margin.left, width - margin.right];
        x.range(tempRange);
        // Adjust the range to reduce the space at the end
        x.range([margin.left, width - margin.right - x.bandwidth() / 2]);

        const maxVal = d3.max(series, d => d3.max(d, d => d[1]));
        const y = d3.scaleLinear()
            .domain([0, maxVal]).nice()
            .range([height - margin.bottom, margin.top]);

        const tickValues = d3.range(0, Math.ceil(maxVal) + 1, 1);

        const yAxis = d3.axisLeft(y)
            .tickValues(tickValues.filter(tick => Number.isInteger(tick)))
            .tickFormat(d3.format("d"))
            .tickSizeInner(-width); // Draw grid lines across the entire width

        // Append Y Axis with Grid Lines
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(yAxis)
            .lower(); // Ensure the grid lines are behind the bars

        const color = d3.scaleOrdinal()
            .domain(['Smartphones', 'DesktopLaptop', 'Other'])
            .range(['#6f42c1', '#007bff', '#ffc107']);

        svg.selectAll(".layer")
            .data(series)
            .join("g")
            .attr("class", "layer")
            .attr("fill", d => color(d.key))
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("x", d => x(d.data.year))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .on("mouseover", (event, d) => {
                setTooltip({
                    visibility: 'visible',
                    data: d.data,
                    x: event.pageX + 10,
                    y: event.pageY + 10
                });
            })
            .on("mouseout", () => {
                setTooltip({ visibility: 'hidden', data: null, x: 0, y: 0 });
            });

        // Append X Axis
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));
    }, [data]);

    return (
        <div className='stackedChart'>
            <svg ref={ref} width={700} height={500} />
            <div className="tooltip" style={{
                visibility: tooltip.visibility,
                position: 'absolute',
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`,
                backgroundColor: 'white',
                padding: '10px',
                border: '1px solid black'
            }}>
                {tooltip.data && (
                    <div>
                        <div>Year: {tooltip.data.year}</div>
                        <div>Smartphone: {tooltip.data.Smartphones?.toFixed(1)} Hours</div>
                        <div>Laptops & Desktops: {tooltip.data.DesktopLaptop?.toFixed(1)} Hours</div>
                        <div>Other: {tooltip.data.Other?.toFixed(1)} Hours</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SBC;