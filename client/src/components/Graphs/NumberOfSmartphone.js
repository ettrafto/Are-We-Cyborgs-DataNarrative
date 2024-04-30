import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SmartphonesInUS = () => {
    const ref = useRef();

    useEffect(() => {
        const data = [
            { year: "2009", smartphones: 61.49 },
            { year: "2010", smartphones: 81.63 },
            { year: "2011", smartphones: 107.2 },
            { year: "2012", smartphones: 138.2 },
            { year: "2013", smartphones: 165.8 },
            { year: "2014", smartphones: 190.3 },
            { year: "2015", smartphones: 217.3 },
            { year: "2016", smartphones: 241.9 },
            { year: "2017", smartphones: 259.5 },
            { year: "2018", smartphones: 274.1 },
            { year: "2019", smartphones: 287.8 },
            { year: "2020", smartphones: 296.8 },
            { year: "2021", smartphones: 302 },
            { year: "2022", smartphones: 307 },
            { year: "2023", smartphones: 311.8 }
        ];

        const parseYear = d3.timeParse("%Y");
        data.forEach(d => d.year = parseYear(d.year));

        const svgElement = d3.select(ref.current);
        svgElement.selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 30, left: 30 },
            width = 700 - margin.left - margin.right,
            height = 350 - margin.top - margin.bottom;

        const svg = svgElement
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.year))
            .range([0, width])
            .nice();

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.smartphones)])
            .range([height, 0]);

        // Vertical gridlines
        svg.selectAll(".grid")
            .data(data)
            .enter().append("line")
            .attr("class", "grid")
            .attr("x1", d => x(d.year))
            .attr("x2", d => x(d.year))
            .attr("y1", height)
            .attr("y2", 0)
            .attr("stroke", "lightgray")
            .attr("stroke-dasharray", "2,2");

        const line = d3.line()
            .x(d => x(d.year))
            .y(d => y(d.smartphones))
            .curve(d3.curveCatmullRom.alpha(0.5));

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 2);

        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.year))
            .attr("cy", d => y(d.smartphones))
            .attr("r", 3)
            .attr("fill", "#000000");

        /*svg.selectAll(".text-shadow")
            .data(data)
            .enter().append("text")
            .attr("x", d => x(d.year))
            .attr("y", d => y(d.smartphones) + 20)
            .attr("text-anchor", "middle")
            .attr("stroke", "white")
            .attr("stroke-width", "1px")
            .attr("opacity", 0.8)
            .text(d => `${d.smartphones}M`);*/

        svg.selectAll(".text")
            .data(data)
            .enter().append("text")
            .attr("x", d => x(d.year))
            .attr("y", d => y(d.smartphones) + 25)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .text(d => `${d.smartphones}M`);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")));
    }, []);

    return <svg ref={ref} />;
};

export default SmartphonesInUS;