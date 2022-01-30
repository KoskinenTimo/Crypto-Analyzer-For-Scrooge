import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetBearishTrend } from '../../reducers/bearishTrendReducer'
import { parseToDate } from '../../utils/parsers'
import { coins } from '../../utils/constants'
import './DataViewBearishTrend.scss'

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
  }, [analyzer])

  useEffect(() => {
    return () => {
      const reset = []
      dispatch(resetBearishTrend())
      setDates(reset)
      setCoinName('')
    }
  }, [])

  // Handles setting correct coin name
  useEffect(() => {
    if (analyzer && analyzer.coin) {
      const foundCoin = coins.find(coin => coin.id === analyzer.coin)
      setCoinName(foundCoin.name)
    }
  }, [analyzer])

  if (bearishTrend) {
    return (
      <div className="dv-bearish-card">
        <h4 className='dv-bearish-card__title'>Longest bearish trend</h4>
        <p className='dv-bearish-card__txt'>
          In {coinName}’s historical data from CoinGecko, the price decreased {bearishTrend} days in a row for the
          inputs from {dates[0]} and {dates[1]}.
        </p>
      </div>
    )
  }
  return(<div></div>)
}

export default DataViewBearishTrend