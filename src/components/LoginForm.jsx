import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createErrorNotification, createProcessNotification, createSuccessNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import { login } from '../services/loginService'
import TextInput from './Inputs/TextInput'
import SubmitResetButtons from './SubmitResetButtons'


/**
 * User log in form, succesful log in set 1 hour persistent token cookie
 */
const LoginForm = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /**
   * Submit for the login form, sets a cookie for 1 hour persistent log in
   * @param {event} e
   */
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createProcessNotification('Logging in...'))
    login({ username, password })
      .then(res => {
        const authDetails = res.data
        Cookies.set('authUser', JSON.stringify(authDetails),{ expires: 1 })
        dispatch(loginUser(authDetails))
        onReset()
        dispatch(createSuccessNotification('Logged in'))
        navigate('/home')
      })
      .catch(err => {
        dispatch(createErrorNotification(err.response.data.error))
      })
  }

  /**
   * Reset form fields
   */
  const onReset = () => {
    setUsername('')
    setPassword('')
  }

  /**
   * Handles the log in form input states
   * @param {event object property} target
   */
  const handleInput = (target) => {
    switch (target.name) {
    case 'username':
      setUsername(target.value)
      break
    case 'password':
      setPassword(target.value)
      break
    default:
      break
    }
  }

  return (
    <form className='form' onSubmit={onSubmit}>
      <h3 className='form-title'>Login</h3>
      <TextInput
        title='Username'
        name='username'
        maxLength={15}
        value={username}
        handler={handleInput}
      />
      <TextInput
        title='Password'
        name='password'
        value={password}
        handler={handleInput}
        type='password'
      />
      <SubmitResetButtons
        submit='Login'
        cancel='Reset'
        handleReset={onReset}
      />
    </form>
  )
}

export default LoginForm