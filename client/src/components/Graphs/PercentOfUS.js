import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './PercentOfUs.css';

const PercentOfUS = () => {
    const ref = useRef();

    //avoid overcrowding of data
    function shouldDisplayLabel(index, total, step = 2) {
        return index % step === 0;
    }

    useEffect(() => {
        const data = [
            { date: "1/15/2012", value: 39 },
            { date: "4/3/2012", value: 46 },
            { date: "9/23/2012", value: 43 },
            { date: "12/16/2012", value: 49 },
            { date: "1/6/2013", value: 51 },
            { date: "5/19/2013", value: 56 },
            { date: "7/14/2013", value: 53 },
            { date: "2/18/2014", value: 55 },
            { date: "4/27/2014", value: 56 },
            { date: "9/21/2014", value: 57 },
            { date: "12/21/2014", value: 59 },
            { date: "4/12/2015", value: 67 },
            { date: "7/12/2015", value: 68 },
            { date: "11/15/2015", value: 69 },
            { date: "4/4/2016", value: 72 },
            { date: "5/3/2016", value: 70 },
            { date: "11/6/2016", value: 77 },
            { date: "1/10/2018", value: 77 },
            { date: "2/7/2019", value: 81 },
            { date: "2/8/2021", value: 85 },
            { date: "9/5/2023", value: 90 }
        ];

        const parseDate = d3.timeParse("%m/%d/%Y");
        data.forEach(d => d.date = parseDate(d.date));

        const svgElement = d3.select(ref.current);
        svgElement.selectAll("*").remove();

        const margin = { top: 20, right: -10, bottom: 30, left: 70 },
              width = 700 - margin.left - margin.right,
              height = 350 - margin.top - margin.bottom;

        const svg = svgElement
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime()
                    .domain(d3.extent(data, d => d.date))
                    .range([0, width]);
        const y = d3.scaleLinear()
                    .domain([30, 100])  // Adjust to match the actual data range for better comparison
                    .range([height, 0]);

        const line = d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.value))
                    .curve(d3.curveCatmullRom.alpha(0.5)); // Apply the same smoothing

        // Draw the line
        svg.append("path")
           .data([data])
           .attr("class", "line")
           .attr("d", line)
           .attr("fill", "none")
           .attr("stroke", "white")
           .attr("stroke-width", 3);
           

        // Vertical gridlines
        svg.selectAll(".grid")
            .data(data)
            .enter().append("line")
            .attr("class", "grid")
            .attr("x1", d => x(d.date))
            .attr("x2", d => x(d.date))
            .attr("y1", height)
            .attr("y2", 0)
            .attr("stroke", "lightgray")
            .attr("stroke-dasharray", "2,2");

        // Add Axes
        svg.append("g")
           .attr("transform", `translate(0,${height})`)
           .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")));

        // Add Dots
        svg.selectAll(".dot")
           .data(data)
           .enter().append("circle")
           .attr("class", "dot")
           .attr("cx", d => x(d.date))
           .attr("cy", d => y(d.value))
           .attr("r", 3)
           .attr("fill", "#black");

        // Text shadow for better legibility
        /*svg.selectAll(".text-shadow")
            .data(data)
            .enter().append("text")
            .attr("x", d => x(d.date))
            .attr("y", d => y(d.value) + 20)
            .attr("text-anchor", "middle")
            .attr("stroke", "white")
            .attr("stroke-width", "1px")
            .attr("opacity", d => shouldDisplayLabel(data.indexOf(d), data.length) ? 0.8 : 0)  // Control opacity based on condition
            .text(d => `${d.value}%`);*/

        // Actual text on top of the shadow for clarity
        svg.selectAll(".text")
            .data(data)
            .enter().append("text")
            .attr("x", d => x(d.date))
            .attr("y", d => y(d.value) + 22)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("opacity", d => shouldDisplayLabel(data.indexOf(d), data.length) ? 1 : 0)  // Control opacity based on condition
            .text(d => `${d.value}%`);


        svg.selectAll(".dot")
           .on("mouseover", function(event, d) {
               d3.select("#tooltip")
                 .style("opacity", 1)
                 .html(`${d.date.toDateString()}<br>${d.value}%`)
                 .style("left", `${event.pageX + 10}px`)
                 .style("top", `${event.pageY - 10}px`)
                 .style("text-align", "center")  // Horizontally center text
                 .style("display", "flex")
                 .style("flex-direction", "column")
                 .style("justify-content", "center")  // Vertically center content
                 .style("align-items", "center")  // Horizontally center content
                 .style("width", "120px")  // Explicit width
                 .style("height", "40px"); // Explicit height
           })
           .on("mouseout", function() {
               d3.select("#tooltip").style("opacity", 0);
           });
    }, []);

    return (
        <>
            <svg className='percent-of-us-graph' ref={ref} />
        </>
    );
};

export default PercentOfUS;