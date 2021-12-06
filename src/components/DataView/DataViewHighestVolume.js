import React, { useEffect, useState } from "react"

// Utils
import { parseToDate, parseNumber } from "../../utils/parsers"

/**
 * Used to render highest volume date data
 * @param {props}
 */
const DataViewHighestVolume = ({ arrayDatesVolumes }) => {
  const [ highestTradingVolumeDate, setHighestTradingVolumeDate ] = useState([])

  useEffect(() => {
    if (arrayDatesVolumes && arrayDatesVolumes.length) {
      const dateVolumePair = getHighestTradingVolumeAndDate(arrayDatesVolumes)
      const parsedDate = parseToDate(dateVolumePair[0])
      const parsedVolume = parseNumber(dateVolumePair[1])
      setHighestTradingVolumeDate([ parsedDate,parsedVolume ])
    }
    if (arrayDatesVolumes && !arrayDatesVolumes.length) {
      const reset = []
      setHighestTradingVolumeDate(reset)
    }
  },[arrayDatesVolumes])
  
  /**
   * Gets the highest volume trading day and volume out of the 
   * given data array of date-volume pairs
   * @param {[number[]]} arrayOfDatesWithVolume 
   * @returns {number[]}
   */
  const getHighestTradingVolumeAndDate = (arrayOfDatesWithVolume) => {
    return arrayOfDatesWithVolume.reduce((previousValue, currentValue) => {
      const currentValueVolumeHigher = previousValue[1] < currentValue[1]
      return currentValueVolumeHigher ? currentValue : previousValue
    })
  }



  if (highestTradingVolumeDate && highestTradingVolumeDate.length) {
    return (
      <div className="data-card">
        <h4>Highest volume date</h4>
        <p>
          The highest trading day by volume was {highestTradingVolumeDate[0]} and 
          the volume was {highestTradingVolumeDate[1]}€.
        </p>
      </div>
    )
  }
  return(<div></div>)

}

export default DataViewHighestVolume