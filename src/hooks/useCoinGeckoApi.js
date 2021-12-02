import { useEffect, useState } from "react"
/**
 * 
 * !!DELETE THIS!!
 * in the end if not needed
 */

/**
 * To fetch from Coin Gecko Api. It has base of the url and
 * the end path must be added, whatever data is needed from the API.
 * Use the list https://www.coingecko.com/en/api/documentation to add
 * whatever you want fetched.
 * @param {string} path 
 * @returns {object} data - object containing the fetch data
 * @returns {boolean} loading
 * @returns {object} error - object containing the fetch error
 * @returns {function} fetchData - function to fire the fetch
 */
const useCoinGeckoApi = (path) => {
  const [ data, setData ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState();
  const [ fetchDataNow, setFetchDataNow ] = useState(false);

  useEffect(() => {
    if (fetchDataNow) {
      fetch(`${path}`)
        .then(response => response.json())
        .then(responseJson => console.log(responseJson))
        .catch(error => console.log(error))
        .finally(() => {
          setLoading(false);
          setFetchDataNow(false)
        })
    }  
  }, [fetchDataNow, path])
  
  // To fire the fetch when needed when hook is used
  const fetchData = () => {
    setFetchDataNow(true)
  }

  return { data, loading, error, fetchData }
}

export { useCoinGeckoApi}