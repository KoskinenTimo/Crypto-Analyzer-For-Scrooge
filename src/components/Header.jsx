import React from 'react'

// Components
import LoginBar from './LoginBar'


const Header = () => {
  return(
    <header className="flex-row-space-btw">
      <h1>Cryptocurrency Analyzer</h1>
      <LoginBar />
    </header>
  )
}

export default Header