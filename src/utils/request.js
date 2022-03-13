/**
 * axios二次封装
 */
import axios from 'axios';
import config from './../config';

// 创建axios实例对象，添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 5000,
});

// 请求拦截
// service.interceptors.request.use((req) => {
//    return req;
// })

// 响应拦截
// service.interceptors.response.use((res) => {

// })

function request(options) {
  options.method = options.method || 'get';
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data;
  }
  return service(options);
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options,
    });
  };
});

export default request;
