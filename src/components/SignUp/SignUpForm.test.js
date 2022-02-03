import SignUpForm from './SignUpForm'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import { useSelector } from 'react-redux'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))
jest.mock('react-router-dom', () => {
  return {
    Navigate: jest.fn(({ to }) => `Redirected to ${to}`),
  }
})
const submitData = jest.fn()

describe('SignUpForm', () => {
  afterEach(() => {
    useSelector.mockClear()
    mockDispatch.mockClear()
  })
  beforeEach(() => {
    const mockAppState = ''
    useSelector.mockImplementation(callback => {
      return callback(mockAppState)
    })
  })
  test('authUser in store, redirect to /', () => {
    const mockAppState = { authUser: 'testing' }
    useSelector.mockImplementation(callback => {
      return callback(mockAppState)
    })
    render(<SignUpForm submitData={submitData}/>)
    expect(screen.getByText('Redirected to /')).toBeInTheDocument()
  })
  test('Name field is wrong, too short or too long', () => {
    const form = render(<SignUpForm submitData={submitData}/>)
    const nameInput = form.container.querySelector('input[name=name]')
    fireEvent.change(nameInput, {
      target: { value: 't' }
    })
    expect(screen.getByText(/Name is required and must be between 2-20/i)).toBeInTheDocument()
    fireEvent.change(nameInput, {
      target: { value: 'tttttttttttttttttttttttttttttt' }
    })
    expect(screen.getByText(/Name is required and must be between 2-20/i)).toBeInTheDocument()
  })
  test('Username is wrong, too short or too long', () => {
    const form = render(<SignUpForm submitData={submitData}/>)
    const usernameInput = form.container.querySelector('input[name=username]')
    fireEvent.change(usernameInput, {
      target: { value: 't' }
    })
    expect(screen.getByText(/Username is required and must be between 5-15/i)).toBeInTheDocument()
    fireEvent.change(usernameInput, {
      target: { value: 'tttttttttttttttttttttttttttttt' }
    })
    expect(screen.getByText(/Username is required and must be between 5-15/i)).toBeInTheDocument()
  })
  test('Password is wrong, too short', () => {
    const form = render(<SignUpForm submitData={submitData}/>)
    const passwordInput = form.container.querySelector('input[name=password]')
    fireEvent.change(passwordInput, {
      target: { value: 'passwo' }
    })
    expect(screen.getByText(/Password is required and must/i)).toBeInTheDocument()
  })
  test('ReType password does not match', () => {
    const form = render(<SignUpForm submitData={submitData}/>)
    const passwordInput = form.container.querySelector('input[name=password]')
    const rePasswordInput = form.container.querySelector('input[name=rePassword]')
    fireEvent.change(passwordInput, {
      target: { value: 'password' }
    })
    fireEvent.change(rePasswordInput, {
      target: { value: 'passwor' }
    })
    expect(screen.getByText(/Must match the password/i)).toBeInTheDocument()
  })
  test('Name is valid', () => {
    const form = render(<SignUpForm submitData={submitData}/>)
    const nameInput = form.container.querySelector('input[name=name]')
    fireEvent.change(nameInput, {
      target: { value: 'name' }
    })
    const validMark = document.getElementsByClassName('txt-input-cntr__notification--valid')[0]
    const style = window.getComputedStyle(validMark)
    expect(style.display).toBe('inline-block')
  })
  test('Username is valid', () => {
    const form = render(<SignUpForm submitData={submitData}/>)
    const usernameInput = form.container.querySelector('input[name=username]')
    fireEvent.change(usernameInput, {
      target: { value: 'username' }
    })
    const validMark = document.getElementsByClassName('txt-input-cntr__notification--valid')[1]
    const style = window.getComputedStyle(validMark)
    expect(style.display).toBe('inline-block')
  })
  test('Password is valid', () => {
    const form = render(<SignUpForm submitData={submitData}/>)
    const passwordInput = form.container.querySelector('input[name=password]')
    fireEvent.change(passwordInput, {
      target: { value: 'password' }
    })
    const validMark = document.getElementsByClassName('txt-input-cntr__notification--valid')[2]
    const style = window.getComputedStyle(validMark)
    expect(style.display).toBe('inline-block')
  })
  test('RePassword is valid', () => {
    const form = render(<SignUpForm submitData={submitData}/>)
    const passwordInput = form.container.querySelector('input[name=password]')
    fireEvent.change(passwordInput, {
      target: { value: 'password' }
    })
    const rePasswordInput = form.container.querySelector('input[name=rePassword]')
    fireEvent.change(rePasswordInput, {
      target: { value: 'password' }
    })
    const validMark = document.getElementsByClassName('txt-input-cntr__notification--valid')[3]
    const style = window.getComputedStyle(validMark)
    expect(style.display).toBe('inline-block')
  })
  test('Submitting non-valid details does not go forward with form submit', () => {
    const form = render(<SignUpForm submitData={submitData}/>)
    const rePasswordInput = form.container.querySelector('input[name=rePassword]')
    const passwordInput = form.container.querySelector('input[name=password]')
    const usernameInput = form.container.querySelector('input[name=username]')
    const nameInput = form.container.querySelector('input[name=name]')
    const formElement = form.container.querySelector('form')
    fireEvent.change(nameInput, {
      target: { value: 'name' }
    })
    fireEvent.change(usernameInput, {
      target: { value: 'username' }
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password' }
    })
    fireEvent.change(rePasswordInput, {
      target: { value: 'passwor' }
    })
    fireEvent.submit(formElement)
    expect(submitData).toBeCalledTimes(0)
  })
  test('Submitting valid details goes forward with form submit', () => {
    const form = render(<SignUpForm submitData={submitData}/>)
    const rePasswordInput = form.container.querySelector('input[name=rePassword]')
    const passwordInput = form.container.querySelector('input[name=password]')
    const usernameInput = form.container.querySelector('input[name=username]')
    const nameInput = form.container.querySelector('input[name=name]')
    const formElement = form.container.querySelector('form')
    fireEvent.change(nameInput, {
      target: { value: 'name' }
    })
    fireEvent.change(usernameInput, {
      target: { value: 'username' }
    })
    fireEvent.change(passwordInput, {
      target: { value: 'password' }
    })
    fireEvent.change(rePasswordInput, {
      target: { value: 'password' }
    })
    fireEvent.submit(formElement)
    expect(submitData).toBeCalledTimes(1)
    expect(mockDispatch).toBeCalledTimes(1)
  })
})