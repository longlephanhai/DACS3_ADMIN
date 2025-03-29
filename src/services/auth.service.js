import axios from "./axios.customize"


const loginAPI = (email, password) => {
  const URL_BACKEND = "/api/v1/auth/login"
  const data = {
    email: email,
    password: password,
  }
  return axios.post(URL_BACKEND, data)
}
const getProfileAPI = () => {
  const URL_BACKEND = "/api/v1/auth/profile"
  return axios.get(URL_BACKEND)
}
const getAllUserAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/users?current=${current}&pageSize=${pageSize}`
  return axios.get(URL_BACKEND)
}
export {
  loginAPI,
  getProfileAPI,
  getAllUserAPI
}