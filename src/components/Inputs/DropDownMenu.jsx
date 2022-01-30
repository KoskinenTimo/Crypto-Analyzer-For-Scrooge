import React, { useEffect, useState } from 'react'
import './DropDownMenu.scss'

/**
 * Coin list drop down menu
 */
const DropDownMenu = ({
  title,
  array,
  setter
}) => {
  const [ optionName, setOptionName ] = useState('')

  useEffect(() => {
    setOptionName(array[0].name)
    setter(array[0].id)
  },[])

  /**
   * Handles setting the id value to the state tracking current value,
   * find the id value from the provided array
   * @param {event object} e
   */
  const handleChange = (e) => {
    const foundValue = array.find(part => part.name === e.target.value)
    setOptionName(foundValue.name)
    setter(foundValue.id)
  }

  return (
    <div className="dropdown-menu-cntr">
      <label className='dropdown-menu-cntr__title'>{title}</label>
      <select className='dropdown-menu-cntr__options' onChange={(e) => handleChange(e)} value={optionName}>
        {array.map(part => <option key={part.id}>{part.name}</option>)}
      </select>
    </div>
  )
}

export default DropDownMenu