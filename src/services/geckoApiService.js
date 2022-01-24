import {
  coinGeckoBaseUrl
} from '../utils/apiPaths'
import axios from 'axios'

/**
 * Gets coin data vs 'real' currency
 * @param {number} fromDate
 * @param {number} toDate
 * @returns {response object}
 */
export const getCoinChartRange = async (fromDate,toDate,coin,currency) => {
  return await axios(`${coinGeckoBaseUrl}/coins/${coin}/market_chart/range?vs_currency=${currency}&from=${fromDate}&to=${toDate}`)
}

/**
 * Used to get market data for top 5 coins
 * @returns {response object}
 */
export const getTopMarketData = async () => {
  return await axios(`${coinGeckoBaseUrl}/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=6&page=1&sparkline=false`)
}