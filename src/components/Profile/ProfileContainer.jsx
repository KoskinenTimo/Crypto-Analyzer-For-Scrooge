import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  } from 'react-router-dom'
import { createErrorNotification } from '../../reducers/notificationReducer'
import { getOneUser } from '../../services/userService'
import Loading from '../Loading'
import DetailsCard from './DetailsCard'
import FavoritesList from './FavoritesList'


const ProfileContainer = () => {
  const user = useSelector(s => s.authUser)
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    if (loading) return
    setLoading(true)
    if (user) {
      getOneUser(user.id,user.token)
        .then(res => {
          console.log(res.data)
          console.log(user)
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
  }, [user])

  if (loading) {
    return(<Loading />)
  }
  return (
    <div className='data-card-table'>
      <DetailsCard />
      <FavoritesList />
    </div>
  )
}

export default ProfileContainer