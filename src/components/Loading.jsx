import React from 'react'
import './Loading.scss'

/**
 * Loading component to display a loading message when app is getting/processing
 * data from the gecko API.
 */
const Loading = () => {
  return(
    <h1 className="loading">
      LOADING...
    </h1>
  )
}


export default Loading