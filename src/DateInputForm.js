import React, { useEffect } from "react";
import { bitcoinChartRange } from "./constants/apiPaths";
import DateInput from "./DateInput";

/**
 * Form for inputting dates to make a range fetch from API
 */
const DateInputForm = ({ 
  fromDateInputValue,
  setFromDateInputValue,
  toDateInputValue,
  setToDateInputValue,
  setPath
}) => {

  /**
   * Handles form validation and fires the path building
   * @param {event object} e 
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      isValidString(fromDateInputValue) &&
      isValidString(toDateInputValue)
    ) {
      if (
        isValidDate(fromDateInputValue) &&
        isValidDate(toDateInputValue)
      ) {
        
        const fromDateUnixStamp = parseToTimestamp(fromDateInputValue)
        const toDateUnixStamp = parseToTimestamp(toDateInputValue)

      }
    }
  }

  /**
   * Builds the path parameter for useCoinGeckoApi
   * @param {string} fromDate 
   * @param {string} toDate 
   */
  const createPath = (fromDate, toDate) => {
    const path = `${bitcoinChartRange}`
  }

  /**
   * Coverts a date string to UNIX timestamp
   * Works for example with string form
   * "MM/DD/YEAR hh:mm:ss"
   * @param {string} dateString 
   * @returns {number} Unix timestamp
   */
  const parseToTimestamp = (dateString) =>{
    const date = Date.parse(dateString);
    return date/1000;
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
   * @param {event object} e
   */
  const handleDateInput = (e) => {
    const inputElement = e.target;    
    const validString = isValidString(inputElement.value)
    const validDate = isValidDate(inputElement.value)
    if (inputElement.name === "fromDate") {
      setFromDateInputValue(inputElement.value)
    }
    if (inputElement.name === "toDate") {
      setToDateInputValue(inputElement.value)
    }
    
    toggleStringValidation(inputElement,validString,validDate)
  }


  /**
   * 
   * @param {DOM element} inputElement 
   * @param {boolean} validString 
   */
  const toggleStringValidation = (inputElement,validString,validDate) => {
    const stringErrorNode = inputElement.parentNode.getElementsByClassName("date-form-error")[0]
    const dateErrorNode = inputElement.parentNode.getElementsByClassName("date-form-error")[1]
    const inputValidNode = inputElement.parentNode.getElementsByClassName("date-form-valid")[0]
    if (!validString || !validDate) {     
      inputElement.parentNode.classList.add("error")
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
      inputElement.parentNode.classList.remove("error")
      stringErrorNode.style.display = "none"
      inputValidNode.style.display = "inline-block"
    }
  }

  const handleResetButton = () => {
    setFromDateInputValue('')
    setToDateInputValue('')
  }


  return(    
    <form className="date-form" onSubmit={handleSubmit}>      
      <DateInput 
        dateInputValue={fromDateInputValue}
        handleDateInput={handleDateInput}
        name="fromDate"
        title="From Date"
      />
      <DateInput 
        dateInputValue={toDateInputValue}
        handleDateInput={handleDateInput}
        name="toDate"
        title="To Date"
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
        >Cancel</button>
      </div>
      
    </form>
  );
}

export default DateInputForm;