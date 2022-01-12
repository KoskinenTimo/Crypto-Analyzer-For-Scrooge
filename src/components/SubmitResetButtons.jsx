import React from 'react'

const SubmitResetButtons = ({
  submit='submit',
  cancel='cancel',
  handleReset
}) => {
  return (
    <div>
      <button
        className="form-button"
        type="submit"
      >{submit}</button>
      <button
        className="form-button"
        type="button"
        onClick={() => handleReset()}
      >{cancel}</button>
    </div>
  )
}

export default SubmitResetButtons