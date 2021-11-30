import React from "react";

const DateInput = ({
  dateInputValue,
  handleDateInput,
  name,
  title
}) => {
  return(
    <label className="date-form-label">
      <label>{title}<span className="date-form-valid">&#10004;&#65039;</span></label>
      <input
        className="date-form-input"
        name={name}
        type="text"
        maxLength="10"
        value={dateInputValue}
        placeholder="DD/MM/YYYY"
        onChange={handleDateInput}
      />
      <span className="date-form-error">Make sure the date is in correct form "DD/MM/YYYY"</span>
      <span className="date-form-error">Date is incorrect, check day/month/year, year must be greater than 1970, also cannot be set in the future</span>
    </label>
  )
}

export default DateInput;