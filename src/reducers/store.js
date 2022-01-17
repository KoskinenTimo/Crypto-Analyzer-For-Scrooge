import { combineReducers, createStore } from 'redux'
import analyzerReducer from './analyzerReducer'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'


const reducer = combineReducers({
  analyzer: analyzerReducer,
  notification: notificationReducer,
  authUser: userReducer
})

const store = createStore(reducer)

export default store