import {
  coinGeckoBaseUrl,
} from '../constants/apiPaths'

const getJSON = (url) => {
  return new Promise((resolve,reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        resolve(data);
      } else {
        reject( Error(xhr.statusText));
      }
    }; 
    xhr.onerror = () => reject( Error(`${xhr.responseText}, status:${xhr.status}`));
    xhr.send();
  });  
}
export const getBitcoinChartRange = async (fromDate,toDate) => {
  console.log(fromDate,toDate);
  return await getJSON(`${coinGeckoBaseUrl}/coins/bitcoin/market_chart/range?vs_currency=eur&from=${fromDate}&to=${toDate}`)
}
