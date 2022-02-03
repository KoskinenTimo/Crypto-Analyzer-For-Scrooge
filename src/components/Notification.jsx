import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'
import './Notification.scss'

/**
 * Used as an error message display below header for any caught errors
 */
const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const [ notificationMessage, setNotificationMessage ] = useState('')
  // ref to make sure timer resets correctly
  const timerRef = useRef()
  const errorRef = useRef()
  const successRef = useRef()
  const processRef = useRef()

  useEffect(() => {
    if (!notification.message) {
      errorRef.current.style.display = 'none'
      successRef.current.style.display = 'none'
      processRef.current.style.display = 'none'
      setNotificationMessage('')
      return
    }

    setNotificationMessage(notification.message)
    clearTimeout(timerRef.current)
    if (notification.type === 'error') {
      successRef.current.style.display = 'none'
      processRef.current.style.display = 'none'
      errorRef.current.style.display = 'block'
    }
    if (notification.type === 'success') {
      errorRef.current.style.display = 'none'
      processRef.current.style.display = 'none'
      successRef.current.style.display = 'block'

    }
    if (notification.type === 'process') {
      errorRef.current.style.display = 'none'
      successRef.current.style.display = 'none'
      processRef.current.style.display = 'block'

    }
    timerRef.current = setTimeout(() => {
      errorRef.current.style.display = 'none'
      successRef.current.style.display = 'none'
      if (notification.type === 'error' || notification.type === 'success') {
        dispatch(resetNotification())
        setNotificationMessage('')
      }
    },5000)
  }, [notification])

  return(
    <>
      <div className='notification--error' ref={errorRef} data-testid='test-id-notification--error'>
        <h4>{notificationMessage}</h4>
      </div>
      <div className='notification--success' ref={successRef} data-testid='test-id-notification--success'>
        <h4>{notificationMessage}</h4>
      </div>
      <div className='notification--process' ref={processRef} data-testid='test-id-notification--process'>
        <h4>{notificationMessage}</h4>
      </div>
    </>

  )

}

export default Notification