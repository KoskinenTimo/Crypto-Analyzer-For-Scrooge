import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store from './reducers/store'

// CSS styles
import './css/index.css'
import './scss/Reset.scss'
import './scss/Base.scss'


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)