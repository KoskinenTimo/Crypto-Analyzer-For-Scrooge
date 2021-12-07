import React, { useState } from 'react'


const LoginBar = () => {
  const [ login, setLogin ] = useState(true)

  return (
    <div className="login-bar flex-row">
      {
        login
          ?
          <>
            <h3>Welcome user!</h3>
            <button onClick={() => setLogin(false)}>Logout</button>
          </>
          :
          <button onClick={() => setLogin(true)}>Login</button>
      }
    </div>
  )
}

export default LoginBar