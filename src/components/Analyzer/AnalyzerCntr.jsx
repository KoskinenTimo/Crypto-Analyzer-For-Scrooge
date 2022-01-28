import React from 'react'
import { useSelector } from 'react-redux'
import './AnalyzerCntr.scss'

// Components
import DataView from '../DataView'
import AnalyzerForm from './AnalyzerForm'
import AnalyzerInfo from './AnalyzerInfo'


/**
 * A container to simply hold both main components of Analyze page to keep
 * routing clean in App and to communicate with backend to help testing
 * AnalyzerForm
 */
const AnalyzerCntr = () => {
  const search = useSelector(state => state.analyzer.fromDate)

  return (
    <div className='analyzer-cntr'>
      <AnalyzerForm />
      {!search ? <AnalyzerInfo /> : null}
      {search ? <DataView /> : null}
    </div>
  )

}

export default AnalyzerCntr