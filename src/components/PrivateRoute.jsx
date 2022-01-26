import Cookies from 'js-cookie'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


/**
 * Is used to wrap routes that require login/auth user
 */
const PrivateRoute = ({ children }) => {
  const user = useSelector(s => s.authUser)
  if (!Cookies.get('authUser')) {
    return <Navigate to='/login' />
  }
  if (!user && Cookies.get('authUser')) {
    return <Navigate to='/authenticate' />
  }
  return children
}

export default PrivateRoute