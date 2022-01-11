import React from 'react'


const TextInput = ({
  title='',
  name='',
  maxLength=20,
  value,
  handler,
  placeholder='',
  ref=null,
  error='Make sure the input is in correct form'
}) => {
  return (
    <label className="input-label">
      <label>{title}<span className="form-input-valid">&#10004;&#65039;</span></label>
      <input
        className='form-input'
        name={name}
        type="text"
        maxLength={maxLength}
        value={value}
        onChange={({ target }) => handler(target)}
        placeholder={placeholder}
        ref={ref}
      />
      <span className="form-input-error">{error}</span>
    </label>
  )
}

export default TextInput