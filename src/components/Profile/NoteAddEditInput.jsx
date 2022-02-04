import React, { useEffect, useState } from 'react'
import './NoteAddEditInput.scss'

const NoteAddEditInput = ({ data, handleSubmit }) => {
  const [ note, setNote ] = useState('')
  useEffect(() => {
    if (data.note) {
      setNote(data.note)
    }
  }, [])

  return (
    <form className="profile-favlist-note-edit-flexbox" onSubmit={e => handleSubmit(e,note)}>
      <textarea
        maxLength={200}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className='profile-favlist-item__textarea'
      />
      <button
        className='profile-favlist-item__button--submit'
        type='submit'
      >
        Submit
      </button>
    </form>
  )
}

export default NoteAddEditInput