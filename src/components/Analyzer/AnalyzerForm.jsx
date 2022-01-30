import React, { useRef, useState } from 'react'
import { createErrorNotification } from '../../reducers/notificationReducer'
import { createSearch, resetSearch } from '../../reducers/analyzerReducer'
import useAutoInput from '../../hooks/useAutoInput'
import { useDispatch } from 'react-redux'
import './AnalyzerForm.scss'

// Utils
import { coins, currencies } from '../../utils/constants'
import { parseToTimestamp } from '../../utils/parsers'
import { isValidDate, isValidDateString } from '../../utils/validators'

// Components
import DateInput from '../Inputs/DateInput'
import DropDownMenu from '../Inputs/DropDownMenu'
import SubmitButton from '../Buttons/SubmitButton'
import ResetButton from '../Buttons/ResetButton'

/**
 * Form takes 4 values, fromDate, toDate, coin and currency. On submit the
 * data is moved to store for DataView component to use
 */
const AnalyzerForm = () => {
  const dispatch = useDispatch()
  const [ fromDateInputValue, setFromDateInputValue ] = useState('')
  const [ toDateInputValue, setToDateInputValue ] = useState('')
  const [ coin, setCoin ] = useState('')
  const [ currency, setCurrency ] = useState('')

  // Add '/' characters as the user gives date
  useAutoInput(fromDateInputValue,setFromDateInputValue,'/',[2,5])
  useAutoInput(toDateInputValue,setToDateInputValue,'/',[2,5])
  const fromDateRef = useRef()
  const toDateRef = useRef()

  /**
   * Handles form validation and coverts given dates to UNIX
   * timestamps for API query
   * @param {event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resetSearch())
    const fromDateValid = handleDateInput(fromDateRef.current)
    const toDateValid = handleDateInput(toDateRef.current)
    const notSameDate = fromDateRef.current.value !== toDateRef.current.value
    if (fromDateValid && toDateValid && notSameDate) {
      const fromDateUnixTimestamp = parseToTimestamp(fromDateInputValue)
      const toDateUnixTimestamp = parseToTimestamp(toDateInputValue,1)
      dispatch(createSearch({
        fromDate: fromDateUnixTimestamp,
        toDate: toDateUnixTimestamp,
        coin,
        currency
      }))
      return
    }
    if (!fromDateValid || !toDateValid) {
      dispatch(createErrorNotification('Please check the input, input provided is not valid'))
      return
    }
    dispatch(createErrorNotification('\'From Date\' and \'To Date\' cannot be the same'))
  }



  /**
   * Controls date inputs storing and validations in real time
   * @param {DOM object} inputElement
   */
  const handleDateInput = (inputElement) => {
    const validString = isValidDateString(inputElement.value)
    const validDate = isValidDate(inputElement.value)
    if (inputElement.name === 'fromDate') {
      setFromDateInputValue(inputElement.value)
    }
    if (inputElement.name === 'toDate') {
      setToDateInputValue(inputElement.value)
    }
    toggleStringValidation(inputElement,validString,validDate)
    if (!validString || !validDate) {
      return false
    }
    return true
  }

  /**
   * Toggles error messages and visuals on the form. Also adds
   * and removes valid marking.
   * @param {DOM object} inputElement
   * @param {boolean} validString
   */
  const toggleStringValidation = (inputElement,validString,validDate) => {
    const stringErrorNode = inputElement.parentNode.getElementsByClassName('date-input-cntr__notification--error')[0]
    const dateErrorNode = inputElement.parentNode.getElementsByClassName('date-input-cntr__notification--error')[1]
    const inputValidNode = inputElement.parentNode.getElementsByClassName('date-input-cntr__notification--valid')[0]
    if (!validString || !validDate) {
      inputValidNode.style.display = 'none'
      if (!validString) {
        stringErrorNode.style.display = 'inline-block'
      } else {
        stringErrorNode.style.display = 'none'
      }
      if (!validDate) {
        dateErrorNode.style.display = 'inline-block'
      } else {
        dateErrorNode.style.display = 'none'
      }
    } else {
      stringErrorNode.style.display = 'none'
      inputValidNode.style.display = 'inline-block'
    }
  }

  // Resets all form fields
  const handleResetButton = () => {
    setFromDateInputValue('')
    setToDateInputValue('')
    dispatch(resetSearch())
    // remove all error messages visible in the form
    const validElements = document.getElementById('analyzer-cntr__form-id').getElementsByClassName('date-input-cntr__notification--valid')
    const errorElements = document.getElementById('analyzer-cntr__form-id').getElementsByClassName('date-input-cntr__notification--error')
    const elements = [...validElements, ...errorElements]
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none'
    }
  }

  /**
   * Keeps crypto coin image updated next to title
   */
  const getImageLink = () =>  {
    const foundCoin = coins.find(part => part.id === coin)
    if (foundCoin) {
      return foundCoin.image
    }
  }

  return(
    <form
      className="form analyzer-form"
      id="analyzer-cntr__form-id"
      onSubmit={handleSubmit}
    >

      <div className='analyzer-form__title'>
        <h3>Analyzer</h3>
        <img src={getImageLink()}/>
      </div>
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
      <div className='analyzer-form__dropdowns'>
        <DropDownMenu
          setter={setCoin}
          title={'Coin'}
          array={coins}
        />
        <DropDownMenu
          setter={setCurrency}
          title={'Currency'}
          array={currencies}
        />
      </div>
      <div>
        <SubmitButton submit='Search' />
        <ResetButton cancel='Reset' handleReset={handleResetButton} />
      </div>
    </form>
  )
}

export default AnalyzerForm