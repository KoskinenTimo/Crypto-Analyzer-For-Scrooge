import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createErrorNotification, createProcessNotification, createSuccessNotification, extractErrorMsg } from '../../reducers/notificationReducer'
import { deleteUserFavorite } from '../../reducers/userReducer'
import { deleteFavorite } from '../../services/favoritesService'
import './DeleteFavoriteButton.scss'

/**
 * Delete button for profile favorites list item cards
 */
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
        dispatch(createErrorNotification(extractErrorMsg(err)))
      })
  }

  return (
    <>
      <button className='profile-favlist-item__button--delete' onClick={() => handleDelete()}>Confirm</button>
    </>
  )
}

export default DeleteFavoriteButton