const initialState = {
  fromDate: '',
  toDate: '',
  coin: '',
  currency: ''
}

const analyzerReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_SEARCH':
    return state = action.data
  case 'RESET_SEARCH':
    return state = initialState
  default:
    return state
  }
}


export const createSearch = (content) => {
  if (content.currency === 'eur') {
    content.symbol = '€'
  } else if (content.currency === 'usd') {
    content.symbol = '$'
  } else if (content.currency === 'gbp') {
    content.symbol = '£'
  } else {
    content.symbol = content.currency
  }
  return {
    type: 'NEW_SEARCH',
    data: content
  }
}

export const resetSearch = () => {
  return {
    type: 'RESET_SEARCH'
  }
}

export default analyzerReducer