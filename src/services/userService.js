import axios from 'axios'
import { appBackendUrl } from '../utils/apiPaths'

export const signup = async (userDetails) => {
  return await axios.post(`${appBackendUrl}/api/users`, userDetails)
}