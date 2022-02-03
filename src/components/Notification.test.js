import { screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import { createTestStore, renderWithStore } from '../utils/testHelpers'
import Notification from './Notification'


describe('Notification', () => {
  test('Error message visible, success display none', () => {
    const initialState = { notification: { type: 'error', message: 'error message' } }
    const store = createTestStore(initialState)
    renderWithStore(<Notification />, store)
    const errorDiv = screen.getByTestId('test-id-notification--error')
    const errorDivStyles = getComputedStyle(errorDiv)
    const successDiv = screen.getByTestId('test-id-notification--success')
    const successDivStyles = getComputedStyle(successDiv)
    expect(errorDivStyles.display).toBe('block')
    expect(successDivStyles.display).toBe('none')
  })
  test('Success message visible, error display none', () => {
    const initialState = { notification: { type: 'success', message: 'success message' } }
    const store = createTestStore(initialState)
    renderWithStore(<Notification />, store)
    const errorDiv = screen.getByTestId('test-id-notification--error')
    const errorDivStyles = getComputedStyle(errorDiv)
    const successDiv = screen.getByTestId('test-id-notification--success')
    const successDivStyles = getComputedStyle(successDiv)
    expect(errorDivStyles.display).toBe('none')
    expect(successDivStyles.display).toBe('block')
  })
  test('Timeout cb is fired after 5 seconds', () => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')
    const initialState = { notification: { type: 'success', message: 'success message' } }
    const store = createTestStore(initialState)
    renderWithStore(<Notification />, store)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000)
  })
})