// axios 二次封装
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, Method } from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'
import router from '../router'

const TOKEN_INVALID = 'Token 认证失败，请从新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

// 创建 axios 实例对象，添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})

// 请求拦截
service.interceptors.request.use(req => {
  // TODO
  const headers = req.headers
  if (headers.Authorization) headers.Authorization = 'Bear xiao'
  return req
})

// 响应拦截
service.interceptors.response.use(res => {
  const { code, data, msg } = res.data
  if (code === 0) {
    return data
  } else if (code === 40001) {
    ElMessage.error(TOKEN_INVALID)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_INVALID)
  } else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

// const methodTypeArr: Array<Method> = ['get', 'post', 'put', 'delete', 'patch']
const request = (options: AxiosRequestConfig) => {
  options.method = options.method || 'GET'
  if (options.method.toLocaleLowerCase() === 'GET') {
    options.params = options.data
  }

  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }

  return service(options)
}

// methodTypeArr.forEach((item) => {
//   request[item] = (url: string, data: any, option: AxiosRequestConfig) => {
//     return request({
//       url,
//       data,
//       method: item,
//       ...option
//     })
//   }
// })

export default request
