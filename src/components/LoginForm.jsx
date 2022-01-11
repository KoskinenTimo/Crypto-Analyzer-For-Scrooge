import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../reducers/userReducer'
import { login } from '../services/loginService'
import SubmitResetButtons from './SubmitResetButtons'


const LoginForm = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    login({ username, password })
      .then(res => {
        const authDetails = res.data
        Cookies.set('authUser', JSON.stringify(authDetails),{ expires: 1 })
        dispatch(loginUser(authDetails))
        onReset()
        navigate('/home')
      })
      .catch(err => console.log(err))
  }

  const onReset = () => {
    setUsername('')
    setPassword('')
  }

  return (
    <form className='date-form' onSubmit={onSubmit}>
      <label className="input-label">
        <label>Username</label>
        <input className="form-input"
          name='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      <label className="input-label">
        <label>Password</label>
        <input
          className="form-input"
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
      </label>
      <SubmitResetButtons
        submit='Login'
        cancel='Reset'
        handleReset={onReset}
      />
    </form>
  )
}

export default LoginForm