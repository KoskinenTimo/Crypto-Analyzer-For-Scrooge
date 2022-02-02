import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectUser } from '../reducers/store'
import './LoginBar.scss'

/**
 * Header login bar to display log in and signup options if the user is not already logged
 * in and log out if the user is logged in.
 */
const LoginBar = () => {
  const authUser = useSelector(selectUser)
  const [ login, setLogin ] = useState(false)
  useEffect(() => {
    if (authUser) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [authUser])

  return (
    <div className="login-bar">
      {
        login
          ?
          <>
            <h3 className='login-bar__title'>Welcome {authUser.username}!</h3>
            <NavLink
              className={({ isActive }) => (isActive ? 'login-bar__button--active' : 'login-bar__button')}
              to={'logout'}
            >
              Log Out
            </NavLink>
          </>
          :
          <>
            <NavLink
              className={({ isActive }) => (isActive ? 'login-bar__button--active' : 'login-bar__button')}
              to={'login'}
            >
              Log In
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'login-bar__button--active' : 'login-bar__button')}
              to={'signup'}
            >
              Sign Up
            </NavLink>
          </>
      }
    </div>
  )
}

export default LoginBar