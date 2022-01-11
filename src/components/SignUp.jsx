import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


/**
 * This component hold the logic for sign up, new user will be also logged in
 * after a succesfull sign up
 */
const SignUp = () => {
  const authUser = useSelector(state => state.authUser)

  if (authUser) {
    return (
      <Navigate to="/" />
    )
  }
  return (
    <div></div>
  )
}

export default SignUp