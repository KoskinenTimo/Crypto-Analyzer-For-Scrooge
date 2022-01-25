import axios from 'axios'
import { appBackendUrl } from '../utils/apiPaths'

export const signup = async (userDetails) => {
  return await axios.post(`${appBackendUrl}/api/users`, userDetails)
}

export const getOneUser = async (id,token) => {
  console.log(id)
  return await axios.get(
    `${appBackendUrl}/api/users/${id}`,
    { headers: { Authorization: `Bearer ${token}` } })
}