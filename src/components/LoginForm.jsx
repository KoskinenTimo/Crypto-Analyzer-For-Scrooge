import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createError } from '../reducers/errorReducer'
import { loginUser } from '../reducers/userReducer'
import { login } from '../services/loginService'
import TextInput from './Inputs/TextInput'
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
      .catch(err => {
        dispatch(createError(err.response.data.error))
      })
  }

  const onReset = () => {
    setUsername('')
    setPassword('')
  }

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
    <form className='date-form' onSubmit={onSubmit}>
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