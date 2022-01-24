import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetBestBuySell } from '../../reducers/bestBuySellReducer'

// Utils
import { parseNumber, parseToDate } from '../../utils/parsers'

/**
 * Used to render the best day to buy and to sell in data
 * @param {props}
 */
const DataViewBestBuySell = () => {
  const [ profitData, setProfitData ] = useState([]) // [ buyDate, sellDate, profit ]
  const c = useSelector(state => state.analyzer.symbol) // Currency symbol
  const datesAndProfit = useSelector(state => state.bestBuySell)
  const dispatch = useDispatch()

  useEffect(() => {
    if (datesAndProfit.length) {
      const parsedBuyDate = parseToDate(datesAndProfit[0])
      const parsedSellDate = parseToDate(datesAndProfit[1])
      const parsedProfit = parseNumber(datesAndProfit[2],false)
      const parsedArray = [ parsedBuyDate, parsedSellDate, parsedProfit ]
      setProfitData(parsedArray)
    }
    // Reset on unmount
    return () => {
      const reset = []
      setProfitData(reset)
      dispatch(resetBestBuySell())
    }
  },[datesAndProfit])

  if (profitData.length) {
    return (
      <div className="data-card">
        <h4>Best day to buy and sell</h4>
        {
          // if profit
          parseFloat(profitData[2]) > 0
            ?
            <p>
          Best day to buy {profitData[0]} and best to sell {profitData[1]},
          profit {profitData[2]}{c} per coin.
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