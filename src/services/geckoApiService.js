import {
  coinGeckoBaseUrl
} from '../utils/apiPaths'

import axios from 'axios'

// /**
//  * Gets json format data from the requested url
//  * @param {string} url
//  * @returns  {promise}
//  */
// const getJSON = (url) => {
//   return new Promise((resolve,reject) => {
//     let xhr = new XMLHttpRequest()
//     xhr.open('GET', url)
//     xhr.onload = function() {
//       if (xhr.status === 200) {
//         let data = JSON.parse(xhr.responseText)
//         resolve(data)
//       }
//       else {
//         reject( Error('There was an error loading data'))
//       }
//     }
//     xhr.onerror = () => reject( Error('There was an error loading data'))
//     xhr.send()
//   })
// }

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
  return await axios(`${coinGeckoBaseUrl}/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=5&page=1&sparkline=false`)
}