var ajax = axios.create({
  baseURL: 'http://localhost:3003',
  timeout: 1000
})

ajax.interceptors.request.use(function (config) {
  return config
}, function (error) {
  alert('请求错误')
})

ajax.interceptors.response.use(function (response) {
  return response
}, function (error) {
  alert('服务器错误')
})

export {
  ajax
}