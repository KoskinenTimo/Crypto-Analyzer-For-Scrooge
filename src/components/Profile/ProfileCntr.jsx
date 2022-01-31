import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  } from 'react-router-dom'
import { createErrorNotification, extractErrorMsg } from '../../reducers/notificationReducer'
import { updateUser } from '../../reducers/userReducer'
import { getOneUser } from '../../services/userService'
import './ProfileCntr.scss'

// Components
import Loading from '../Loading'
import DetailsCard from './DetailsCard'
import FavoritesList from './FavoritesList'

const ProfileCntr = () => {
  const user = useSelector(s => s.authUser)
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (user) {
      getOneUser(user.id,user.token)
        .then(res => {
          dispatch(updateUser(res.data))
          setLoading(false)
        })
        .catch(err => {
          dispatch(createErrorNotification(extractErrorMsg(err)))
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return(<Loading />)
  }
  return (
    <div className='profile-cntr'>
      <DetailsCard />
      <FavoritesList />
    </div>
  )
}

export default ProfileCntr