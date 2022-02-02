import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../reducers/store'
import './DetailsCard.scss'

/**
 * Details card to show profile details and image
 */
const DetailsCard = () => {
  const user = useSelector(selectUser)

  return (
    <div className='profile-details-cntr'>
      <div className='profile-details-card'>
        <img
          className='profile-details-card__img'
          src='https://via.placeholder.com/150'
        />
        <div>
          <h4 className='profile-details-card__title'>Profile details</h4>
          <p className='profile-details-card__txt'>Name: {user.name}</p>
          <p className='profile-details-card__txt'>Username: {user.username}</p>
        </div>
      </div>
    </div>
  )
}

export default DetailsCard