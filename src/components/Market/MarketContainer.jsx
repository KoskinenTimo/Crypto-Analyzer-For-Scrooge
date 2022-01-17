import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createErrorNotification } from '../../reducers/notificationReducer'
import { getTopMarketData } from '../../services/geckoApiService'

// Components
import Loading from '../Loading'
import CoinCardList from './CoinCardList'
import NoData from './NoData'


/**
 * Market data page for top 5 coins by market cap
 */
const MarketContainer = () => {
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
      <div className="dataview-container">
        <h1 className='form-title'>Market</h1>
        <Loading />
      </div>
    )
  }
  if (marketData && !loading) {
    return (
      <div className="dataview-container">
        <h1 className='form-title'>Market</h1>
        <CoinCardList data={marketData} />
      </div>
    )
  }
  if (!marketData && !loading) {
    return (
      <div className="dataview-container">
        <h1 className='form-title'>Market</h1>
        <NoData />
      </div>
    )
  }
}

export default MarketContainer