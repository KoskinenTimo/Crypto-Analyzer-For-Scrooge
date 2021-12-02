import React from "react"
import { useEffect, useState } from "react/cjs/react.development"

/**
 * Used to render highest volume date data
 * @param {props}
 */
const DataViewHighestVolume = ({ arrayOfDatesWithVolumes }) => {
  const [ highestTradingVolumeDate, setHighestTradingVolumeDate ] = useState()

  useEffect(() => {
    if(!arrayOfDatesWithVolumes || !arrayOfDatesWithVolumes.length) return
    const newHighestTradingVolumeDate = getHighestTradingVolumeDateAndVolume(arrayOfDatesWithVolumes)
    setHighestTradingVolumeDate(newHighestTradingVolumeDate)
  },[arrayOfDatesWithVolumes])
  /**
   * Gets the highest volume trading day and volume out of the 
   * given data array of date-volume pairs
   * @param {[number[]]} arrayOfDatesWithVolume 
   * @returns {number[]}
   */
  const getHighestTradingVolumeDateAndVolume = (arrayOfDatesWithVolume) => {
    return arrayOfDatesWithVolume.reduce((previousValue, currentValue) => {
      const currentValueVolumeHigher = previousValue[1] < currentValue[1]
      return currentValueVolumeHigher ? currentValue : previousValue
    })
  }

  return (
    <div>
      <h3>
        Highest trading trade by volume was {highestTradingVolumeDate[0]} and 
        the volume was {highestTradingVolumeDate[1]}
      </h3>
    </div>
  )
}

export default DataViewHighestVolume