import axios from 'axios'

const instance = axios.create({
  baseURL: `http://${process.env.HOSt || 'localhost'}:${process.env.PORT || 3000}`,
  time: 1000,
  headers: {
  }
})

export default instance
