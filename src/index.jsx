import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store from './reducers/store'

// CSS styles
import './css/reset.css'
import './css/index.css'


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)