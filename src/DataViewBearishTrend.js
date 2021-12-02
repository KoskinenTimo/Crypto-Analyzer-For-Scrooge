import React from "react"
import { useEffect, useState } from "react/cjs/react.development"

/**
 * Used to render bearish trend data
 * @param {props}
 */
const DataViewBearishTrend = ({ arrayOfDatesWithPrices }) => {
  const [ longestBearishTrend, setLongestBearishTrend ] = useState('')

  useEffect(() => {    
    if(!arrayOfDatesWithPrices || !arrayOfDatesWithPrices.length) return
    const longestTrend = getLongestBearishTrend(arrayOfDatesWithPrices)
    setLongestBearishTrend(longestTrend)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayOfDatesWithPrices])

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
  return (
    <div>
      <h3>
        In bitcoin’s historical data from CoinGecko, the price decreased {longestBearishTrend} days in a row for the
        inputs from DATE and DATE.
      </h3>
    </div>
  )
}

export default DataViewBearishTrend;