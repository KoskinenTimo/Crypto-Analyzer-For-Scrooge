import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { createError } from '../reducers/errorReducer'
import { signup } from '../services/userService'

// Components
import TextInput from './Inputs/TextInput'
import SubmitResetButtons from './SubmitResetButtons'


/**
 * This component hold the logic for sign up, new user will be also logged in
 * after a succesfull sign up
 */
const SignUpForm = () => {
  const authUser = useSelector(state => state.authUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ name, setName ] = useState('')

  /**
   * MISSING VALIDATION AND LOGIN AFTER SIGNUP
   * @param {event} e
   */
  const onSubmit = (e) => {
    e.preventDefault()
    signup({ username, password, name })
      .then(res => {
        console.log(res.data)
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
    setName('')
  }

  const handleInput = (target) => {
    switch (target.name) {
    case 'name':
      setName(target.value)
      break
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

  if (authUser) {
    return (
      <Navigate to="/" />
    )
  }
  return (
    <form className='date-form' onSubmit={onSubmit}>
      <TextInput
        title='Name'
        name='name'
        value={name}
        handler={handleInput}
      />
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
      />
      <SubmitResetButtons
        submit='Login'
        cancel='Reset'
        handleReset={onReset}
      />
    </form>
  )
}

export default SignUpForm