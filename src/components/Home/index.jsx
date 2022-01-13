import React from 'react'
import Info from './Info'
import TopCoins from './TopCoins'


/**
 * Homepage to show some default data fetched from Gecko API
 */
const Home = () => {
  return (
    <div className="dataview-container">
      <h1 className='form-title'>Home</h1>
      <Info />
      <TopCoins />
    </div>
  )
}

export default Home