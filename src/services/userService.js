import axios from 'axios'
import { appBackendUrl } from '../utils/constants/apiPaths'

export const login = async (credentials) => {
  return await axios.post(`${appBackendUrl}/login`, credentials)
}