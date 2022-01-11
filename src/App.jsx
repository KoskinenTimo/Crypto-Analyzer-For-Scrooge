import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'

// Components
import Header from './components/Header'
import ErrorMessage from './components/ErrorMessage'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import AnalyzerContainer from './components/AnalyzerContainer'
import LoginForm from './components/LoginForm'
import { loginUser } from './reducers/userReducer'
import Logout from './components/Logout'
import SignUpForm from './components/SignUpForm'


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (Cookies.get('authUser')) {
      const authUser = JSON.parse(Cookies.get('authUser'))
      dispatch(loginUser(authUser))
    }
  }, [])

  return (
    <Router>
      <div className="wrapper">
        <Header />
        <NavBar />
        <ErrorMessage />
        <Routes>
          <Route path="/signup" element={<SignUpForm />}/>
          <Route path="/analyzer" element={<AnalyzerContainer />}/>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />}/>
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
