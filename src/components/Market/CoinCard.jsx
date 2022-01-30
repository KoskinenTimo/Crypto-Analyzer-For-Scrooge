import React from 'react'
import { parseNumber } from '../../utils/parsers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowCircleDown,
  faArrowAltCircleUp,
  faArrowAltCircleRight
} from '@fortawesome/free-solid-svg-icons'
import './CoinCard.scss'

const CoinCard = ({
  data,
  index
}) => {

  /**
   * Tracks price change value and renders correct arrow after the
   * value to visualize the trend
   */
  const renderArrow = (value) => {
    if (value < 0) {
      return <FontAwesomeIcon icon={faArrowCircleDown} color='#fe5e50' size='lg'/>
    }
    if (value > 0) {
      return <FontAwesomeIcon icon={faArrowAltCircleUp} color='#50fe5e' size='lg'/>
    }
    return <FontAwesomeIcon icon={faArrowAltCircleRight} color='grey' size='lg'/>
  }

  return(
    <div className="market-card">
      <h4 className='market-card__title'>{index + 1}. {data.name}</h4>
      <p className='market-card__txt'>Market Cap: {parseNumber(data.market_cap)}€</p>
      <p className='market-card__txt'>Price Per Coin: {parseNumber(data.current_price)}€</p>
      <p className='market-card__txt'>Price Change 24h: {parseNumber(data.price_change_24h)}€ {renderArrow(data.price_change_24h)}</p>
      <p className='market-card__txt'>Total Volume: {parseNumber(data.total_volume)}€</p>
      <p className='market-card__txt'>Total Supply: {data.total_supply}</p>
      <p className='market-card__txt'>Last Updated: {new Date(data.last_updated).toUTCString()}</p>
    </div>

  )
}
export default CoinCard