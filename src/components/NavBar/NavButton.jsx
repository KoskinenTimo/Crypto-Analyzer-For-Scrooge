import React from 'react'
import { useNavigate } from 'react-router-dom'


const NavButton = ({ text }) => {
  const navigate = useNavigate()
  return (
    <button className="header-navbar-button" onClick={() => navigate(text.toLowerCase())}>
      {text}
    </button>
  )
}

export default NavButton