const initialState = {
  type: '',
  message: ''
}

const notificationReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'CREATE_ERROR_NOTIFICATION':
    return state = action.data
  case 'CREATE_SUCCESS_NOTIFICATION':
    return state = action.data
  case 'CREATE_PROCESS_NOTIFICATION':
    return state = action.data
  case 'RESET_NOTIFICATION':
    return state = initialState
  default:
    return state
  }
}

export const createErrorNotification = (content) => {
  return {
    type: 'CREATE_ERROR_NOTIFICATION',
    data: {
      type: 'error',
      message: content
    }
  }
}

export const extractErrorMsg = (err) => {
  if (
    err.response &&
    err.response.data &&
    err.response.data.error
  ) {
    return err.response.data.error
  }
  return err.message
}

export const createSuccessNotification = (content) => {
  return {
    type: 'CREATE_SUCCESS_NOTIFICATION',
    data: {
      type: 'success',
      message: content
    }
  }
}

export const createProcessNotification = (content) => {
  return {
    type: 'CREATE_PROCESS_NOTIFICATION',
    data: {
      type: 'process',
      message: content
    }
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default notificationReducer