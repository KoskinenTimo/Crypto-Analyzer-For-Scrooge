import React from 'react'
import './TextInput.scss'

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
    <div className="txt-input-cntr form-input-label">
      <label className='txt-input-cntr__title'>{title}<span className="txt-input-cntr__notification--valid form-input-valid">&#10004;&#65039;</span></label>
      <input
        className='txt-input-cntr__input form-input'
        name={name}
        type={type}
        maxLength={maxLength}
        value={value}
        onChange={({ target }) => handler(target)}
        placeholder={placeholder}
        ref={inputRef}
      />
      <span className="txt-input-cntr__notification--error form-input-error">{error}</span>
    </div>
  )
}

export default TextInput