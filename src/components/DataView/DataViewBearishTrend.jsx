import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetBearishTrend } from '../../reducers/bearishTrendReducer'

// Utils
import { parseToDate } from '../../utils/parsers'
import { coins } from '../../utils/constants'



/**
 * Used to render bearish trend data
 * @param {props}
 */
const DataViewBearishTrend = () => {
  const analyzer = useSelector(state => state.analyzer)
  const bearishTrend = useSelector(state => state.bearishTrend)
  const dispatch = useDispatch()
  const [ dates, setDates ] = useState([])
  const [ coinName, setCoinName ] = useState('')

  useEffect(() => {
    const parsedFromDate = parseToDate(analyzer.fromDate*1000)
    const parsedToDate = parseToDate(analyzer.toDate*1000)
    setDates([ parsedFromDate,parsedToDate ])

    // Reset when unmount
    return () => {
      const reset = []
      dispatch(resetBearishTrend())
      setDates(reset)
      setCoinName('')
    }
  }, [analyzer])

  // Handles setting correct coin name
  useEffect(() => {
    if (analyzer && analyzer.coin) {
      const foundCoin = coins.find(coin => coin.id === analyzer.coin)
      setCoinName(foundCoin.name)
    }
  }, [analyzer])

  if (bearishTrend) {
    return (
      <div className="data-card">
        <h4>Longest bearish trend</h4>
        <p>
          In {coinName}’s historical data from CoinGecko, the price decreased {bearishTrend} days in a row for the
          inputs from {dates[0]} and {dates[1]}.
        </p>
      </div>
    )
  }
  return(<div></div>)
}

export default DataViewBearishTrend