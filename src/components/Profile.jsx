import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const Profile = () => {
  const user = useSelector(store => store.authUser)
  if (!user) {
    return(<Navigate to={'/'}/>)
  }
  return (<div>PLACEHOLDER</div>)
}

export default Profile