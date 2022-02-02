import React from 'react'
import { useSelector } from 'react-redux'
import NavButton from './NavButton'
import './NavBarCntr.scss'
import { selectUser } from '../../reducers/store'

/**
 * Header navigation bar for main site navigation
 */
const NavBarCntr = () => {
  const user = useSelector(selectUser)

  return (
    <nav className='header-nav'>
      <NavButton text={'Home'}/>
      <NavButton text={'Market'}/>
      <NavButton text={'Analyzer'}/>
      {
        user ?
          <NavButton text={'Profile'}/> :
          ''
      }
    </nav>
  )
}

export default NavBarCntr