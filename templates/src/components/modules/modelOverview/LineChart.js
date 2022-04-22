import React, { useEffect, useRef } from "react"

export default function LineChart(props) {
  const { data } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    if (!data) {
      return
    }
    var svg = d3.select(svgRef.current)
    d3.select(svgRef.current).selectAll("*").remove()

    var margin = { top: 0, right: 0, bottom: 20, left: 0 },
      width = svgRef.current.clientWidth - margin.left - margin.right,
      height = svgRef.current.clientHeight - margin.top - margin.bottom

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var allGroup = ["valueA", "valueB", "valueC"]

    var dataReady = allGroup.map(function (grpName) {
      return {
        name: grpName,
        values: data.map(function (d) {
          return { time: d.time, value: +d[grpName] }
        }),
      }
    })

    var myColor = d3
      .scaleOrdinal()
      .domain(allGroup)
      .range(["#eb3477", "#8934eb", "#4ceb34"])

    var x = d3.scaleLinear().domain([0, 10]).range([0, width])
    svg
      .append("g")
      .attr("transform", "translate(20," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .remove()

    var y = d3.scaleLinear().domain([0, 20]).range([height - 10, 0])
    svg
      .append("g")
      .attr("transform", "translate(" + 20 + ", 10)")
      .call(d3.axisLeft(y))

    var line = d3
      .line()
      .x(function (d) {
        return x(+d.time) + 20
      })
      .y(function (d) {
        return y(+d.value)
      })

    svg
      .selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
      .attr("d", function (d) {
        return line(d.values)
      })
      .attr("stroke", function (d) {
        return myColor(d.name)
      })
      .style("stroke-width", 4)
      .style("fill", "none")

    svg
      .selectAll("myDots")
      .data(dataReady)
      .enter()
      .append("g")
      .style("fill", function (d) {
        return myColor(d.name)
      })
      .selectAll("myPoints")
      .data(function (d) {
        return d.values
      })
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.time) + 20
      })
      .attr("cy", function (d) {
        return y(d.value)
      })
      .attr("r", 5)
      .attr("stroke", "white")
  }, [data, d3])

  return (
    <>
      <svg ref={svgRef} style={{ width: "95%", height: "60%" }}></svg>
    </>
  )
}