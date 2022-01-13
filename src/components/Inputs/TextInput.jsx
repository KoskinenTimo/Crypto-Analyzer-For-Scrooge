import React from 'react'


/**
 * Re-usable input field for text
 */
const TextInput = ({
  title='',
  name='',
  maxLength=20,
  value,
  handler,
  placeholder='',
  inputRef=null,
  error='Make sure the input is in correct form',
  type='text'
}) => {

  return (
    <label className="form-input-label">
      <label>{title}<span className="form-input-valid">&#10004;&#65039;</span></label>
      <input
        className='form-input'
        name={name}
        type={type}
        maxLength={maxLength}
        value={value}
        onChange={({ target }) => handler(target)}
        placeholder={placeholder}
        ref={inputRef}
      />
      <span className="form-input-error">{error}</span>
    </label>
  )
}

export default TextInput