import React from 'react'
import './DataViewNoData.scss'

/**
 * A simple component to be displayed when no data is found with parameters
 * given when doing a query to Gecko API
 */
const DataViewNoData = () => {
  return (
    <div className="dv-nodata-card">
      <h4 className='dv-nodata-card__title'>No Data</h4>
      <p className='dv-nodata-card__txt'>
        No data was found, try another set of dates.
      </p>
    </div>
  )
}

export default DataViewNoData