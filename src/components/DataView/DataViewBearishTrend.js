import React,{ useEffect, useState } from "react"

// Utils
import { parseToDate } from "../../utils/parsers"

/**
 * Used to render bearish trend data
 * @param {props}
 */
const DataViewBearishTrend = ({ 
  arrayDatesPrices,
  fromDateTimeStamp,
  toDateTimeStamp
}) => {
  const [ longestTrend, setLongestTrend ] = useState('')
  const [ dates, setDates ] = useState([])

  useEffect(() => {    
    if (arrayDatesPrices && arrayDatesPrices.length) {
      const longestTrend = getLongestBearishTrend(arrayDatesPrices)
      setLongestTrend(longestTrend)
      if (
        fromDateTimeStamp &&
        toDateTimeStamp &&
        fromDateTimeStamp !== "" &&
        toDateTimeStamp.length !== ""
        ) {
        const parsedFromDate = parseToDate(fromDateTimeStamp*1000)
        const parsedToDate = parseToDate(toDateTimeStamp*1000)
        setDates([ parsedFromDate,parsedToDate ])
      }
    }
    // reset everything when dates are reset
    if(arrayDatesPrices && !arrayDatesPrices.length) {
      const reset = []
      setLongestTrend('')
      setDates(reset)
    }
  }, [arrayDatesPrices,fromDateTimeStamp,toDateTimeStamp])

  /**
   * 
   * @param {[number[]]} arrayOfDatesWithPrice 
   * @returns 
   */
  const getLongestBearishTrend = (arrayOfDatesWithPrice) => {
    let trendNumber = 0
    const trendArray = arrayOfDatesWithPrice
      // turns array into trend count and resets count when price goes up next day
      .map((dateWithPrice,index,array) => {
        if (index === 0) return trendNumber
        const previousDateWithPrice = array[index-1]
        const previousPrice = previousDateWithPrice[1]
        const currentPrice = dateWithPrice[1]
        const bearishTrend = currentPrice < previousPrice
        if(!bearishTrend) {
          trendNumber = 0
          return trendNumber
        }
        trendNumber++
        return trendNumber        
      })
    return Math.max(...trendArray)
  }

  if (longestTrend && longestTrend !== '') {
    return (
      <div className="data-card">
        <h4>Longest bearish trend</h4>
        <p>
          In bitcoin’s historical data from CoinGecko, the price decreased {longestTrend} days in a row for the
          inputs from {dates[0]} and {dates[1]}.
        </p>
      </div>
    )
  }
  return(<div></div>)
}

export default DataViewBearishTrend;