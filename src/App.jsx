import React, { useEffect } from 'react'
import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'
import Cookies from 'js-cookie'

// Components
import Header from './components/Header'
import Notification from './components/Notification'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import AnalyzerContainer from './components/Analyzer/AnalyzerContainer'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import SignUpForm from './components/SignUpForm'
import Home from './components/Home'
import ProfileContainer from './components/Profile/ProfileContainer'
import MarketContainer from './components/Market/MarketContainer'
import Forbidden from './components/Forbidden'
import Authenticate from './components/Authenticate'
import PR from './components/PrivateRoute'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    if (Cookies.get('authUser')) {
      navigate('/authenticate')
    }
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <NavBar />
      <Notification />
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='/authenticate' element={<Authenticate />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/signup' element={<SignUpForm />}/>
        <Route path='/analyzer' element={<AnalyzerContainer />}/>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/logout' element={<Logout />}/>
        <Route path='/profile' element={<PR><ProfileContainer /></PR>}/>
        <Route path='/market' element={<MarketContainer />}/>
        <Route path='/forbidden' element={<Forbidden />}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
