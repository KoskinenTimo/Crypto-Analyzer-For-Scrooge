import React from 'react'
import './ResetButton.scss'

const ResetButton = ({
  cancel='cancel',
  handleReset
}) => {
  return (
    <button
      className="form__reset-button"
      type="button"
      onClick={() => handleReset()}
    >
      {cancel}
    </button>
  )
}

export default ResetButton