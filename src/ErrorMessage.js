import React, { useEffect, useRef, useState } from "react"

const ErrorMessage = ({
  error,
  setError
}) => {
  const [ errorMessage, setErrorMessage ] = useState('');
  const timerRef = useRef()
  const containerRef = useRef();

  useEffect(() => {
    if (!error.length) return
    setErrorMessage(error)
    setError('')
    clearTimeout(timerRef.current)
    containerRef.current.style.display = "block"
    timerRef.current = setTimeout(() => {
      containerRef.current.style.display = "none"
      setErrorMessage('')
    },2000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])


  return(
    <div id="error-message-container" ref={containerRef}>
      <h4>{errorMessage}</h4>
    </div>
  )
}

export default ErrorMessage