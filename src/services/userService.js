import axios from 'axios'
import { appBackendUrl } from '../utils/constants/apiPaths'

export const signup = async (userDetails) => {
  return await axios.post(`${appBackendUrl}/api/users`, userDetails)
}