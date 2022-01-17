import React, { useEffect, useState } from 'react'


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
   * Handles setting the id value to the state tracking current value
   * @param {event object} e
   */
  const handleChange = (e) => {
    const foundValue = array.find(part => part.name === e.target.value)
    setOptionName(foundValue.name)
    setter(foundValue.id)
  }

  return (
    <label className="form-menu-label">
      <label>{title}</label>
      <select onChange={(e) => handleChange(e)} value={optionName}>
        {array.map(part => <option key={part.id}>{part.name}</option>)}
      </select>
    </label>
  )
}

export default DropDownMenu