import React from 'react'
import { useSelector } from 'react-redux'
import FavoriteListItem from './FavoriteListItem'
import './FavoritesList.scss'

/**
 * Container for favorites list in profile page
 */
const FavoritesList = () => {
  const user = useSelector(s => s.authUser)

  if (user && user.favorites) {
    return (
      <div className='profile-favlist-cntr'>
        <div className='profile-favlist-card'>
          <h4 className='profile-favlist-card__title'>Favorites</h4>
        </div>
        <>
          {user.favorites.map(fav => <FavoriteListItem key={fav.id} data={fav}/>)}
        </>
      </div>
    )
  }
  return (
    <div className='profile-favlist-cntr'>
      <div className='profile-favlist-card'>
        <h4 className='profile-favlist-card__title'>Favorites</h4>
        <p className='profile-favlist-card__txt'>NO DETAILS AVAILABLE</p>
      </div>
    </div>

  )

}

export default FavoritesList