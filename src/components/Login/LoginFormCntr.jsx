import Cookies from 'js-cookie'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  createErrorNotification,
  createSuccessNotification,
  extractErrorMsg
} from '../../reducers/notificationReducer'
import { selectUser } from '../../reducers/store'
import { loginUser } from '../../reducers/userReducer'
import { login } from '../../services/loginService'
import LoginForm from './LoginForm'

/**
 * Container for Login form to separate back end communication for tests
 */
const LoginFormCntr = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  const submitData = (username, password) => {
    login({ username, password })
      .then(res => {
        const authDetails = res.data
        Cookies.set('authUser', JSON.stringify(authDetails),{ expires: 1 })
        dispatch(loginUser(authDetails))
        dispatch(createSuccessNotification('Logged in'))
      })
      .catch(err => {
        dispatch(createErrorNotification(extractErrorMsg(err)))
      })
  }

  if (user) {
    return <>{navigate(-1)}</>
  }
  return (
    <>
      <LoginForm submitData={submitData}/>
    </>
  )
}

export default LoginFormCntr