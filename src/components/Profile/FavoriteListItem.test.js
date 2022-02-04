import FavoriteListItem from './FavoriteListItem'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'

const data = {
  'fromDate': '1980-11-11T00:00:00.000Z',
  'toDate': '2020-12-26T01:00:00.000Z',
  'coin': 'bitcoin',
  'currency': 'usd',
  'profit': 24603.298714415414,
  'volume': 81406687324.35088,
  'note': 'TESTI',
  'id': '61ef08adbc5bfdc9b87d3ace'
}

// eslint-disable-next-line react/display-name
jest.mock('./DeleteFavoriteButton', () => () =>
  <button>
    Confirm Delete Button
  </button>
)
// eslint-disable-next-line react/display-name
jest.mock('./NoteAddEditInputCntr', () => () =>
  <div>
    Edit Note Form Container
  </div>
)

describe('FavoriteListItem', () => {
  test('renders component and some data', () => {
    render(<FavoriteListItem data={data}/>)
    expect(screen.getByText(/24603/i)).toBeInTheDocument()
  })
  test('toggle edit buttons', () => {
    const { container,queryAllByText } = render(<FavoriteListItem data={data}/>)
    const addEdit = container.querySelector('.profile-favlist-item__button--add-edit')
    let queryCancel = queryAllByText('Cancel Edit')
    let queryAdd = queryAllByText('Add/Edit Note')
    let queryForm = queryAllByText('Edit Note Form Container')
    expect(queryCancel.length).toBe(0)
    expect(queryForm.length).toBe(0)
    expect(queryAdd.length).toBe(1)
    fireEvent.click(addEdit)

    const cancelEdit = container.querySelector('.profile-favlist-item__button--cancel-edit')
    queryCancel = queryAllByText('Cancel Edit')
    queryForm = queryAllByText('Edit Note Form Container')
    queryAdd = queryAllByText('Add/Edit Note')
    expect(queryCancel.length).toBe(1)
    expect(queryForm.length).toBe(1)
    expect(queryAdd.length).toBe(0)
    fireEvent.click(cancelEdit)

    queryCancel = queryAllByText('Cancel Edit')
    queryAdd = queryAllByText('Add/Edit Note')
    queryForm = queryAllByText('Edit Note Form Container')
    expect(queryCancel.length).toBe(0)
    expect(queryForm.length).toBe(0)
    expect(queryAdd.length).toBe(1)
  })
  test('toggle delete buttons', () => {
    const { container,queryAllByText } = render(<FavoriteListItem data={data}/>)
    const showDelete = container.querySelector('.profile-favlist-item__button--show-delete')
    let queryDelete = queryAllByText('Delete')
    let queryCancel = queryAllByText('Cancel')
    let queryConfirm = queryAllByText('Confirm Delete Button')
    expect(queryDelete.length).toBe(1)
    expect(queryCancel.length).toBe(0)
    expect(queryConfirm.length).toBe(0)
    fireEvent.click(showDelete)

    queryDelete = queryAllByText('Delete')
    queryCancel = queryAllByText('Cancel')
    queryConfirm = queryAllByText('Confirm Delete Button')
    expect(queryDelete.length).toBe(0)
    expect(queryCancel.length).toBe(1)
    expect(queryConfirm.length).toBe(1)
    const cancelDelete = container.querySelector('.profile-favlist-item__button--cancel-delete')
    fireEvent.click(cancelDelete)

    queryDelete = queryAllByText('Delete')
    queryCancel = queryAllByText('Cancel')
    queryConfirm = queryAllByText('Confirm Delete Button')
    expect(queryDelete.length).toBe(1)
    expect(queryCancel.length).toBe(0)
    expect(queryConfirm.length).toBe(0)
  })
})