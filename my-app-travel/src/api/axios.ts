import axios from 'axios'

export const axiosApi = axios.create({
  baseURL: 'http://192.168.0.113:9999/',
  timeout: 10000,
  withCredentials: true,
})
