import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import DataViewBearishTrend from './DataViewBearishTrend'
import DataViewBestBuySell from './DataViewBestBuySell'
import DataViewHighestVolume from './DataViewHighestVolume'
import DataViewNoData from './DataViewNoData'
import Loading from '../Loading'

// Services
import { getCoinChartRange } from '../../services/geckoApiService'
import { createErrorNotification } from '../../reducers/notificationReducer'
import { resetSearch } from '../../reducers/analyzerReducer'
import { createBearishTrend } from '../../reducers/bearishTrendReducer'
import { createBestBuySell } from '../../reducers/bestBuySellReducer'


/**
 * Main container component for all data display, formats dates data to be
 * used by children, like list of days and days with data points
 */
const DataView = () => {
  const dispatch = useDispatch()
  const analyzer = useSelector(state => state.analyzer)
  const [ loading, setLoading ] = useState(false)
  const [ arrayDatesPrices, setArrayDatesPrices ] = useState([])
  const [ arrayDatesVolumes, setArrayDatesVolumes ] = useState([])

  useEffect(() => {
    if (loading) return
    setLoading(true)
    // Get data from API
    getCoinChartRange(
      analyzer.fromDate,
      analyzer.toDate,
      analyzer.coin,
      analyzer.currency
    )
      .then(res => {
        const { prices, total_volumes } = res.data
        if (
          prices &&
          total_volumes &&
          prices.length &&
          total_volumes.length
        ) {
          const newArrayOfDates = createDateArray(analyzer.fromDate,analyzer.toDate)
          const newarrayDatesPrices = getOneDataPointPerDate(newArrayOfDates,prices)
          const newarrayDatesVolumes = getOneDataPointPerDate(newArrayOfDates,total_volumes)
          setArrayDatesPrices(newarrayDatesPrices)
          setArrayDatesVolumes(newarrayDatesVolumes)
          dispatch(createBearishTrend(newarrayDatesPrices))
          dispatch(createBestBuySell(newarrayDatesPrices))
        }
        setLoading(false)
      })
      .catch(err => {
        if (
          err.response &&
            err.response.data &&
            err.response.data.error
        ) {
          dispatch(createErrorNotification(err.response.data.error))
        } else {
          dispatch(createErrorNotification(err.message))
        }
        setLoading(false)
      })
  },[analyzer])

  /**
   * Reset data when unmount
   */
  useEffect(() => {
    return () => {
      const reset = []
      setLoading(false)
      dispatch(resetSearch())
      setArrayDatesPrices(reset)
      setArrayDatesVolumes(reset)
    }
  }, [])

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
    while (currentDay <= lastDay) {
      dateArray.push(currentDay)
      const newDay = addOneDayToDate(currentDay)
      currentDay = newDay
    }
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
    let index = 0
    const datesWithData = arrayOfDates.map(dateInMS => {
      let closestDataPoint = ''
      if (index >= arrayOfDataPointsPerTimestamp.length) {
        index = arrayOfDataPointsPerTimestamp.length - 1
      }
      for (index; index < arrayOfDataPointsPerTimestamp.length;index++) {
        if (!closestDataPoint) {
          closestDataPoint = arrayOfDataPointsPerTimestamp[index]
          continue
        }
        const storedDifference = Math.abs(arrayOfDataPointsPerTimestamp[index-1][0] - dateInMS)
        const currentDifference = Math.abs(arrayOfDataPointsPerTimestamp[index][0] - dateInMS)
        if (storedDifference < currentDifference) {
          index--
          break
        }
        if (storedDifference === currentDifference) {
          closestDataPoint = arrayOfDataPointsPerTimestamp[index]
          continue
        }
        closestDataPoint = arrayOfDataPointsPerTimestamp[index]
      }
      return [ dateInMS, closestDataPoint[1] ]
    })
    return datesWithData
  }

  if (loading) {
    return (
      <div className="dataview-container">
        <Loading />
      </div>
    )
  }
  if (
    !loading &&
    !arrayDatesPrices.length &&
    !arrayDatesVolumes.length
  ) {
    return (
      <div className="dataview-container">
        <DataViewNoData />
      </div>
    )
  }
  return(
    <div className="dataview-container">
      <DataViewBearishTrend />
      <DataViewHighestVolume />
      <DataViewBestBuySell />
    </div>)
}

export default DataView