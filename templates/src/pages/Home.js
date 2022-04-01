import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Tablechart from '../components/Tablechart'
import Charttable from '../components/Charttable'

import Linechart from '../components/Linechart'
import Treechart from '../components/Treechart'
import Correlationchart from '../components/Correlationchart'
import Parallelchart from '../components/Parallelchart'
import Scatterchart from '../components/Scatterchart'
import ECDFchart from '../components/ECDFchart'
import Spiderchart from '../components/Spiderchart'

import Barchart1 from '../components/Barchart1'
import Barchart2 from '../components/Barchart2'
import Barchart3 from '../components/Barchart3'
import Boxchart1 from '../components/Boxchart1'
import Boxchart2 from '../components/Boxchart2'
import Densitychart1 from '../components/Densitychart1'
import Densitychart2 from '../components/Densitychart2'
import Histogramchart1 from '../components/Histogramchart1'
import Histogramchart2 from '../components/Histogramchart2'

import { mainLayout2Style } from '../const'
const PORT = 5000

const Home = () => {
  const [data, setData] = useState([])
  const [dataClassName, setClassName] = useState([])
  const [dataClassList, setClassList] = useState([])

  const [dataBarchart2, setDataBarchart2] = useState([])
  const [dataCharttable, setDataCharttable] = useState([])
  const [dataHistogramchart1, setHistogramchart1] = useState([])
  const [dataCorrelationchart, setCorrelationchart] = useState([])
  const [dataScatterchart, setScatterchart] = useState([])
  const [dataECDFchart, setECDFchart] = useState([])

  const [data1, setData1] = useState([])

  const [dataQuery, setQuery] = useState("")
  const [dataNL4DV, setNL4DV] = useState()
  const handleChange = ({ target: { value } }) => setQuery(value)
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
    .post(`http://${window.location.hostname}:${PORT}/query?` + Math.random(), dataQuery)
    .then(response => { setNL4DV(response.data) })
    .catch(error => { alert(`ERROR - ${error.message}`) })
  }

  useEffect(() => {
    axios
      .get(`http://${window.location.hostname}:${PORT}/static/iris.json?` + Math.random())
      .then(response => { setData(response.data) })
      .catch(error => { alert(`ERROR - ${error.message}`) })
    axios
      .get(`http://${window.location.hostname}:${PORT}/?` + Math.random())
      .then(response => {
        setClassName(response.data.className)
        setClassList(response.data.classList)
      })
      .catch(error => { alert(`ERROR - ${error.message}`) })    

    axios
      .get(`http://${window.location.hostname}:${PORT}/barchart2?` + Math.random())
      .then(response => { setDataBarchart2(response.data) })
      .catch(error => { alert(`ERROR - ${error.message}`) })
    axios
      .get(`http://${window.location.hostname}:${PORT}/charttable?` + Math.random())
      .then(response => { setDataCharttable(response.data) })
      .catch(error => { alert(`ERROR - ${error.message}`) })
    axios
      .get(`http://${window.location.hostname}:${PORT}/correlationchart?` + Math.random())
      .then(response => { setCorrelationchart(response.data) })
      .catch(error => { alert(`ERROR - ${error.message}`) })
    axios
      .get(`http://${window.location.hostname}:${PORT}/scatterchart?` + Math.random())
      .then(response => { setScatterchart(response.data) })
      .catch(error => { alert(`ERROR - ${error.message}`) })
    axios
      .get(`http://${window.location.hostname}:${PORT}/ECDFchart?` + Math.random())
      .then(response => { setECDFchart(response.data) })
      .catch(error => { alert(`ERROR - ${error.message}`) })  
    axios
      .post(`http://${window.location.hostname}:${PORT}/histogramchart1?` + Math.random(), { 'row': 1, 'col': 1 })
      .then(response => { setHistogramchart1(response.data) })
      .catch(error => { alert(`ERROR - ${error.message}`) })

    axios
      .get(`http://${window.location.hostname}:${PORT}/static/barchart1.json?` + Math.random())
      .then(response => { setData1(response.data) })
      .catch(error => { alert(`ERROR - ${error.message}`) })
  }, [])

  return (
    <div>
      <div className="main" style={mainLayout2Style}>
        <div className="box" style={{ gridArea: 'dataset' }}>
          dataset
        </div>
        <div className="box" style={{ gridArea: 'table-chart' }}>
          <Tablechart data={data} />
        </div>
        <div className="box" style={{ gridArea: 'line-chart' }}>
          <Linechart data={data} />
        </div>
        <div className="box" style={{ gridArea: 'visualization' }}>
          {/* <NL4DV spec={dataNL4DV} data={data} /> */}
          <form onSubmit={handleSubmit}>
            <input type="text" value={dataQuery} onChange={handleChange} placeholder="type your query here..." />
            <button type="submit">submit</button>
          </form>
        </div>

        <div className="box" style={{ gridArea: 'chart-table-top-left' }}><Barchart1 data={data1} /></div>
        <div className="box" style={{ gridArea: 'chart-table-top-right' }}><Barchart2 data={[dataBarchart2]} /></div>
        <div className="box" style={{ gridArea: 'chart-table' }}>
          <Charttable
            data = {Array.from({ length: Object(dataCharttable.columnList).length }, (_, i) => ({
              key: Object.values(dataCharttable)[0][i],
              missing: <Barchart1 data = { [{'Value': Object.values(dataCharttable)[1][i]}] }></Barchart1>,
              outlier: <Barchart1 data = { [{'Value': Object.values(dataCharttable)[2][i]}] }></Barchart1>,
              icons: <Barchart1 data = { [{'Value': Object.values(dataCharttable)[3][i]}] }></Barchart1>,
              quantile: <Boxchart1 data = { [{'Value': Object.values(dataCharttable)[4][i]}] }></Boxchart1>,
              descriptive: <Densitychart1 data = { [{'Value': Object.values(dataCharttable)[5][i]}] }></Densitychart1>
            }))}
            onClick = {(rowIdx, colIdx) =>
              axios
                .post(`http://${window.location.hostname}:${PORT}/histogramchart1?` + Math.random(), { 'row': rowIdx, 'col': colIdx })
                .then(response => { setHistogramchart1(response.data) })
                .catch(error => { alert(`ERROR - ${error.message}`) })
              }
            />
        </div>
        <div
          className="box vertical-align-center"
          style={{ gridArea: 'tree-chart' }}
        >
          <Treechart />
        </div>
        <div
          className="box"
          style={{
            gridArea: 'center-charts',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '10px'
          }}
        >
          <Histogramchart1 data={dataHistogramchart1} />
          <Correlationchart data={dataCorrelationchart}/>
          <Scatterchart data={dataScatterchart} method={1} />
          <ECDFchart data={dataECDFchart} />
          <Parallelchart data={data} />
          <Scatterchart data={dataScatterchart} dataClassList={dataClassList} method={2} />
        </div>
        <div className="box" style={{ gridArea: 'right-charts' }}>
          <Barchart3 />
          <Spiderchart data={data} />
          <Densitychart2 data={data} />
          <Boxchart2 data={data} dataClassName={dataClassName} dataClassList={dataClassList} />
        </div>
      </div>
    </div>
  )
}

export default Home
// bar chart: Error: <rect> attribute width: Expected length, "NaN".
// histogram: Error: <rect> attribute width: A negative value is not valid. ("-1")
