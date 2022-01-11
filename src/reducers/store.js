import { combineReducers, createStore } from 'redux'
import analyzerReducer from './analyzerReducer'
import errorReducer from './errorReducer'
import userReducer from './userReducer'


const reducer = combineReducers({
  analyzer: analyzerReducer,
  error: errorReducer,
  authUser: userReducer
})

const store = createStore(reducer)

export default store