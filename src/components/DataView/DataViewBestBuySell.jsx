import React, { useEffect,useState } from 'react'

// Utils
import { parseNumber, parseToDate } from '../../utils/parsers'

/**
 * Used to render the best day to buy and to sell in data
 * @param {props}
 */
const DataViewBestBuySell = ({ arrayDatesPrices }) => {
  // contains best buy and sell dates with profit [ buyDate, sellDate, profit ]
  const [ profitData, setProfitData ] = useState([])

  useEffect(() => {
    if (arrayDatesPrices && arrayDatesPrices.length) {
      const datesAndProfit = getPairBestDayToBuyAndToSell(arrayDatesPrices)
      const parsedBuyDate = parseToDate(datesAndProfit[0])
      const parsedSellDate = parseToDate(datesAndProfit[1])
      const parsedProfit = parseNumber(datesAndProfit[2],false)
      const parsedArray = [ parsedBuyDate, parsedSellDate, parsedProfit ]
      setProfitData(parsedArray)
    }
    if (arrayDatesPrices && !arrayDatesPrices.length) {
      const reset = []
      setProfitData(reset)
    }

  },[arrayDatesPrices])

  /**
   * Takes in data array of [Date, Price] pairs and outputs
   * the most profitable pair of Dates, in other words, when to
   * buy cheap and when to sell with most profit. Returns an
   * array [ bestDateToBuy, bestDateToSell, profit ]
   * @param {[number[]]} arrayOfDatesWithPrice
   * @returns {number[]}
   */
  const getPairBestDayToBuyAndToSell = (arrayOfDatesWithPrice) => {
    return arrayOfDatesWithPrice
      // take last day out, no sell date possible
      .slice(0,-1)
      // create new array that matches all dates of the initial array with the best
      // dates ahead to sell, profit included [..., [buyDate,bestSellDate,profit], ...]
      .map((dateWithPrice, index) => {
        const arrayOfDatesAhead = arrayOfDatesWithPrice.slice(index+1)
        let bestDayToSellWithPrice
        if (arrayOfDatesAhead.length > 1) {
          bestDayToSellWithPrice = arrayOfDatesAhead
            .reduce((previousValue,currentValue) => {
              const previousDateHigherPrice = previousValue[1] > currentValue[1]
              return previousDateHigherPrice ? previousValue : currentValue
            })
        } else {
          bestDayToSellWithPrice = arrayOfDatesAhead[0]
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

  if (profitData && profitData.length) {
    return (
      <div className="data-card">
        <h4>Best day to buy and sell</h4>
        {
          // if profit
          parseFloat(profitData[2]) > 0
            ?
            <p>
          Best day to buy {profitData[0]} and best to sell {profitData[1]},
          profit {profitData[2]}€ per coin.
            </p>
            :
            <p>
          Between {profitData[0]} and {profitData[1]}, there are no dates
          to make profit.
            </p>
        }
      </div>
    )
  }
  return(<div></div>)

}

export default DataViewBestBuySell