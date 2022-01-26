import React from 'react'
import { useSelector } from 'react-redux'


const DetailsCard = () => {
  const user = useSelector(s => s.authUser)
  return (
    <div className='market-data-card flex-row' id='profile-details'>
      <img src='https://via.placeholder.com/150'/>
      <div>
        <h4>Profile details</h4>
        <p>Name: {user.name}</p>
        <p>Username: {user.username}</p>
      </div>

    </div>
  )
}

export default DetailsCard