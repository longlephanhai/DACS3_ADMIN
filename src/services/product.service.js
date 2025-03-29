import axios from "./axios.customize"

const createProductAPI = (data) => {
  const URL_BACKEND = "/api/v1/products"
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const formData = new FormData()
  formData.append('image', data.image)
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('price', data.price)
  formData.append('quantity', data.quantity)
  formData.append('category', data.category)
  formData.append('isActive', data.isActive)
  return axios.post(URL_BACKEND, formData, config)
}
export {
  createProductAPI
}