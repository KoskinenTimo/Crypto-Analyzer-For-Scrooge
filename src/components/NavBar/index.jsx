import React from 'react'
import { useSelector } from 'react-redux'
import NavButton from './NavButton'


/**
 * Header navigation bar for main site navigation
 */
const NavBar = () => {
  const user = useSelector(store => store.authUser)

  return (
    <div className="header-navbar flex-row">
      <NavButton text={'Home'}/>
      <NavButton text={'Market'}/>
      <NavButton text={'Analyzer'}/>
      {
        user ?
          <NavButton text={'Profile'}/> :
          ''
      }
    </div>
  )
}

export default NavBar