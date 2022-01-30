import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetBestBuySell } from '../../reducers/bestBuySellReducer'
import { parseNumber, parseToDate } from '../../utils/parsers'
import './DataViewBestBuySell.scss'

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
  },[datesAndProfit])

  useEffect(() => {
    return () => {
      const reset = []
      setProfitData(reset)
      dispatch(resetBestBuySell())
    }
  }, [])

  if (profitData.length) {
    return (
      <div className="dv-buysell-card">
        <h4 className='dv-buysell-card__title'>Best day to buy and sell</h4>
        {
          // if profit
          parseFloat(profitData[2]) > 0
            ?
            <p className='dv-buysell-card__txt'>
          Best day to buy {profitData[0]} and best to sell {profitData[1]},
          profit {profitData[2]}{c} per coin.
            </p>
            :
            <p className='dv-buysell-card__txt'>
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