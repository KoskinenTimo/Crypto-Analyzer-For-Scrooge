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
import NavBarCntr from './components/NavBar/NavBarCntr'
import AnalyzerCntr from './components/Analyzer/AnalyzerCntr'
import LoginFormCntr from './components/Login/LoginFormCntr'
import Logout from './components/Logout'
import SignUpFormCntr from './components/SignUp/SignUpFormCntr'
import HomeCntr from './components/Home/HomeCntr'
import ProfileContainer from './components/Profile/ProfileContainer'
import MarketCntr from './components/Market/MarketCntr'
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
      <NavBarCntr />
      <Notification />
      <Routes>
        <Route exact path='/' element={<HomeCntr />}/>
        <Route path='/authenticate' element={<Authenticate />}/>
        <Route path='/home' element={<HomeCntr />}/>
        <Route path='/signup' element={<SignUpFormCntr />}/>
        <Route path='/analyzer' element={<AnalyzerCntr />}/>
        <Route path='/login' element={<LoginFormCntr />} />
        <Route path='/logout' element={<Logout />}/>
        <Route path='/profile' element={<PR><ProfileContainer /></PR>}/>
        <Route path='/market' element={<MarketCntr />}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
