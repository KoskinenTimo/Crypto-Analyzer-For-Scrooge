import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import DataViewBearishTrend from './DataViewBearishTrend'
import DataViewBestBuySell from './DataViewBestBuySell'
import DataViewHighestVolume from './DataViewHighestVolume'
import DataViewNoData from './DataViewNoData'
import Loading from '../Loading'

// Services
import { getBitcoinChartRange } from '../../services/geckoApiService'
import { createError } from '../../reducers/errorReducer'
import { resetSearch } from '../../reducers/analyzerReducer'


/**
 * Main container component for all data display, formats dates data to be
 * used by children, like list of days and days with data points
 */
const DataView = () => {
  const dispatch = useDispatch()
  const analyzer = useSelector(state => state.analyzer)
  const [ arrayDatesPrices, setarrayDatesPrices ] = useState([])
  const [ arrayDatesVolumes, setarrayDatesVolumes] = useState([])
  const [ fetchedPrices, setFetchedPrices ] = useState([])
  const [ fetchedVolumes, setFetchedVolumes ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    if (
      analyzer &&
      analyzer.fromDate &&
      analyzer.toDate
    ) {
      // Get data from API
      getBitcoinChartRange(analyzer.fromDate,analyzer.toDate)
        .then(res => {
          const { prices, total_volumes } = res.data
          setFetchedPrices(res.prices)
          setFetchedVolumes(res.total_volumes)
          // if there is data from the range of dates, set it for viewing
          if (
            prices &&
            total_volumes &&
            prices.length &&
            total_volumes.length
          ) {
            const newArrayOfDates = createDateArray(analyzer.fromDate,analyzer.toDate)
            const newarrayDatesPrices = getOneDataPointPerDate(newArrayOfDates,prices)
            const newarrayDatesVolumes = getOneDataPointPerDate(newArrayOfDates,total_volumes)
            setarrayDatesPrices(newarrayDatesPrices)
            setarrayDatesVolumes(newarrayDatesVolumes)
          }
          setLoading(false)
        })
        .catch(err => {
          if (
            err.response &&
            err.response.data &&
            err.response.data.error
          ) {
            dispatch(createError(err.response.data.error))
          } else {
            dispatch(createError(err.message))
          }
        })
    }
    if (!analyzer.fromDate || !analyzer.toDate) {
      resetData()
    }
  },[analyzer])

  /**
   * Reset data when componentWillUnmount
   */
  useEffect(() => {
    return () => {
      dispatch(resetSearch())
    }
  })

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
      // for loop is 40 times more performant in tests than reduce but less readable
      // get the matching date from the other array and start the loop where
      // previous for loop left of(both arrays in chronological order), break the
      // for loop when the gap is getting wider, in other works the date is
      // getting further from the already found 'best match'
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

  if (
    loading &&
    analyzer &&
    analyzer.fromDate &&
    analyzer.toDate
  ) {
    return (
      <div className="dataview-container">
        <Loading />
      </div>
    )
  }
  if (
    !loading &&
    analyzer &&
    analyzer.fromDate &&
    analyzer.toDate &&
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
      <DataViewBearishTrend arrayDatesPrices={arrayDatesPrices} />
      <DataViewHighestVolume arrayDatesVolumes={arrayDatesVolumes} />
      <DataViewBestBuySell arrayDatesPrices={arrayDatesPrices} />
    </div>)
}

export default DataView