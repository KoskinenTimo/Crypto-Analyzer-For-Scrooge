import React from 'react'
import './SubmitButton.scss'

const SubmitButton = ({ submit='submit' }) => {
  return (
    <>
      <button
        className="form__submit-btn"
        type="submit"
      >
        {submit}
      </button>

    </>
  )
}

export default SubmitButton