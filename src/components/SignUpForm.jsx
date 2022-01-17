import Cookies from 'js-cookie'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { createErrorNotification, createProcessNotification, createSuccessNotification, resetNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import { login } from '../services/loginService'
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

  const nameRef = useRef()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const rePasswordRef = useRef()

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ name, setName ] = useState('')
  const [ rePassword, setRePassword ] = useState('')

  /**
   * Handles form submit. Uses input client-side validations before submitting
   * to API. After succesful sign up, logs in the users and redirects to home
   * page.
   * @param {event} e
   */
  const onSubmit = (e) => {
    e.preventDefault()
    if (
      validateName() &&
      validateUsername() &&
      validatePassword() &&
      validateRePassword()
    ) {
      dispatch(resetNotification())
      dispatch(createProcessNotification('Signing up...'))
      signup({ username, password, name })
        .then(() => {
          login({ username, password })
            .then(res => {
              onReset()
              const authDetails = res.data
              Cookies.set('authUser', JSON.stringify(authDetails),{ expires: 1 })
              dispatch(loginUser(authDetails))
              dispatch(createSuccessNotification('Sign Up succesful'))
              navigate('/home')
            })
            .catch(err => {
              dispatch(createErrorNotification(err.response.data.error))
            })
        })
        .catch(err => {
          dispatch(createErrorNotification(err.response.data.error))
        })
    } else {
      dispatch(createErrorNotification('Please check that the input is in correct form'))
    }
  }

  /**
   * Resets all input tracking states and error/valid visuals on the form
   */
  const onReset = () => {
    setUsername('')
    setPassword('')
    setName('')
    setRePassword('')

    // remove all error messages visible in the form
    const validElements = document.getElementById('signup-form').getElementsByClassName('form-input-valid')
    const errorElements = document.getElementById('signup-form').getElementsByClassName('form-input-error')
    const elements = [...validElements, ...errorElements]
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none'
    }
  }

  /**
   * Toggles the valid and error messages when validation is done
   * to give visual feedback for errors in input or when it is correctly
   * formatted
   * @param {DOM element} element
   */
  const toggleValidAndError = (inputElement,valid) => {
    const validElement = inputElement.parentNode.getElementsByClassName('form-input-valid')[0]
    const errorElement = inputElement.parentNode.getElementsByClassName('form-input-error')[0]
    if (valid) {
      validElement.style.display = 'inline-block'
      errorElement.style.display = 'none'
    } else {
      validElement.style.display = 'none'
      errorElement.style.display = 'inline-block'
    }
  }

  /**
   * Input handler for name, realtime validation included
   */
  const handleNameInput = () => {
    setName(nameRef.current.value)
    validateName()
  }

  /**
   * Validator for name input field
   */
  const validateName = () => {
    const name = nameRef.current.value
    if (name.length < 2 || name.length > 20) {
      toggleValidAndError(nameRef.current,false)
      return false
    }
    toggleValidAndError(nameRef.current,true)
    return true
  }

  /**
   * Input handler for username, realtime validation included
   */
  const handleUsernameInput = () => {
    setUsername(usernameRef.current.value)
    validateUsername()
  }

  /**
   * Validator for username input field
   */
  const validateUsername = () => {
    const username = usernameRef.current.value
    if (username.length < 5 || username.length > 15) {
      toggleValidAndError(usernameRef.current,false)
      return false
    }
    toggleValidAndError(usernameRef.current,true)
    return true
  }

  /**
   * Input handler for password, realtime validation included
   */
  const handlePasswordInput = () => {
    setPassword(passwordRef.current.value)
    validatePassword()
  }

  /**
   * Validator for password input field
   */
  const validatePassword = () => {
    const password = passwordRef.current.value
    if (password.length < 7) {
      toggleValidAndError(passwordRef.current,false)
      return false
    }
    toggleValidAndError(passwordRef.current,true)
    return true
  }

  /**
   * Input handler for retype password, realtime validation included
   */
  const handleRePassword = () => {
    setRePassword(rePasswordRef.current.value)
    validateRePassword()
  }

  /**
   * Validator for retype password input field
   */
  const validateRePassword = () => {
    const rePassword = rePasswordRef.current.value
    if (password !== rePassword) {
      toggleValidAndError(rePasswordRef.current,false)
      return false
    }
    toggleValidAndError(rePasswordRef.current,true)
    return true
  }

  // No sign up if the user is already logged in
  if (authUser) {
    return (
      <Navigate to="/" />
    )
  }
  return (
    <form className='form' id='signup-form' onSubmit={onSubmit}>
      <h3 className='form-title'>Sign Up</h3>
      <TextInput
        title='Name'
        name='name'
        value={name}
        handler={handleNameInput}
        inputRef={nameRef}
        error='Name is required and must be between 2-20 characters long'
      />
      <TextInput
        title='Username'
        name='username'
        maxLength={15}
        value={username}
        handler={handleUsernameInput}
        inputRef={usernameRef}
        error='Username is required and must be between 5-15 characters long'
      />
      <TextInput
        title='Password'
        name='password'
        value={password}
        handler={handlePasswordInput}
        type='password'
        inputRef={passwordRef}
        error='Password is required and must be atleast 7 characters long'
      />
      <TextInput
        title='Retype Password'
        name='rePassword'
        value={rePassword}
        handler={handleRePassword}
        type='password'
        inputRef={rePasswordRef}
        error='Must match the password'
      />
      <SubmitResetButtons
        submit='Sign Up'
        cancel='Reset'
        handleReset={onReset}
      />
    </form>
  )
}

export default SignUpForm