import Cookies from 'js-cookie'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  createErrorNotification,
  createSuccessNotification,
  extractErrorMsg
} from '../../reducers/notificationReducer'
import { loginUser } from '../../reducers/userReducer'
import { login } from '../../services/loginService'
import { signup } from '../../services/userService'
import SignUpForm from './SignUpForm'

/**
 * Container for signup to separate communication with backend for tests
 */
const SignUpFormCntr = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitData = (username, password, name) => {
    signup({ username, password, name })
      .then(() => {
        login({ username, password })
          .then(res => {
            const authDetails = res.data
            Cookies.set('authUser', JSON.stringify(authDetails),{ expires: 1 })
            dispatch(loginUser(authDetails))
            dispatch(createSuccessNotification('Sign Up succesful'))
            navigate('/home')
          })
          .catch(err => {
            dispatch(createErrorNotification(extractErrorMsg(err)))
          })
      })
      .catch(err => {
        dispatch(createErrorNotification(extractErrorMsg(err)))
      })
  }
  return (
    <>
      <SignUpForm submitData={submitData} />
    </>
  )
}

export default SignUpFormCntr