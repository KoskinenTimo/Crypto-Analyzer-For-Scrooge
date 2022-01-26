import React from 'react'
import { useSelector } from 'react-redux'
import FavoriteListItem from './FavoriteListItem'


const FavoritesList = () => {
  const user = useSelector(s => s.authUser)

  if (user && user.favorites) {
    return (
      <div className='dataview-container dataview-container-favorites'>
        <div className='data-card'>
          <h4>Favorites</h4>
        </div>
        <>
          {user.favorites.map(fav => <FavoriteListItem key={fav.id} data={fav}/>)}
        </>
      </div>
    )
  }
  return (
    <div className='market-data-card'>
      <h4>Favorites</h4>
      <p>NO DETAILS AVAILABLE</p>
    </div>
  )

}

export default FavoritesList