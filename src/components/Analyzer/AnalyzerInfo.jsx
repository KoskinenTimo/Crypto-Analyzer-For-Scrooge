import React from 'react'
import './AnalyzerInfo.scss'

/**
 * Analyzer form info
 */
const AnalyzerInfo = () => {
  return (
    <div className='analyzer-info'>
      <div className="analyzer-info__card">
        <p>
          Choose dates, coin and currency to see how the coin has performed between those dates.
          <br /><br />
          Data will show longest bearish trend, best day to buy and sell and highest volume date.
          <br /><br />
          If you are logged in, you may save searches and results to your account profile.
        </p>
      </div>
    </div>

  )
}

export default AnalyzerInfo