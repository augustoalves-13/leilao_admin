import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5050/api/v0/'
})
  
export default api