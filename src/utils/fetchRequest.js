import api from "./api"

const fetchRequest = async (route) => {
  const request = await api.get(route)
  console.log(request)
  return request.data
} 

export default fetchRequest