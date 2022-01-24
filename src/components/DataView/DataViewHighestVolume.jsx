import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetHighestVolume } from '../../reducers/highestVolumeReducer'

// Utils
import { parseToDate, parseNumber } from '../../utils/parsers'


/**
 * Used to render highest volume date data
 * @param {props}
 */
const DataViewHighestVolume = () => {
  const s = useSelector(state => state.analyzer.symbol) // Currency symbol
  const highestVolumeAndDate = useSelector(state => state.highestVolume)
  const [ highestTradingVolumeDate, setHighestTradingVolumeDate ] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (highestVolumeAndDate.length) {
      const parsedDate = parseToDate(highestVolumeAndDate[0])
      const parsedVolume = parseNumber(highestVolumeAndDate[1])
      setHighestTradingVolumeDate([ parsedDate,parsedVolume ])
    }
    // Reset on unmount
    return () => {
      const reset = []
      setHighestTradingVolumeDate(reset)
      dispatch(resetHighestVolume())
    }
  },[highestVolumeAndDate])

  if (highestTradingVolumeDate.length) {
    return (
      <div className="data-card">
        <h4>Highest volume date</h4>
        <p>
          The highest trading day by volume was {highestTradingVolumeDate[0]} and
          the volume was {highestTradingVolumeDate[1]}{s}.
        </p>
      </div>
    )
  }
  return(<div></div>)
}

export default DataViewHighestVolume