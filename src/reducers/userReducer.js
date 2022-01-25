const initialState = ''

const userReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return action.data
  case 'RESET_USER':
    return state = ''
  default:
    return state
  }
}

export const loginUser = (content) => {
  return {
    type: 'LOGIN_USER',
    data: content
  }
}

export const resetUser = () => {
  return {
    type: 'RESET_USER'
  }
}

export default userReducer