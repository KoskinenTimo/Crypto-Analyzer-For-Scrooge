import NoteAddEditInput from './NoteAddEditInput'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'

let data = { note: 'test note' }
const handleSubmit = jest.fn(note => note)

describe('NoteAddEditInput', () => {
  test('component renders', () => {
    const { container } = render(<NoteAddEditInput data={data} handleSubmit={handleSubmit} />)
    expect(container).toHaveTextContent('Submit')
  })
  test('text area has initial value from props', () => {
    const { container } = render(<NoteAddEditInput data={data} handleSubmit={handleSubmit} />)
    const textArea = container.querySelector('.profile-favlist-item__textarea')
    textArea.value
    expect(textArea.value).toBe('test note')
  })
  test('handleSubmit called when submit is clicked and new value submitted', () => {
    const { container } = render(<NoteAddEditInput data={data} handleSubmit={handleSubmit} />)
    const textArea = container.querySelector('.profile-favlist-item__textarea')
    const submitButton = container.querySelector('.profile-favlist-note-edit-flexbox')
    fireEvent.change(textArea, {
      target: { value: 'new note' }
    })
    fireEvent.submit(submitButton)
    expect(handleSubmit).toBeCalledTimes(1)
    expect(screen.getByText('new note')).toBeInTheDocument()
  })
})