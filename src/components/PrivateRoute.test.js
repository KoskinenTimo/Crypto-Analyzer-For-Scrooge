import React from 'react'
import { useSelector } from 'react-redux'
import { renderWithRouter } from '../utils/testHelpers'
import PR from './PrivateRoute'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import Cookies from 'js-cookie'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

jest.mock('react-router-dom', () => {
  return {
    Navigate: jest.fn(({ to }) => `Redirected to ${to}`),
  }
})

const TestComponent = () => {
  return (<div>I was rendered!</div>)
}

describe('Testing PrivateRoute', () => {
  test('No user, no cookie, redirect to /login page', () => {
    const mockAppState = {}
    useSelector.mockImplementation(cb => {
      return cb(mockAppState)
    })
    renderWithRouter((<PR><TestComponent /></PR>))
    expect(screen.getByText(/Redirected to \/login/i)).toBeInTheDocument()
  })
  test('No user, auth cookie, redirect to /authenticate page', () => {
    const mockAppState = {}
    useSelector.mockImplementation(cb => {
      return cb(mockAppState)
    })
    Cookies.get = jest.fn().mockImplementation(() => 'authUser')
    renderWithRouter((<PR><TestComponent /></PR>))
    expect(screen.getByText(/Redirected to \/authenticate/i)).toBeInTheDocument()
  })
  test('User exists in store, TestComponent rendered', () => {
    const mockAppState = { authUser: 'TEST' }
    useSelector.mockImplementation(cb => {
      return cb(mockAppState)
    })
    Cookies.get = jest.fn().mockImplementation(() => 'authUser')
    renderWithRouter((<PR><TestComponent /></PR>))
    expect(screen.getByText(/I was rendered!/i)).toBeInTheDocument()
  })
})