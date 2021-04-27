import $axios from 'axios'
import Vue from 'vue'
// 全局配置
const axios = $axios.create({
  baseURL: 'http://192.168.1.11:3000/',
  timeout: 5000,
  withCredentials: true,
})
let count = 0

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求前做些什么
  count++
  // Vue.showLoading()
  return config;
}, function (error) {
  // 请求错误做些什么
  // Vue.hiddenLoading()
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做些什么
  count--
  if (count === 0) {
    // Vue.hiddenLoading()
  }
  return response;
}, function (error) {
  // 对响应错误做些什么
  // Vue.hiddenLoading()
  return Promise.reject(error);
});

// 封装自己的get/post方法
export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, { params: data })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data)
        .then(function (response) {
          resolve(response.data)
          // console.log(response.data);
          // setLocalStorage('userInfo', JSON.stringify(response.data.profile))
          // setLocalStorage('token', JSON.stringify(response.data.token))
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  all: function (list) {
    return new Promise(function (resolve, reject) {
      Promise.all(list)
        .then(function (...result) {
          // 请求都成功
          resolve(result)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}
