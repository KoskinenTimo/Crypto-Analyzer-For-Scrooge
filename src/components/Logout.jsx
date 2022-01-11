import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetUser } from '../reducers/userReducer'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'


/**
 * This component holds the logic for logging out
 */
const Logout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetUser())
    Cookies.remove('authUser')
  })
  return (
    <Navigate to="/" />
  )
}

export default Logout