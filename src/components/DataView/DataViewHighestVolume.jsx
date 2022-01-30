import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetHighestVolume } from '../../reducers/highestVolumeReducer'
import { parseToDate, parseNumber } from '../../utils/parsers'
import './DataViewHighestVolume.scss'

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
  },[highestVolumeAndDate])

  useEffect(() => {
    return () => {
      const reset = []
      setHighestTradingVolumeDate(reset)
      dispatch(resetHighestVolume())
    }
  }, [])

  if (highestTradingVolumeDate.length) {
    return (
      <div className="dv-volume-card">
        <h4 className='dv-volume-card__title'>Highest volume date</h4>
        <p className='dv-volume-card__txt'>
          The highest trading day by volume was {highestTradingVolumeDate[0]} and
          the volume was {highestTradingVolumeDate[1]}{s}.
        </p>
      </div>
    )
  }
  return(<div></div>)
}

export default DataViewHighestVolume