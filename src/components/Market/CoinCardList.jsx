import React from 'react'
import CoinCard from './CoinCard'
import './CoinCardList.scss'

/**
 * List component to render all coin cards in Market page
 */
const CoinCardList = ({ data }) => {
  if (data && data.length) {
    return(
      <div className='market-coin-list'>
        {data.map((coinData, index) => <CoinCard data={coinData} key={coinData.id} index={index}/>)}
      </div>
    )
  }
  return <div></div>

}

export default CoinCardList