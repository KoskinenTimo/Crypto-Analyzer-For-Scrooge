const initialState = ''

const bearishTrendReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_BEARISH_TREND':
    return state = action.data
  case 'RESET_BEARISH_TREND':
    return state = initialState
  default:
    return state
  }
}

export const createBearishTrend = (content) => {
  const trend = getLongestBearishTrend(content)
  return {
    type: 'NEW_BEARISH_TREND',
    data: trend
  }
}

export const resetBearishTrend = () => {
  return {
    type: 'RESET_BEARISH_TREND'
  }
}

/**
   * Takes in an array of [...,[date,price],...]
   * and loops over the array to check the longest
   * downward trend of prices
   * @param {[number[]]} arrayOfDatesWithPrice
   * @returns {number} days
   */
const getLongestBearishTrend = (arrayOfDatesWithPrice) => {
  let trendNumber = 0
  const trendArray = arrayOfDatesWithPrice
  // turns array into trend count and resets count when price goes up next day
    .map((dateWithPrice,index,array) => {
      if (index === 0) return trendNumber
      const previousDateWithPrice = array[index-1]
      const previousPrice = previousDateWithPrice[1]
      const currentPrice = dateWithPrice[1]
      const bearishTrend = currentPrice < previousPrice
      if(!bearishTrend) {
        trendNumber = 0
        return trendNumber
      }
      trendNumber++
      return trendNumber
    })
  return Math.max(...trendArray)
}

export default bearishTrendReducer