import axios from "./axios.customize"

const getAllCategoryAPI = () => {
  const URL_BACKEND = "/api/v1/category"
  return axios.get(URL_BACKEND)
}
const createCategoryAPI = (data) => {
  const URL_BACKEND = "/api/v1/category"
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('isActive', data.isActive)
  formData.append('image', data.image)
  return axios.post(URL_BACKEND, formData, config)
}
export {
  getAllCategoryAPI,
  createCategoryAPI
}