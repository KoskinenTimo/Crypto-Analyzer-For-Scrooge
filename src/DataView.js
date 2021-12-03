import React, { useEffect, useState } from "react"

// Components
import DataViewBearishTrend from "./DataViewBearishTrend"
import DataViewBestBuySell from "./DataViewBestBuySell"
import DataViewHighestVolume from "./DataViewHighestVolume"
import DataViewNoData from "./DataViewNoData"

// Services
import { getBitcoinChartRange } from "./services/geckoApiService"

// // Sample data
// // 1583020800 1627866000
// import set1 from "./data/response_1638445445429.json"
// // 1625184000 1627866000
// import set2 from "./data/response_1638470696634.json"
// // 1627776000 1627866000
// import set3 from "./data/response_1638470886219.json"


const DataView = ({
  fromDateTimeStamp,
  toDateTimeStamp,
  setError
}) => {
  const [ arrayDatesPrices, setarrayDatesPrices ] = useState([])
  const [ arrayDatesVolumes, setarrayDatesVolumes] = useState([])
  const [ arrayOfDates, setArrayOfDates ] = useState([])
  const [ fetchedPrices, setFetchedPrices ] = useState([])
  const [ fetchedVolumes, setFetchedVolumes ] = useState([])

  console.log(fetchedPrices,fetchedVolumes,"fetched");
  console.log(arrayOfDates,"dates");
  console.log(arrayDatesPrices,"prices");
  console.log(arrayDatesVolumes,"volumes");

  useEffect(() => {
    if (
      fromDateTimeStamp &&
      toDateTimeStamp &&
      fromDateTimeStamp !== "" &&
      toDateTimeStamp.length !== ""
      ) {
        const newArrayOfDates = createDateArray(fromDateTimeStamp,toDateTimeStamp)
        setArrayOfDates(newArrayOfDates)
        getBitcoinChartRange(fromDateTimeStamp,toDateTimeStamp)
          .then(res => {
            console.log(res);
            setFetchedPrices(res.prices)
            setFetchedVolumes(res.total_volumes)
          })
          .catch(err => {
            setError(err.message)
          })
        return
    }
    const reset = []
    setarrayDatesPrices(reset)
    setarrayDatesVolumes(reset)
    setFetchedPrices(reset)
    setFetchedVolumes(reset)
    setArrayOfDates(reset)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fromDateTimeStamp,toDateTimeStamp])

  useEffect(() => {
    if(
      arrayOfDates &&
      fetchedPrices &&
      fetchedVolumes &&
      arrayOfDates.length &&
      fetchedPrices.length &&
      fetchedVolumes.length
      ) {
        console.log("TEST2");
        const newarrayDatesPrices = getOneDataPointPerDate(arrayOfDates,fetchedPrices)
        const newarrayDatesVolumes = getOneDataPointPerDate(arrayOfDates,fetchedVolumes)
        setarrayDatesPrices(newarrayDatesPrices)
        setarrayDatesVolumes(newarrayDatesVolumes)
      }

  }, [arrayOfDates,fetchedPrices,fetchedVolumes])

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
   * @param {number} fromDate Unix timestamp ms
   * @param {number} toDate Unix timestamp ms
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
   
  if (
    fromDateTimeStamp &&
    toDateTimeStamp && 
    !fetchedPrices.length) {
    return(
    <div className="dataview-container">
      <DataViewNoData />
    </div>)
  }
  return(
  <div className="dataview-container">
    <DataViewBearishTrend 
      arrayDatesPrices={arrayDatesPrices} 
      fromDateTimeStamp={fromDateTimeStamp}
      toDateTimeStamp={toDateTimeStamp}
    /> 
    <DataViewHighestVolume arrayDatesVolumes={arrayDatesVolumes} />
    <DataViewBestBuySell arrayDatesPrices={arrayDatesPrices} />
  </div>)
}

export default DataView