import React, { useEffect, useRef } from 'react'

function DensityChart(props) {
  const {data, densityChartNum} = props
  const svgRef = useRef()
  const d3 = window.d3v4

  const leftMove = 30

  useEffect(() => {
    if (!data) {
      return
    }

    var svg = d3.select(svgRef.current)
    d3.select(svgRef.current).selectAll('*').remove()

    var margin = { top: 0, right: 0, bottom: 10, left: 0 },
      width = svgRef.current.clientWidth - margin.left - margin.right,
      height = 50 - margin.top - margin.bottom

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
      .domain([d3.min(data, d => d.value) - 10, d3.max(data, d => d.value) + 10])
      .range([0, width])
    svg.append("g")
      .attr('transform', 'translate(' + leftMove + ',' + 45 + ')')
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .remove()

    var y = d3.scaleLinear()
      .domain([0, 0.1])
      .range([height, 8])
    svg.append("g")
      .attr('transform', 'translate(' + leftMove + ', 5)')
      .call(d3.axisLeft(y).ticks(3))
      .style("font-size", "8px");

    var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40))
    var density1 =  kde( data
      .filter( function(d){ return d.index === "norm"; })
      .map(function(d){  return d.value; })
    )
    var density2 =  kde( data
      .filter( function(d){ return d.index === "uniform"; })
      .map(function(d){  return d.value; })
    )
    var density3 =  kde( data
      .filter( function(d){return d.index === "data"; })
      .map(function(d){  return d.value; })
    )

    svg.append("path")
      .attr("class", "mypath")
      .datum(density2)
      .attr("fill", "none")
      .attr("stroke", "#cccccc")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("d",  d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d[0]) + leftMove; })
      .y(function(d) { return y(d[1]) + 5; })
    )

    svg.append("path")
      .attr("class", "mypath")
      .datum(density3)
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("d",  d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d[0]) + leftMove; })
      .y(function(d) { return y(d[1]) + 5; })
    );

    svg.append("text").attr("x", width/2 + 30).attr("y", 5).text(densityChartNum[0]).style("font-size", "8px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", width/2 + 30).attr("y", 15).text(densityChartNum[1]).style("font-size", "8px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", 28).attr("y", 5).text('P').style("font-size", "8px").attr("alignment-baseline", "middle")

    function kernelDensityEstimator(kernel, X) {
      return function(V) {
        return X.map(function(x) {
          return [x, d3.mean(V, function(v) { return kernel(x - v); })];
        });
      };
    }
    function kernelEpanechnikov(k) {
      return function(v) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
      };
    }
  }, [data, densityChartNum])

  return <svg ref={svgRef} style={{ width: '100%', height: '100%', marginTop: 10, marginLeft: -10 }}></svg>
}
export default DensityChart
