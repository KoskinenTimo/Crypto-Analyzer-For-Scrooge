import React from 'react'
import './DateInput.scss'

/**
 * Re-usable input field for dates
 * @param {props}
 */
const DateInput = ({
  dateInputValue,
  handleDateInput,
  name,
  title,
  elementRef=null
}) => {

  return(
    <div className="date-input-cntr">
      <label className='date-input-cntr__title'>{title}<span className="date-input-cntr__notification--valid">&#10004;&#65039;</span></label>
      <input
        className="date-input-cntr__input"
        name={name}
        type="text"
        maxLength="10"
        value={dateInputValue}
        placeholder="DD/MM/YYYY"
        onChange={({ target }) => handleDateInput(target)}
        ref={elementRef}
      />
      <span className="date-input-cntr__notification--error">Make sure the date is in correct form DD/MM/YYYY</span>
      <span className="date-input-cntr__notification--error">Date is incorrect, check day/month/year, year must be greater than 1970, also cannot be set in the future</span>
    </div>
  )
}

export default DateInput