import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createErrorNotification } from '../../reducers/notificationReducer'
import { getTopMarketData } from '../../services/geckoApiService'
import './MarketCntr.scss'

// Components
import Loading from '../Loading'
import CoinCardList from './CoinCardList'
import NoData from './NoData'

/**
 * Market data page for top 6 coins by market cap
 */
const MarketCntr = () => {
  const dispatch = useDispatch()
  const [ marketData, setMarketData ] = useState('')
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    getTopMarketData()
      .then(res => {
        setMarketData(res.data)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        if (
          err.response &&
          err.response.data &&
          err.response.data.error
        ) {
          dispatch(createErrorNotification(err.response.data.error))
        } else {
          dispatch(createErrorNotification(err.message))
        }
      })
  }, [])

  useEffect(() => {
    return () => setLoading(true)
  }, [])

  if(loading) {
    return (
      <div className="market-cntr">
        <h1 className='market-cntr__title form-title'>Market</h1>
        <Loading />
      </div>
    )
  }
  if (marketData && !loading) {
    return (
      <div>
        <h1 className='market-cntr__title--centered'>Market</h1>
        <CoinCardList data={marketData} />
      </div>
    )
  }
  if (!marketData && !loading) {
    return (
      <div className="market-cntr">
        <h1 className='market-cntr__title form-title'>Market</h1>
        <NoData />
      </div>
    )
  }
}

export default MarketCntr