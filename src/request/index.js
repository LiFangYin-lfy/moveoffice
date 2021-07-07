// 导出一个配置好的axios提供给main挂载
import axios from 'axios'
import {
  Toast
} from 'vant';
import router from '@/router'
import JSONBIG from 'json-bigint'
import Variate from '../utils/variate' // 导入域名文件

// 对axios进行配置
// baseURL  作用：设置基准地址（前面一段相同的地址）
axios.defaults.baseURL = Variate.baseURL;
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]

axios.defaults.withCredentials = false;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; //配置请求头
// 请求拦截器
axios.interceptors.request.use(config => {
  let token = window.localStorage.getItem('move_token')
  if (token) {
    //将token放到请求头发送给服务器,将tokenkey放在请求头中
    config.headers['Authorization'] = `Bearer ${token}` || '';
    //也可以这种写法
    // config.headers['Authorization'] = 'Bearer ' + token || '';
  }
  return config;
}, err => {
  Toast.fail('请求超时');
  return Promise.reject(err)
})
// 响应拦截器
axios.interceptors.response.use(res => {
  // console.log(res);
  if (res.data.code == 200) {
    // console.log(res);
    return Promise.resolve(res);
  } else if (res.data.code == 401) {
    window.localStorage.removeItem('move_token')
    router.push('/login');
    return Promise.reject(res);
  } else if (res.data.code == 404) {
    router.push('/sos')
    return Promise.reject(res)
  } else if (res.data.code == 500) {
    console.log(res.data);
    return Promise.reject(res)
  }
}, err => {
  console.log(err, '响应失败')
  if (err.response) {
    switch (err.response.code) {
      case 401:
        window.localStorage.removeItem('move_token')
        router.push('/login');
    }
  }
  return Promise.reject(err.response.data) // 返回接口返回的错误信息
})

let baseURL = '';
// 通用方法
export const POST = (url, params) => {
  return axios.post(`${baseURL}${url}`, params).then(res => res)
}
export const GET = (url, params) => {
  return axios.get(`${baseURL}${url}`, {
    params: params
  }).then(res => res.data)
}
export const PUT = (url, params) => {
  return axios.put(`${baseURL}${url}`, params).then(res => res)
}

export const DELETE = (url, params) => {
  return axios.delete(`${baseURL}${url}`, {
    params: params
  }).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${baseURL}${url}`, params).then(res => res.data)
}

export default axios
