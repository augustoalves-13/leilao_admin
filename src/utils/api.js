import axios from "axios";

export const API_URL = 'http://localhost:5050/'

const api = axios.create({
  baseURL: 'http://localhost:5050/api/v0/'
})

export default api