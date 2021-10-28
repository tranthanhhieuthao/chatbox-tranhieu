import axios from 'axios'

const service = axios.create({
    timeout: 300000,
    baseURL: 'http://localhost:8081/api/v1'
})

service.interceptors.request.use(
    config => {
        // config.headers['Authorization'] = 'Bearer ' + accessToken
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

service.interceptors.response.use(
    response => {
      const res = response.data
      if (res.message === 'SUCCESS') {
        console.log('tranhieu', res)
        return res
      } else {
        return Promise.reject(new Error(res.message || 'ERROR'))
      }
    },
    error => {
      return Promise.reject(error)
    }
  )

  export default service