import React, { useState } from 'react'
import { Box } from '../../Box'
import HistogramChart from '../../charts/HistogramChart'
import ScatterChart from '../../charts/ScatterChart'
import Action from './Action'
import Legend from '../../Legend'
import HorizontalBarChart from '../../charts/HorizontalBarChart'
import HeatmapChart from '../../charts/HeatmapChart'
import IndexingButtonBox from '../../IndexingButtonBox'
import { useFileData } from '../../../contexts/FileDataContext'

const dataColorInfo = {
  missing: 'steelblue',
  outlier: 'orange',
  incons: 'darkgreen',
}

export default function ActionDetail() {
  const {
    dataColumnList,
    actionDetailData,
    isEmptyData,
    setSelectedActionDetailHeatmapIndex,
  } = useFileData()
  const {
    barChart,
    heatmapChart,
    heatmapChartY,
    histogramChart,
    scatterChart,
  } = actionDetailData

  const [dataHeatmapColor, setHeatmapColor] = useState(dataColorInfo.missing)

  return (
    <Box title="action-detail" style={{ backgroundColor: 'var(--grey-050)' }}>
      {!isEmptyData({
        barChart,
        heatmapChart,
        heatmapChartY,
        histogramChart,
        scatterChart,
      }) && (
        <>
          <Legend dataColorInfo={dataColorInfo} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {Object.entries(dataColorInfo).map(([k, v]) => (
              <HorizontalBarChart
                data={[barChart[k]]}
                colorCode={v}
                onClick={() => setHeatmapColor(v)}
              />
            ))}
          </div>
          <HeatmapChart
            data={heatmapChart}
            dataHeatmapChartYList={heatmapChartY}
            dataColumnList={dataColumnList}
            colorCode={dataHeatmapColor}
            onHeatmapCellClick={index => 
              setSelectedActionDetailHeatmapIndex(index)
            }
          />
          <IndexingButtonBox
            style={{ margin: '5px 0', height: '47%' }}
            componentInfo={{
              'column data': <HistogramChart data={histogramChart} />,
              'specific data': <ScatterChart data={scatterChart} method={1} />,
            }}
          />
          <Action />
        </>
      )}
    </Box>
  )
}
