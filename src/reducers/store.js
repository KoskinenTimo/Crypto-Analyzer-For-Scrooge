import { combineReducers, createStore } from 'redux'
import analyzerReducer from './analyzerReducer'
import bearishTrendReducer from './bearishTrendReducer'
import bestBuySellReducer from './bestBuySellReducer'
import highestVolumeReducer from './highestVolumeReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'


const reducer = combineReducers({
  analyzer: analyzerReducer,
  notification: notificationReducer,
  authUser: userReducer,
  bearishTrend: bearishTrendReducer,
  bestBuySell: bestBuySellReducer,
  highestVolume: highestVolumeReducer
})

// Selectors
export const selectUser = state => state.authUser

const store = createStore(reducer)

export default store