import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createErrorNotification, createSuccessNotification, extractErrorMsg } from '../../reducers/notificationReducer'
import { updateUserFavorite } from '../../reducers/userReducer'
import { updateFavorite } from '../../services/favoritesService'
import './NoteAddEditInput.scss'

const NoteAddEditInput = ({ data, setEditNote }) => {
  const [ note, setNote ] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(s => s.authUser)

  useEffect(() => {
    if (data.note) {
      setNote(data.note)
    }
  }, [])

  const handleSubmit = () => {
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

  return (
    <div className="profile-favlist-note-edit-flexbox">
      <textarea
        maxLength={200}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className='profile-favlist-item__textarea'
      />
      <button
        className='profile-favlist-item__button--submit'
        onClick={() => handleSubmit()}
      >
        Submit
      </button>
    </div>
  )
}

export default NoteAddEditInput