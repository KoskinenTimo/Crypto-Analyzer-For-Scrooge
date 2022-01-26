import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createErrorNotification, createSuccessNotification } from '../../reducers/notificationReducer'
import { updateUserFavorite } from '../../reducers/userReducer'
import { updateFavorite } from '../../services/favoritesService'


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
    <div className="flex-row">
      <textarea
        maxLength={200}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  )
}

export default NoteAddEditInput