import Axios from 'axios'

const Service = Axios.create({
  baseURL: 'https://apis.imooc.com',
  timeout: 5000
})

Service.interceptors.response.use(
  response => {
    if (response.status === '200' && response.data) {
      return response.data
    } else {
      return Promise.reject(new Error('请求失败'))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default Service
