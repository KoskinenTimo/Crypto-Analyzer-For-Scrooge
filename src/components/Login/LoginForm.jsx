import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProcessNotification } from '../../reducers/notificationReducer'
import './LoginForm.scss'

// Components
import TextInput from '../Inputs/TextInput'
import ResetButton from '../Buttons/ResetButton'
import SubmitButton from '../Buttons/SubmitButton'

/**
 * User log in form, succesful log in set 1 hour persistent token cookie
 */
const LoginForm = ({ submitData }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      handleReset()
    }
  }, [])

  /**
   * Submit for the login form, sets a cookie for 1 hour persistent log in
   * @param {event} e
   */
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createProcessNotification('Logging in...'))
    submitData(username, password)
  }

  /**
   * Reset form fields
   */
  const handleReset = () => {
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
    <form className='login-form' onSubmit={onSubmit}>
      <h3 className='login-form__title'>Login</h3>
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
      <div>
        <SubmitButton submit='Login' />
        <ResetButton cancel='Reset' handleReset={handleReset} />
      </div>
    </form>
  )
}

export default LoginForm