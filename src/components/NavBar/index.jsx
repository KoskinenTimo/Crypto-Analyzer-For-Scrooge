import React from 'react'
import NavButton from './NavButton'


const NavBar = () => {
  return (
    <div className="header-navbar flex-row">
      <NavButton text={'Home'}/>
      <NavButton text={'Profile'}/>
      <NavButton text={'Analyzer'}/>
    </div>
  )

}

export default NavBar