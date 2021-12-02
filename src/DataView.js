import React, { useEffect, useState } from "react"

// Components
import DataViewBearishTrend from "./DataViewBearishTrend"
import DataViewBestBuySell from "./DataViewBestBuySell"
import DataViewHighestVolume from "./DataViewHighestVolume"

// Sample data
// 1583020800 1627866000
import set1 from "./data/response_1638445445429.json"
// 1625184000 1627866000
import set2 from "./data/response_1638470696634.json"
// 1627776000 1627866000
import set3 from "./data/response_1638470886219.json"


const DataView = ({
  fromDateTimeStamp,
  toDateTimeStamp,
  setFromDateTimeStamp,
  setToDateTimeStamp
}) => {
  const [ arrayOfDatesWithPrices, setArrayOfDatesWithPrices ] = useState([])
  const [ arrayOfDatesWithVolumes, setArrayOfDatesWithVolumes] = useState([])
  const [ arrayOfDates, setArrayOfDates ] = useState([])
  useEffect(() => {
    if (
      fromDateTimeStamp &&
      toDateTimeStamp &&
      fromDateTimeStamp !== "" &&
      toDateTimeStamp.length !== ""
      ) {
        const newArrayOfDates = createDateArray(1583020800,1627866000)
        setArrayOfDates(newArrayOfDates)
        setFromDateTimeStamp('')
        setToDateTimeStamp('')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fromDateTimeStamp,toDateTimeStamp])

  useEffect(() => {
    if(!arrayOfDates || !arrayOfDates.length) return
    const newArrayOfDatesWithPrices = getOneDataPointPerDate(arrayOfDates,set1.prices)
    const newArrayOfDatesWithVolumes = getOneDataPointPerDate(arrayOfDates,set1.total_volumes)
    setArrayOfDatesWithPrices(newArrayOfDatesWithPrices)
    setArrayOfDatesWithVolumes(newArrayOfDatesWithVolumes)
  }, [arrayOfDates])

  /**
   * Takes in a date in milliseconds format, adds one day
   * and returns the new date
   * @param {number} dateToIncrement 
   * @returns {number} dateInMSFormat
   */
  const addOneDayToDate = dateToIncrement => {
    const date = new Date(dateToIncrement)
    date.setUTCDate(date.getUTCDate()+1)
    date.setUTCHours(0)
    const dateInMSFormat = Date.parse(date)
    return dateInMSFormat
  }

  /**
   * Creates an array of dates at 00:00:00 UTC time
   * between the given 'fromDate' and 'toDate'
   * @param {number} fromDate 
   * @param {number} toDate 
   * @returns {number[]} dateArray
   */
  const createDateArray = (fromDate,toDate) => {
    const firstDay = fromDate*1000
    const lastDay = toDate*1000
    let currentDay = firstDay
    const dateArray = []
    while (currentDay < lastDay) {
      dateArray.push(currentDay)
      const newDay = addOneDayToDate(currentDay)
      currentDay = newDay
    }
    dateArray.pop()
    return dateArray
  }
  
  /**
   * Takes in an array of dates, then finds closest time node from the
   * other array which consists of [date,data] pairs
   * dates [...,date,...] data nodes [...,[closestDate,data],...]
   * ==> [...,[date,data],...]
   * @param {number[]} arrayOfDates 
   * @param {[number[]]} arrayOfDataPointsPerTimestamp 
   * @returns 
   */
  const getOneDataPointPerDate = (arrayOfDates,arrayOfDataPointsPerTimestamp) => {
    const datesWithData = arrayOfDates.map(date => {
      const dateUnix = date
      const closestDataPoint = arrayOfDataPointsPerTimestamp.reduce((previousValue, currentValue) => {
        const storedDifference = Math.abs(previousValue[0] - dateUnix)
        const currentDifference = Math.abs(currentValue[0] - dateUnix)
        const previousValueDifferenceLower = storedDifference < currentDifference
        return previousValueDifferenceLower ? previousValue : currentValue
      })
      return [ date, closestDataPoint[1] ]
    })
    return datesWithData
  }
   
  
  return(
  <div>
    <DataViewBearishTrend arrayOfDatesWithPrices={arrayOfDatesWithPrices} />
    <DataViewHighestVolume arrayOfDatesWithVolumes={arrayOfDatesWithVolumes} />
    <DataViewBestBuySell arrayOfDatesWithPrices={arrayOfDatesWithPrices} />
  </div>)
}

export default DataView