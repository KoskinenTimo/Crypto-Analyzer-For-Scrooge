import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createErrorNotification, createProcessNotification, createSuccessNotification } from '../../reducers/notificationReducer'
import { createFavorite } from '../../services/favoritesService'


const SaveBar = () => {
  const dispatch = useDispatch()
  const { fromDate, toDate, coin, currency } = useSelector(s => s.analyzer)
  const profit = useSelector(s => s.bestBuySell)[2]
  const volume = useSelector(s => s.highestVolume)[1]
  const token = useSelector(s => s.authUser.token)
  const [ saved, setSaved ] = useState(false)


  const handleClick = () => {
    setSaved(true)
    dispatch(createProcessNotification('Saving to profile...'))
    const newFavorite = {
      fromDate,
      toDate,
      coin,
      currency,
      profit,
      volume
    }
    createFavorite(newFavorite,token)
      .then(() => {
        setTimeout(() => {
          dispatch(createSuccessNotification('Data saved to profile!'))
        }, 1000)
      })
      .catch(err => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.error
        ) {
          dispatch(createErrorNotification(err.response.data.error))
        } else {
          dispatch(createErrorNotification(err.message))
        }
        setSaved(false)
      })

  }
  if (saved) {
    return (
      <button className='data-save-bar'>
        <h4>SAVED!</h4>
      </button>
    )
  }
  return (
    <button className='data-save-bar' onClick={() => handleClick()}>
      <h4>SAVE TO PROFILE</h4>
    </button>
  )
}

export default SaveBar