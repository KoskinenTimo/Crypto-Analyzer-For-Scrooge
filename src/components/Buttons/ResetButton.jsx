import React from 'react'
import './ResetButton.scss'

const ResetButton = ({
  cancel='cancel',
  handleReset
}) => {
  return (
    <button
      className="form__reset-btn"
      type="btn"
      onClick={() => handleReset()}
    >
      {cancel}
    </button>
  )
}

export default ResetButton