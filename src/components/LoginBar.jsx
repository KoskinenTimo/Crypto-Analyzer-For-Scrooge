import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginBar = () => {
  const [ login ] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  const handleLogout = () => {
    navigate('/logout')
  }

  return (
    <div className="login-bar flex-row">
      {
        login
          ?
          <>
            <h3>Welcome user!</h3>
            <button onClick={() => handleLogout()}>Logout</button>
          </>
          :
          <button onClick={() => handleLogin()}>Login</button>
      }
    </div>
  )
}

export default LoginBar