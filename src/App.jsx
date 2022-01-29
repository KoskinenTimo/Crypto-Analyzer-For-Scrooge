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
import AnalyzerCntr from './components/Analyzer/AnalyzerCntr'
import LoginFormCntr from './components/Login/LoginFormCntr'
import Logout from './components/Logout'
import SignUpFormCntr from './components/SignUp/SignUpFormCntr'
import Home from './components/Home'
import ProfileContainer from './components/Profile/ProfileContainer'
import MarketContainer from './components/Market/MarketContainer'
import Authenticate from './components/Authenticate'
import PR from './components/PrivateRoute' // Private Route Wrapper

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
        <Route path='/signup' element={<SignUpFormCntr />}/>
        <Route path='/analyzer' element={<AnalyzerCntr />}/>
        <Route path='/login' element={<LoginFormCntr />} />
        <Route path='/logout' element={<Logout />}/>
        <Route path='/profile' element={<PR><ProfileContainer /></PR>}/>
        <Route path='/market' element={<MarketContainer />}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
