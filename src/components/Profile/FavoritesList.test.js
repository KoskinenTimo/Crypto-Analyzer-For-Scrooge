import { render, screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import FavoritesList from './FavoritesList'
import { useSelector } from 'react-redux'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

// eslint-disable-next-line react/display-name
jest.mock('./FavoriteListItem', () => (props) => <div>{props.data.note}</div>)

describe('FavoritesList', () => {
  test('component renders', () => {
    render(<FavoritesList/>)
    expect(screen.getByText('Favorites')).toBeInTheDocument()
  })
  test('no user or user.favorites, render no details', () => {
    render(<FavoritesList/>)
    expect(screen.getByText(/no details/i)).toBeInTheDocument()
  })
  test('user and user.favorites, render favorites', () => {
    const mockAppState = {
      authUser: {
        favorites: [
          {
            id: '1',
            note: 'test1'
          },
          {
            id: '2',
            note: 'test2'
          }
        ]
      }
    }
    useSelector.mockImplementation(cb => {
      return cb(mockAppState)
    })
    render(<FavoritesList/>)
    expect(screen.getByText('test1')).toBeInTheDocument()
    expect(screen.getByText('test1')).toBeInTheDocument()
  })
})