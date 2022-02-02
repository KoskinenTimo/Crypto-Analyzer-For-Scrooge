import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createErrorNotification, createProcessNotification, createSuccessNotification, extractErrorMsg } from '../../reducers/notificationReducer'
import { selectUser } from '../../reducers/store'
import { deleteUserFavorite } from '../../reducers/userReducer'
import { deleteFavorite } from '../../services/favoritesService'
import './DeleteFavoriteButton.scss'

/**
 * Delete button for profile favorites list item cards
 */
const DeleteFavoriteButton = ({ id }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

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
      <button className='profile-favlist-item__btn--delete' onClick={() => handleDelete()}>Confirm</button>
    </>
  )
}

export default DeleteFavoriteButton