import React from 'react'
import Select from 'react-select'
import Title from '../../Title'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'

export default function Setting() {
  const {
    isEmptyData,
    purposeList,
    settingData: { columnList, modelList, evalList, dimensionList },
    settingValues,
    setSettingValues,
  } = useFileData()

  const handleChange = (key, value) => {
    setSettingValues(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Box
      title="setting"
      style={{
        display: 'grid',
        overflow: 'visible',
        gridGap: '5px',
      }}
    >
      {!isEmptyData({
        purposeList,
      }) && (
        <>
          <Title title="Model type" />
          <Select
            options={purposeList}
            placeholder={<div>Select model type</div>}
            onChange={v => {
              handleChange('purpose', v)
            }}
          />
          <Title title="Target column" />
          <Select
            options={columnList}
            value={settingValues.column}
            placeholder={<div>Select column</div>}
            onChange={v => {
              handleChange('column', v)
            }}
          />
          <Title title="Target model" />
          <Select
            isMulti
            options={modelList}
            placeholder={<div>Select model</div>}
            onChange={v => handleChange('model', v)}
          />
          <Title title="Target metric" />
          <Select
            isMulti
            options={evalList}
            placeholder={<div>Select metric</div>}
            onChange={v => handleChange('eval', v)}
          />
        </>
      )}
    </Box>
  )
}
