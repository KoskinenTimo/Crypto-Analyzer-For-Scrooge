import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getOneUser } from '../../services/userService'
import DetailsCard from './DetailsCard'
import FavoritesList from './FavoritesList'


const ProfileContainer = () => {
  const user = useSelector(store => store.authUser)

  useEffect(() => {
    getOneUser(user.id,user.token)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response))
  }, [user])

  if (!user) {
    return(<Navigate to={'/'}/>)
  }
  return (
    <div className='data-card-table'>
      <DetailsCard />
      <FavoritesList />
    </div>
  )
}

export default ProfileContainer