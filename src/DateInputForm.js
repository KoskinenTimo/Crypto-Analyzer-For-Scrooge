import React, { useRef, useState } from "react";

// Components
import DateInput from "./DateInput";

// Hooks
import useAutoInput from "./hooks/useAutoInput";


/**
 * Form for inputting dates to make a range fetch from API
 */
const DateInputForm = ({
  setFromDateTimeStamp,
  setToDateTimeStamp,
  setError
}) => {
  const [ fromDateInputValue, setFromDateInputValue ] = useState('')
  const [ toDateInputValue, setToDateInputValue ] = useState('')
  useAutoInput(fromDateInputValue,setFromDateInputValue,"/",[2,5])
  useAutoInput(toDateInputValue,setToDateInputValue,"/",[2,5])
  const fromDateRef = useRef()
  const toDateRef = useRef()
  
  /**
   * Handles form validation and coverts given dates to UNIX
   * timestamps for API query
   * @param {event} e 
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    const fromDateValid = handleDateInput(fromDateRef.current)
    const toDateValid = handleDateInput(toDateRef.current)
    const notSameDate = fromDateRef.current.value !== toDateRef.current.value
    if (fromDateValid && toDateValid && notSameDate) {
      const fromDateUnixTimestamp = parseToTimestamp(fromDateInputValue)
      const toDateUnixTimestamp = parseToTimestamp(toDateInputValue,1)
      setFromDateTimeStamp(fromDateUnixTimestamp)
      setToDateTimeStamp(toDateUnixTimestamp)
      return;
    }
    if (!fromDateValid || !toDateValid) {
      setError("Please check the input, input provided is not valid")
      return;
    }
    setError("'From Date' and 'To Date' cannot be the same")
  }  

  /**
   * Coverts a date string to UNIX timestamp
   * Builds first UTC time format and then converts 
   * it to Unix timestamp
   * Works with string format "DD/MM/YEAR"
   * @param {string} dateString 
   * @returns {number} Unix timestamp
   */
  const parseToTimestamp = (dateString,hour=0) => {
    const dateParts = dateString.split("/")
    const [day,month,year] = [...dateParts];
    const dateUTC = `${year}-${month}-${day}T0${hour}:00:00.000Z`
    const dateMilliseconds = Date.parse(dateUTC);
    return dateMilliseconds/1000;
   }

  /**
   * Checks if the input date value is in correct form
   * @param {string} value 
   * @returns {boolean}
   */
  const isValidString = (value) => {
    const regex = /^\d{2}[/]\d{2}[/]\d{4}$/g
    return regex.test(value)
  }

  /**
   * Checks if the input date is a real date
   * @param {string} value 
   * @returns {boolean}
   */
  const isValidDate = (value) => {
    if (value.length === 10) {
      const dateParts = value.split("/")
      const day = parseInt(dateParts[0],10)
      const month = parseInt(dateParts[1],10)
      const year = parseInt(dateParts[2],10)

      if (
        year < 1970 || 
        year >= new Date().getFullYear() || 
        month === 0 || 
        month > 12
        ) {
        return false
      }
      if (
        year === new Date().getFullYear() &&
        month > new Date().getMonth()+1
        ) {
        return false
      }
      if (
        year === new Date().getFullYear() &&
        month === new Date().getMonth()+1 &&
        day > new Date().getDate()
        ) {
        return false
        }

      const daysInEachMonth = [ 31,28,31,30,31,30,31,31,30,31,30,31 ]

      if (year % 4) {
        daysInEachMonth[1] = 29
      }
      if (day > 0 && day <= daysInEachMonth[month - 1]) {
        
      }
    }
    return true
  }

  /**
   * Controls date inputs storing and validations in real time
   * @param {DOM object} inputElement
   */
  const handleDateInput = (inputElement) => {  
    const validString = isValidString(inputElement.value)
    const validDate = isValidDate(inputElement.value)
    if (inputElement.name === "fromDate") {
      setFromDateInputValue(inputElement.value)
    }
    if (inputElement.name === "toDate") {
      setToDateInputValue(inputElement.value)
    }    
    toggleStringValidation(inputElement,validString,validDate)
    if (!validString || !validDate) {
      return false
    }
    return true;
  }


  /**
   * Toggles error messages and visuals on the form. Also adds 
   * and removes valid marking.
   * @param {DOM object} inputElement 
   * @param {boolean} validString 
   */
  const toggleStringValidation = (inputElement,validString,validDate) => {
    const stringErrorNode = inputElement.parentNode.getElementsByClassName("date-form-error")[0]
    const dateErrorNode = inputElement.parentNode.getElementsByClassName("date-form-error")[1]
    const inputValidNode = inputElement.parentNode.getElementsByClassName("date-form-valid")[0]
    if (!validString || !validDate) {
      inputValidNode.style.display = "none"
      if (!validString) {
        stringErrorNode.style.display = "inline-block"
      } else {
        stringErrorNode.style.display = "none"
      }
      if (!validDate) {
        dateErrorNode.style.display = "inline-block"
      } else {
        dateErrorNode.style.display = "none"
      }
    } else {
      stringErrorNode.style.display = "none"
      inputValidNode.style.display = "inline-block"
    }
  }

  // Resets all form fields
  const handleResetButton = () => {
    setFromDateInputValue("")
    setToDateInputValue("")
    setFromDateTimeStamp("")
    setToDateTimeStamp("")
    const errorElements = document.getElementById("date-form").getElementsByClassName("date-form-error")
    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].style.display = "none"      
    }
  }


  return(    
    <form className="date-form" id="date-form" onSubmit={handleSubmit}>      
      <DateInput 
        dateInputValue={fromDateInputValue}
        handleDateInput={handleDateInput}
        name="fromDate"
        title="From Date"
        elementRef={fromDateRef}        
      />
      <DateInput 
        dateInputValue={toDateInputValue}
        handleDateInput={handleDateInput}
        name="toDate"
        title="To Date"
        elementRef={toDateRef}
      />
      <div>
        <button 
          className="date-form-button"
          type="submit"
        >Search</button>
        <button
          className="date-form-button"
          type="button"
          onClick={handleResetButton}
        >Reset</button>
      </div>
      
    </form>
  );
}

export default DateInputForm;