import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetError } from '../reducers/errorReducer'

const ErrorMessage = () => {
  const error = useSelector(state => state.error)
  const dispatch = useDispatch()
  const [ errorMessage, setErrorMessage ] = useState('')
  // ref to make sure timer resets correctly
  const timerRef = useRef()
  const containerRef = useRef()

  useEffect(() => {
    if (!error) return
    setErrorMessage(error)
    dispatch(resetError())
    clearTimeout(timerRef.current)
    containerRef.current.style.display = 'block'
    timerRef.current = setTimeout(() => {
      containerRef.current.style.display = 'none'
      setErrorMessage('')
    },4000)
  }, [error])

  return(
    <div id="error-message-container" ref={containerRef}>
      <h4>{errorMessage}</h4>
    </div>
  )
}

export default ErrorMessage