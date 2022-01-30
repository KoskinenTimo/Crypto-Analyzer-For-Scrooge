import React from 'react'
import { useSelector } from 'react-redux'
import './AnalyzerCntr.scss'

// Components
import DataViewCntr from '../DataView/DataViewCntr'
import AnalyzerForm from './AnalyzerForm'
import AnalyzerInfo from './AnalyzerInfo'


/**
 * A container to simply hold both main components of Analyze page to keep
 * routing clean in App
 */
const AnalyzerCntr = () => {
  const search = useSelector(state => state.analyzer.fromDate)

  return (
    <div className='analyzer-cntr'>
      <AnalyzerForm />
      {!search ? <AnalyzerInfo /> : null}
      {search ? <DataViewCntr /> : null}
    </div>
  )

}

export default AnalyzerCntr