import React from 'react'


/**
 * A simple component to be displayed when no data is found with parameters
 * given when doing a query to Gecko API
 */
const DataViewNoData = () => {
  return (
    <div className="data-card">
      <h4>No Data</h4>
      <p>
        No data was found, try another set of dates.
      </p>
    </div>
  )
}

export default DataViewNoData