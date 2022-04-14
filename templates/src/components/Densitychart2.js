import React, { useEffect, useRef } from 'react'

function Densitychart2(props) {
  const {data} = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    var svg = d3.select(svgRef.current);
    d3.select(svgRef.current).selectAll("*").remove();

    var margin = {top: 30, right: 30, bottom: 30, left: 30},
      width = 250 - margin.left - margin.right,
      height = 180 - margin.top - margin.bottom;

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_doubleHist.csv", function(data) {
      var x = d3.scaleLinear()
        .domain([-10,15])
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 0.12]);
      svg.append("g")
        .call(d3.axisLeft(y));

      var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(60))
      var density1 =  kde( data
        .filter( function(d){return d.type === "variable 1"} )
        .map(function(d){  return d.value; }) )
      var density2 =  kde( data
        .filter( function(d){return d.type === "variable 2"} )
        .map(function(d){  return d.value; }) )

      svg.append("path")
        .attr("class", "mypath")
        .datum(density1)
        .attr("fill", "#69b3a2")
        .attr("opacity", ".6")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d",  d3.line()
          .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); })
        );

      svg.append("path")
        .attr("class", "mypath")
        .datum(density2)
        .attr("fill", "#404080")
        .attr("opacity", ".6")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d",  d3.line()
          .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); })
        );
    });

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
    }, [props.data]);
    
  return (
    <>
      <svg ref = {svgRef}>
      </svg>
    </>
  );
}
export default Densitychart2
