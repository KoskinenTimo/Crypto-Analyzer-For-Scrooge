import React from 'react'
import './Info.scss'

/**
 * Basic info for the app home page
 */
const Info = () => {
  return(
    <div className="home-info">
      <h4 className='home-info__title'>General Info</h4>
      <p className='home-info__txt'>
        This Project/App is the final project of MOOC Full Stack 2021 Open course. There is a file tracking hours used, in the front repository. App is live on Heroku and link can be provided for that. Front end code can be found in GitHub: <br /><strong>KoskinenTimo/Crypto-Analyzer-For-Scrooge</strong><br /> And back end code is also found in GitHub: <br /><strong>KoskinenTimo/Crypto-Analyzer-For-Scrooge-API</strong>
      </p>
    </div>
  )
}

export default Info