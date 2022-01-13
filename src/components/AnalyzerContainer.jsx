import React from 'react'

// Components
import DataView from './DataView'
import DateInputForm from './DateInputForm'


/**
 * A container to simply hold both main components of Analyze page to keep
 * routing clean in App
 */
const AnalyzerContainer = () => {
  return (
    <>
      <DateInputForm />
      <DataView />
    </>
  )
}

export default AnalyzerContainer