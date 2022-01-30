import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createErrorNotification, createProcessNotification, createSuccessNotification, extractErrorMsg } from '../../reducers/notificationReducer'
import { createFavorite } from '../../services/favoritesService'
import './DataViewSaveBar.scss'

/**
 * SaveBar for storing favorite dates in user 'profile'
 */
const DataViewSaveBar = () => {
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
        dispatch(createErrorNotification(extractErrorMsg(err)))
        setSaved(false)
      })

  }
  if (saved) {
    return (
      <button className='save-bar'>
        <h4 className='save-bar__title'>SAVED!</h4>
      </button>
    )
  }
  return (
    <button className='save-bar' onClick={() => handleClick()}>
      <h4 className='save-bar__title'>SAVE TO PROFILE</h4>
    </button>
  )
}

export default DataViewSaveBar