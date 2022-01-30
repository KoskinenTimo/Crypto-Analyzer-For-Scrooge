import React from 'react'
import './NoData.scss'

/**
 * No Data component for Market page
 */
const NoData = () => {
  return (
    <div className="market-card">
      <h4 className='market-card__title'>No Data</h4>
      <p className='market-card__txt'>
        No data, an error occured when loading information from API.
      </p>
    </div>
  )
}

export default NoData