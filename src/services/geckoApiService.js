import {
  coinGeckoBaseUrl
} from '../utils/constants/apiPaths'

//
// Not using fetch or axios on purpose to showcase the use of ajax
//

/**
 * Gets json format data from the requested url
 * @param {string} url
 * @returns  {promise}
 */
const getJSON = (url) => {
  return new Promise((resolve,reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = function() {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText)
        resolve(data)
      }
      else {
        reject( Error('There was an error loading data'))
      }
    }
    xhr.onerror = () => reject( Error('There was an error loading data'))
    xhr.send()
  })
}

/**
 * Currently only handles bitcoin vs eur, can be modified easily to fetch other values
 * @param {number} fromDate
 * @param {number} toDate
 * @returns {response object}
 */
export const getBitcoinChartRange = async (fromDate,toDate) => {
  return await getJSON(`${coinGeckoBaseUrl}/coins/bitcoin/market_chart/range?vs_currency=eur&from=${fromDate}&to=${toDate}`)
}
