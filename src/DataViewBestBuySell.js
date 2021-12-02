import React, { useEffect } from "react"
import { useState } from "react/cjs/react.development"

/**
 * Used to render thebest day to buy and sell in data
 * @param {props}
 */
const DataViewBestBuySell = ({ arrayOfDatesWithPrices }) => {
  const [ bestDateBuySellProfit, setBestDateBuySellProfit ] = useState([])

  useEffect(() => {
    if(!arrayOfDatesWithPrices || !arrayOfDatesWithPrices.length) return
    const newBestDateBuySellProfit = getPairBestDayToBuyAndToSell(arrayOfDatesWithPrices)
    setBestDateBuySellProfit(newBestDateBuySellProfit)
  },[arrayOfDatesWithPrices])

  const getPairBestDayToBuyAndToSell = (arrayOfDatesWithPrice) => {
    return arrayOfDatesWithPrice
      .slice(0,-1)
      // create new array that matches all dates of the initial array with the best  
      // dates ahead to sell, profit included [..., [buyDate,bestSellDate,profit], ...]
      .map((dateWithPrice, index) => { 
        const arrayOfDatesWithPriceAhead = arrayOfDatesWithPrice.slice(index+1)
        let bestDayToSellWithPrice
        if (arrayOfDatesWithPriceAhead.length > 1) {
          bestDayToSellWithPrice = arrayOfDatesWithPriceAhead
            .reduce((previousValue,currentValue) => {
              const previousDateHigherPrice = previousValue[1] > currentValue[1]
              return previousDateHigherPrice ? previousValue : currentValue
            })
        } else {
          bestDayToSellWithPrice = arrayOfDatesWithPriceAhead[0]
        }
        const profit = bestDayToSellWithPrice[1] - dateWithPrice[1]
        return [ dateWithPrice[0], bestDayToSellWithPrice[0], profit ]        
      })
      // get a pair of buy and sell dates of which gives the most profit(the least loss)
      .reduce((previousPair,currentPair) => {
        const previousPairProfitHigher = previousPair[2] > currentPair[2]
        return previousPairProfitHigher ? previousPair : currentPair
      })
  }

  return (
    <div>
      <h3>
        Best day to buy {bestDateBuySellProfit[0]} and best to sell {bestDateBuySellProfit[1]}, 
        profit {bestDateBuySellProfit[2]}€.
      </h3>
    </div>
  )
}

export default DataViewBestBuySell