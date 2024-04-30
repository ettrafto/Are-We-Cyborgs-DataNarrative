import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const InternetUseByAge = () => {
    
    const data = [
        { ageGroup: "18-29", values: [{ year: 2000, percentage: 70 }, { year: 2021, percentage: 99 }] },
        { ageGroup: "30-49", values: [{ year: 2000, percentage: 61 }, { year: 2021, percentage: 98 }] },
        { ageGroup: "50-64", values: [{ year: 2000, percentage: 46 }, { year: 2021, percentage: 96 }] },
        { ageGroup: "65+", values: [{ year: 2000, percentage: 14 }, { year: 2021, percentage: 75 }] },
    ];
    
    const ref = useRef();

    useEffect(() => {
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const svg = d3.select(ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Scales
        const x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1)
            .domain(data.map(d => d.ageGroup));

        const x1 = d3.scaleBand()
            .padding(0.05)
            .domain([2000, 2021])
            .rangeRound([0, x0.bandwidth()]);

        const y = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, d3.max(data, d => d3.max(d.values, d => d.percentage))]);

        // Axes
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x0));

        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y));

        // Bars
        const ageGroup = svg.selectAll(".ageGroup")
            .data(data)
            .enter().append("g")
            .attr("class", "ageGroup")
            .attr("transform", d => `translate(${x0(d.ageGroup)},0)`);

        ageGroup.selectAll("rect")
            .data(d => d.values)
            .enter().append("rect")
            .attr("x", d => x1(d.year))
            .attr("y", d => y(d.percentage))
            .attr("width", x1.bandwidth())
            .attr("height", d => height - y(d.percentage))
            .attr("fill", d => d.year === 2000 ? "#4daf4a" : "#377eb8");
    }, [data]); // Redraw chart if data changes

    return (
        <svg ref={ref}></svg>
    );
};

export default InternetUseByAge;