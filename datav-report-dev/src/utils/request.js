import Axios from 'axios'

const Service = Axios.create({
  baseURL: 'https://apis.imooc.com',
  timeout: 5000
})

Service.interceptors.response.use(
  response => {},
  error => {
    return Promise.reject(error)
  }
)

export default Service
