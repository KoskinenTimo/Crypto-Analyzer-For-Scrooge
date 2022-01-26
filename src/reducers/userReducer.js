const initialState = ''

const userReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return action.data
  case 'RESET_USER':
    return ''
  case 'UPDATE_USER':
    return { ...state, ...action.data }
  case 'DELETE_USER_FAVORITE': {
    const filteredFavorites = state.favorites.filter(fav => fav.id !== action.data)
    return { ...state, favorites: filteredFavorites }
  }
  case 'UPDATE_USER_FAVORITE': {
    const updatedFavorites = state.favorites.map(fav => {
      if (fav.id === action.data.id) return action.data
      return fav
    })
    return { ...state, favorites: updatedFavorites }
  }
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

export const updateUser = (content) => {
  return {
    type: 'UPDATE_USER',
    data: content
  }
}

export const deleteUserFavorite = (id) => {
  return {
    type: 'DELETE_USER_FAVORITE',
    data: id
  }
}

export const updateUserFavorite = (content) => {
  return {
    type: 'UPDATE_USER_FAVORITE',
    data: content
  }
}

export default userReducer