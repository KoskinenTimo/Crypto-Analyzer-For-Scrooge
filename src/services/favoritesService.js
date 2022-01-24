import axios from 'axios'
import { appBackendUrl } from '../utils/apiPaths'

export const createFavorite = async (data,token) => {
  console.log(data)
  return await axios.post(
    `${appBackendUrl}/api/favorites`,
    data,
    { headers: { Authorization: `Bearer ${token}` } })
}