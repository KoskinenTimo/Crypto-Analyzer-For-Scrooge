import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


/**
 * Header login bar to display log in and signup options if the user is not already logged
 * in and log out if the user is logged in.
 */
const LoginBar = () => {
  const authUser = useSelector(state => state.authUser)
  const [ login, setLogin ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (authUser) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [authUser])

  /**
   * Click moves to log in form page
   */
  const handleLogin = () => {
    navigate('/login')
  }

  /**
   * Click moves to log out logic page
   */
  const handleLogout = () => {
    navigate('/logout')
  }

  /**
   * Click moves to sign up form page
   */
  const handleSignUp = () => {
    navigate('/signup')
  }

  return (
    <div className="login-bar flex-row">
      {
        login
          ?
          <>
            <h3>Welcome {authUser.username}!</h3>
            <button onClick={() => handleLogout()}>Logout</button>
          </>
          :
          <>
            <button onClick={() => handleLogin()}>Login</button>
            <button onClick={() => handleSignUp()}>Sign up</button>
          </>
      }
    </div>
  )
}

export default LoginBar