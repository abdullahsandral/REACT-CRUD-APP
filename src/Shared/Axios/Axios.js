import axios from 'axios';

const AxiosConfig = axios.create({
  baseURL: 'http://89.89.89.53:5001/api/v1/',
})

AxiosConfig.interceptors.request.use(request => {

  if (request.method !== 'get' && JSON.parse(localStorage.getItem('USER_DATA'))) {
    request.headers['AUTHORIZATION'] = JSON.parse(localStorage.getItem('USER_DATA')).token
  }

  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

export default AxiosConfig;