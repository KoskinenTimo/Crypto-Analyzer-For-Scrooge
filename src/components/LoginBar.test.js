import LoginBar from './LoginBar'
import { screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import { createTestStore, renderWithStore } from '../utils/testHelpers'

describe('LoginBar', () => {
  test('authUser in store, welcome and logout visible', () => {
    const store = createTestStore({ authUser: { username: 'test' } })
    renderWithStore(<LoginBar/>, store)
    expect(screen.getByText(/test/i)).toBeInTheDocument()
    expect(screen.getByText('Log Out')).toBeInTheDocument()
  })
  test('authUser not in store, login and signup visible', () => {
    const store = createTestStore()
    renderWithStore(<LoginBar/>, store)
    expect(screen.getByText('Log In')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })
})