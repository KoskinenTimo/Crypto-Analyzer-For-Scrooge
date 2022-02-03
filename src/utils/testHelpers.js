import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { combineReducers, createStore } from 'redux'
import analyzerReducer from '../reducers/analyzerReducer'
import notificationReducer from '../reducers/notificationReducer'
import userReducer from '../reducers/userReducer'
import bearishTrendReducer from '../reducers/bearishTrendReducer'
import bestBuySellReducer from '../reducers/bestBuySellReducer'
import highestVolumeReducer from '../reducers/highestVolumeReducer'
import { Provider } from 'react-redux'
import React from 'react'

export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: BrowserRouter })
}

export function createTestStore(initialState = {}) {
  const reducer = combineReducers({
    analyzer: analyzerReducer,
    notification: notificationReducer,
    authUser: userReducer,
    bearishTrend: bearishTrendReducer,
    bestBuySell: bestBuySellReducer,
    highestVolume: highestVolumeReducer
  })
  const store = createStore(
    reducer,
    initialState,
  )
  const origDispatch = store.dispatch
  store.dispatch = jest.fn(origDispatch)
  return store
}

export const renderWithStore = (
  ui,
  store
) => {

  const testNode = render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  )
  return testNode
}