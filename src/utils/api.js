import axios from "axios";

export const API_URL = 'http://195.35.14.48:5050/'

const api = axios.create({
  baseURL: 'http://195.35.14.48:5050/api/v0/'
})

export default api

