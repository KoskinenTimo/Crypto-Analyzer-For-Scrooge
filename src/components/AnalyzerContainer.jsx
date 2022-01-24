import React from 'react'

// Components
import DataView from './DataView'
import AnalyzerForm from './AnalyzerForm'
import AnalyzerInfo from './AnalyzerInfo'
import { useSelector } from 'react-redux'


/**
 * A container to simply hold both main components of Analyze page to keep
 * routing clean in App
 */
const AnalyzerContainer = () => {
  const search = useSelector(state => state.analyzer.fromDate)

  return (
    <div className='data-card-table'>
      <AnalyzerForm />
      {!search ? <AnalyzerInfo /> : null}
      {search ? <DataView /> : null}
    </div>
  )

}

export default AnalyzerContainer