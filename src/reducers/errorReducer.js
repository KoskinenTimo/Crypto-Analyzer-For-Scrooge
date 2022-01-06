const initialState = ''

const errorReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'CREATE_ERROR':
    return state = action.data
  case 'RESET_ERROR':
    return state = ''
  default:
    return state
  }
}

export const createError = (content) => {
  return {
    type: 'CREATE_ERROR',
    data: content
  }
}

export const resetError = () => {
  return {
    type: 'RESET_ERROR'
  }
}

export default errorReducer