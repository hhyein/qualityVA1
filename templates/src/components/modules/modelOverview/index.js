import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Box } from '../../Box'
import ChartTable from './ChartTable'
import HorizontalBarChart from '../../charts/HorizontalBarChart'
import { useFileData } from '../../../contexts/FileDataContext'

export default function ModelOverview() {
  const {
    modelOverviewData,
    isEmptyData,
    modelOverviewTableSortingInfo,
    setModelOverviewTableSortingInfo,
    selectedModelOverviewTableRow,
    setSelectedModelOverviewTableRow,
  } = useFileData()
  const { chartTable } = modelOverviewData

  const data = useMemo(() => {
    if (!chartTable) {
      return []
    }
    return chartTable.combinationList.map((combination, i) => ({
      key: combination,
      Model: chartTable.modelNames[i],
      Combination: chartTable.combinationIconList[i],
      CombinationDetail: chartTable.combinationDetailIconList[i],
      ...chartTable.inputEvalList.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: chartTable[cur][i],
        }),
        {}
      ),
    }))
  }, [chartTable])

  const sortedData = useMemo(() => {
    const { column, isAscending } = modelOverviewTableSortingInfo
    if (!column) {
      return []
    }
    const sortedChartTableData = data.sort((a, b) =>
      isAscending
        ? a[column].data - b[column].data
        : b[column].data - a[column].data
    )

    if (
      selectedModelOverviewTableRow === undefined &&
      sortedChartTableData.length > 0
    ) {
      const firstRow = sortedChartTableData[0]
      setSelectedModelOverviewTableRow({
        key: firstRow.key,
        Combination: firstRow.Combination,
        CombinationDetail: firstRow.CombinationDetail,
      })
    }
    return sortedChartTableData
  }, [modelOverviewTableSortingInfo, data])

  const handleTableHeadClick = useCallback(
    columnName => {
      setModelOverviewTableSortingInfo(prev => ({
        ...prev,
        column: columnName,
      }))
    },
    [setModelOverviewTableSortingInfo]
  )

  return (
    <Box title="model-overview" style={{ overflow: 'auto' }}>
      {!isEmptyData({ chartTable }) && data.length > 0 && (
        <ChartTable
          canSortColumns={chartTable.inputEvalList}
          selectedColumn={modelOverviewTableSortingInfo.column}
          onTableHeadClick={handleTableHeadClick}
          onTableRowClick={({ key, rowIdx }) =>
            setSelectedModelOverviewTableRow({
              key,
              Combination: sortedData[rowIdx].Combination,
              CombinationDetail: sortedData[rowIdx].CombinationDetail,
            })
          }
          data={sortedData.map((d, i) => ({
            key: d.key,
            ...['Model'].reduce(
              (acc, cur) => ({
                ...acc,
                [cur]: d[cur],
              }),
              {}
            ),
            ...['Combination', 'CombinationDetail'].reduce(
              (acc, cur) => ({
                ...acc,
                [cur]: (
                  <div style={{ display: 'flex' }}>
                    {d[cur].map(imgName => (
                      <img
                        src={require(`../../icons/${imgName}.png`)}
                        alt={''}
                        style={{ height: '25px', width: '25px' }}
                      />
                    ))}
                  </div>
                ),
              }),
              {}
            ),
            ...chartTable.inputEvalList.reduce(
              (acc, cur, j) => ({
                ...acc,
                [cur]: (
                  <HorizontalBarChart
                    data={[d[cur]]}
                    colorCode={['lightcoral', 'mediumturquoise', 'sienna'][j]}
                    selceted={d ? d?.key === selectedModelOverviewTableRow?.key : undefined}
                  />
                ),
              }),
              {}
            ),
          }))}
        />
      )}
    </Box>
  )
}
