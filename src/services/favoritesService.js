import axios from 'axios'
import { appBackendUrl } from '../utils/apiPaths'

export const createFavorite = async (data,token) => {
  return await axios.post(
    `${appBackendUrl}/api/favorites`,
    data,
    { headers: { Authorization: `Bearer ${token}` } })
}

export const updateFavorite = async (token,update,id) => {
  return await axios.put(
    `${appBackendUrl}/api/favorites/${id}`,
    update,
    { headers: { Authorization: `Bearer ${token}` } })
}

export const deleteFavorite = async (token,id) => {
  return await axios.delete(
    `${appBackendUrl}/api/favorites/${id}`,
    { headers: { Authorization: `Bearer ${token}` } })
}