var ajax = axios.create({
  baseURL: 'http://localhost:3003',
  timeout: 1000,
  headers: {
    'content-Type': 'application/x-www-form-urlencoded;charset=utf8'
  }
});

ajax.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  alert('请求错误');
});

ajax.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  alert('服务器错误');
});