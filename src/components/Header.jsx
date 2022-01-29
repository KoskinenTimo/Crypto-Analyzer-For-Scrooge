import React from 'react'
import './Header.scss'

// Components
import LoginBar from './LoginBar'

const Header = () => {
  return(
    <header className='header'>
      <h1 className='header__title'>Cryptocurrency Analyzer</h1>
      <LoginBar />
    </header>
  )
}

export default Header