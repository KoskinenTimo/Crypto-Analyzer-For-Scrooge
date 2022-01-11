import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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

  const handleLogin = () => {
    navigate('/login')
  }

  const handleLogout = () => {
    navigate('/logout')
  }

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