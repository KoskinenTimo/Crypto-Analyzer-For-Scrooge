import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavButton.scss'

/**
 * Header navigation bar button
 */
const NavButton = ({ text }) => {
  return (
    <NavLink
      to={`${text.toLowerCase()}`}
      className={({ isActive }) => (isActive ? 'header-nav__button--active' : 'header-nav__button')}
    >
      {text}
    </NavLink>
  )
}

export default NavButton