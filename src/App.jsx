import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

// Components
import Header from './components/Header'
import ErrorMessage from './components/ErrorMessage'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import AnalyzerContainer from './components/AnalyzerContainer'
import LoginForm from './components/LoginForm'


function App() {

  return (
    <Router>
      <div className="wrapper">
        <Header />
        <NavBar />
        <ErrorMessage />
        <Routes>
          <Route path="/analyzer" element={<AnalyzerContainer />}/>
          <Route path="/login" element={<LoginForm />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
