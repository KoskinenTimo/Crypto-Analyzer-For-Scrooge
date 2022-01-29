import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createErrorNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import { checkToken } from '../services/loginService'
import './Authenticate.scss'

const Authenticate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(s => s.authUser)

  useEffect(() => {
    if (Cookies.get('authUser')) {
      const authUser = JSON.parse(Cookies.get('authUser'))
      checkToken(authUser.token)
        .then(() => {
          dispatch(loginUser(authUser))
        })
        .catch(err => {
          if (
            err.response &&
            err.response.status &&
            err.response.status === 401
          ) {
            Cookies.remove('authUser')
            dispatch(createErrorNotification('Login token expired or invalid'))
          }
          if (
            err.response &&
            err.response.data &&
            err.response.message
          ) {
            dispatch(createErrorNotification(err.response.message))
          } else {
            dispatch(createErrorNotification(err.message))
          }
          navigate('/')
        })
    } else {
      navigate('/')
    }
  }, [])

  if (user) {
    return <>{navigate(-1)}</>
  }
  return (
    <h1 className="authenticate-loading">
      AUTHENTICATING...
    </h1>
  )
}

export default Authenticate