const initialState = ''

const userReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'NEW_USER':
    return state = action.data
  case 'RESET_USER':
    return state = ''
  default:
    return state
  }
}

export default userReducer