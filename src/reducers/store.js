import { combineReducers, createStore } from 'redux'
import analyzerReducer from './analyzerReducer'
import errorReducer from './errorReducer'


const reducer = combineReducers({
  analyzer: analyzerReducer,
  error: errorReducer
})

const store = createStore(reducer)

export default store