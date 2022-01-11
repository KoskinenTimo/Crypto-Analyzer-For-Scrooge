import axios from 'axios'
import { appBackendUrl } from '../utils/constants/apiPaths'

export const login = async (credentials) => {
  return await axios.post(`${appBackendUrl}/api/login`, credentials)
}

export const checkToken = async (token) => {
  return await axios.get(`${appBackendUrl}/api/login`,
    { headers: { 'Authorization': `Bearer ${token}` } })
}