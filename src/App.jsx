import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { checkToken } from './services/loginService'
import { loginUser } from './reducers/userReducer'

// Components
import Header from './components/Header'
import Notification from './components/Notification'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import AnalyzerContainer from './components/AnalyzerContainer'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import SignUpForm from './components/SignUpForm'
import Home from './components/Home'
import Profile from './components/Profile'
import MarketContainer from './components/Market/MarketContainer'
import { createErrorNotification } from './reducers/notificationReducer'


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (Cookies.get('authUser')) {
      const authUser = JSON.parse(Cookies.get('authUser'))
      checkToken(authUser.token)
        .then(() => {
          dispatch(loginUser(authUser))
        })
        .catch(err => {
          if (
            err.response &&
            err.response.status &&
            err.response.status === 401
          ) {
            Cookies.remove('authUser')
            dispatch(createErrorNotification('Login token expired or invalid'))
          }
          if (
            err.response &&
            err.response.data &&
            err.response.message
          ) {
            dispatch(createErrorNotification(err.response.message))
          } else {
            dispatch(createErrorNotification(err.message))
          }
        })
    }
  }, [])

  return (
    <Router>
      <div className="wrapper">
        <Header />
        <NavBar />
        <Notification />
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/signup' element={<SignUpForm />}/>
          <Route path='/analyzer' element={<AnalyzerContainer />}/>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/logout' element={<Logout />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/market' element={<MarketContainer />}/>
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
