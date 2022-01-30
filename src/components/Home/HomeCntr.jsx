import React from 'react'
import Info from './Info'
import Project from './Project'
import './HomeCntr.scss'

/**
 * Homepage to show some default data fetched from Gecko API
 */
const HomeCntr = () => {
  return (
    <div className="home">
      <h1 className='home__title'>Home</h1>
      <Info />
      <Project />
    </div>
  )
}

export default HomeCntr