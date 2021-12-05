import React, { useEffect, useState } from "react"

// Components
import DataViewBearishTrend from "./DataViewBearishTrend"
import DataViewBestBuySell from "./DataViewBestBuySell"
import DataViewHighestVolume from "./DataViewHighestVolume"
import DataViewNoData from "./DataViewNoData"
import Loading from "../Loading"

// Services
import { getBitcoinChartRange } from "../../services/geckoApiService"


const DataView = ({
  fromDateTimeStamp,
  toDateTimeStamp,
  setError
}) => {
  const [ arrayDatesPrices, setarrayDatesPrices ] = useState([])
  const [ arrayDatesVolumes, setarrayDatesVolumes] = useState([])
  const [ fetchedPrices, setFetchedPrices ] = useState([])
  const [ fetchedVolumes, setFetchedVolumes ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    if (
      fromDateTimeStamp &&
      toDateTimeStamp 
      ) {
        // Get data from API
        getBitcoinChartRange(fromDateTimeStamp,toDateTimeStamp)
          .then(res => {
            setFetchedPrices(res.prices)
            setFetchedVolumes(res.total_volumes)
            // if there is data from the range of dates, set it for viewing
            if (
              res.prices &&
              res.total_volumes &&
              res.prices.length &&
              res.total_volumes.length
              ) {                
                const newArrayOfDates = createDateArray(fromDateTimeStamp,toDateTimeStamp)
                const newarrayDatesPrices = getOneDataPointPerDate(newArrayOfDates,res.prices)
                const newarrayDatesVolumes = getOneDataPointPerDate(newArrayOfDates,res.total_volumes)
                setarrayDatesPrices(newarrayDatesPrices)
                setarrayDatesVolumes(newarrayDatesVolumes)
            }
            setLoading(false)      
          })
          .catch(err => {
            setError(err.message)
          })
    }    
    if (!fromDateTimeStamp || !toDateTimeStamp) {
      resetData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fromDateTimeStamp,toDateTimeStamp])

  /**
   * Reset all data set states this component handles
   */
  const resetData = () => {
    const reset = []
    setarrayDatesPrices(reset)
    setarrayDatesVolumes(reset)
    setFetchedPrices(reset)
    setFetchedVolumes(reset)
    setLoading(true)
  }

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
   * @returns {[number[]]} [...,[date,data],...]
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
    loading &&
    fromDateTimeStamp &&
    toDateTimeStamp    
    ) {
    return (
      <div className="dataview-container">
        <Loading />
      </div>
      )
  }
  if (
    !loading &&
    fromDateTimeStamp &&
    toDateTimeStamp &&    
    fetchedPrices &&
    fetchedVolumes &&
    !fetchedPrices.length &&
    !fetchedVolumes.length
    ) {
      return (
      <div className="dataview-container">
        <DataViewNoData />
      </div>
      )
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