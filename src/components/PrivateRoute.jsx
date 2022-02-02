import Cookies from 'js-cookie'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUser } from '../reducers/store'

/**
 * Is used to wrap routes that require login/auth user
 */
const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser)
  if (!Cookies.get('authUser')) {
    return <Navigate to='/login' />
  }
  if (!user && Cookies.get('authUser')) {
    return <Navigate to='/authenticate' />
  }
  return children
}

export default PrivateRoute