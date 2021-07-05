import axios from 'axios'

const ERR_OK = 0
const baseURL = 'http://localhost:3001/'

axios.defaults.baseURL = baseURL

export function get(url: string, params?: any) {
  return axios.get(url, {
    params
  }).then(res => {
    const serverData = res.data
    if (serverData.code === ERR_OK) {
      return serverData.result
    }
  }).catch(e => {
    console.log(e)
  })
}
