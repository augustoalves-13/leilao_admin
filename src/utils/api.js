import axios from "axios";

const api = axios.create({
  baseURL: 'http://195.35.14.48:5050/api/v0/'
})
  
export default api