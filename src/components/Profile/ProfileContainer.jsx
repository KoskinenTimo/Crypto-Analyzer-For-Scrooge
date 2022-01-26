import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  } from 'react-router-dom'
import { createErrorNotification } from '../../reducers/notificationReducer'
import { updateUser } from '../../reducers/userReducer'
import { getOneUser } from '../../services/userService'
import Loading from '../Loading'
import DetailsCard from './DetailsCard'
import FavoritesList from './FavoritesList'


const ProfileContainer = () => {
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
          if (
            err.response &&
            err.response.data &&
            err.response.data.error
          ) {
            dispatch(createErrorNotification(err.response.data.error))
          } else {
            dispatch(createErrorNotification(err.message))
          }
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
    <div className='data-card-table-list'>
      <DetailsCard />
      <FavoritesList />
    </div>
  )
}

export default ProfileContainer