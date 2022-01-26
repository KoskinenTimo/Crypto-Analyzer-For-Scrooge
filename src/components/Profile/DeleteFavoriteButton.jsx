import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createErrorNotification, createProcessNotification, createSuccessNotification } from '../../reducers/notificationReducer'
import { deleteUserFavorite } from '../../reducers/userReducer'
import { deleteFavorite } from '../../services/favoritesService'


const DeleteFavoriteButton = ({ id }) => {
  const dispatch = useDispatch()
  const user = useSelector(s => s.authUser)

  const handleDelete = () => {
    dispatch(createProcessNotification('Deleting favorite...'))
    deleteFavorite(user.token,id)
      .then(() => {
        dispatch(deleteUserFavorite(id))
        dispatch(createSuccessNotification('Favorite deleted succesfully!'))
      })
      .catch(err => {
        if (
          err.response &&
          err.response.data &&
          err.response.error
        ) {
          dispatch(createErrorNotification(err.response.data.error))
        } else {
          dispatch(createErrorNotification(err.message))
        }
      })
  }

  return (
    <>
      <button onClick={() => handleDelete()}>Confirm</button>
    </>
  )
}

export default DeleteFavoriteButton