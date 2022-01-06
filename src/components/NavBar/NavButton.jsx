import React from 'react'
import { Link } from 'react-router-dom'


const NavButton = ({ text }) => {
  return (
    <Link className="header-navbar-button" to={text.toLowerCase()}>
      {text}
    </Link>
  )
}

export default NavButton