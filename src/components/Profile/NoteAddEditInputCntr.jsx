import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createErrorNotification, createSuccessNotification, extractErrorMsg } from '../../reducers/notificationReducer'
import { selectUser } from '../../reducers/store'
import { updateUserFavorite } from '../../reducers/userReducer'
import { updateFavorite } from '../../services/favoritesService'
import NoteAddEditInput from './NoteAddEditInput'

/**
 * Container for the NoteAddEditInput to hold API/store logic, for testing
 * purposes
 */
const NoteAddEditInputCntr= ({ data, setEditNote }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  /**
   * Handler for NoteAddEditInput form submit
   * @param {event object} e
   * @param {string} note
   */
  const handleSubmit = (e,note) => {
    e.preventDefault()
    updateFavorite(user.token, { note }, data.id)
      .then(res => {
        dispatch(updateUserFavorite(res.data))
        dispatch(createSuccessNotification('Note updated/added!'))
        setEditNote(false)
      })
      .catch(err => {
        dispatch(createErrorNotification(extractErrorMsg(err)))
      })
  }
  return <NoteAddEditInput data={data} handleSubmit={handleSubmit} />
}

export default NoteAddEditInputCntr