import React from 'react'

// Components
import DataView from './DataView'
import AnalyzeForm from './AnalyzeForm'


/**
 * A container to simply hold both main components of Analyze page to keep
 * routing clean in App
 */
const AnalyzerContainer = () => {
  return (
    <>
      <AnalyzeForm />
      <DataView />
    </>
  )
}

export default AnalyzerContainer