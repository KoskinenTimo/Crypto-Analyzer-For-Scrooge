const initialState = []

const bestBuySellReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_BEST_BUY_SELL':
    return state = action.data
  case 'RESET_BEST_BUY_SELL':
    return state = initialState
  default:
    return state
  }
}

export const createBestBuySell = (content) => {
  const buyAndSellDates = getPairBestDayToBuyAndToSell(content)
  return {
    type: 'NEW_BEST_BUY_SELL',
    data: buyAndSellDates
  }
}

export const resetBestBuySell = () => {
  return {
    type: 'RESET_BEST_BUY_SELL'
  }
}

/**
   * Takes in data array of [Date, Price] pairs and outputs
   * the most profitable pair of Dates, in other words, when to
   * buy cheap and when to sell with most profit. Returns an
   * array [ bestDateToBuy, bestDateToSell, profit ]
   * @param {[number[]]} arrayOfDatesWithPrice
   * @returns {number[]}
   */
const getPairBestDayToBuyAndToSell = (arrayOfDatesWithPrice) => {
  return arrayOfDatesWithPrice
  // take last day out, no sell date possible
    .slice(0,-1)
  // create new array that matches all dates of the initial array with the best
  // dates ahead to sell, profit included [..., [buyDate,bestSellDate,profit], ...]
    .map((dateWithPrice, index) => {
      const arrayOfDatesAhead = arrayOfDatesWithPrice.slice(index+1)
      let bestDayToSellWithPrice
      if (arrayOfDatesAhead.length > 1) {
        bestDayToSellWithPrice = arrayOfDatesAhead
          .reduce((previousValue,currentValue) => {
            const previousDateHigherPrice = previousValue[1] > currentValue[1]
            return previousDateHigherPrice ? previousValue : currentValue
          })
      } else {
        bestDayToSellWithPrice = arrayOfDatesAhead[0]
      }
      const profit = bestDayToSellWithPrice[1] - dateWithPrice[1]
      return [ dateWithPrice[0], bestDayToSellWithPrice[0], profit ]
    })
  // get a pair of buy and sell dates of which gives the most profit(the least loss)
    .reduce((previousPair,currentPair) => {
      const previousPairProfitHigher = previousPair[2] > currentPair[2]
      return previousPairProfitHigher ? previousPair : currentPair
    })
}


export default bestBuySellReducer