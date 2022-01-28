import React from 'react'
import './SubmitButton.scss'

const SubmitButton = ({ submit='submit' }) => {
  return (
    <>
      <button
        className="form__submit-button"
        type="submit"
      >
        {submit}
      </button>

    </>
  )
}

export default SubmitButton