import axios from 'axios';

let base = 'api';
const service = axios.create({
  baseURL: base,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers['version'] = '1'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * API请求封装
 * @param  {String} url api请求url
 * @param  {String} method 请求方法，默认为post
 * @param  {String} model
 * @param  {Object} params 入参
 * @param  {String} isPost 请求方法
 * @return 返回一个经加工的axios实例
 */
export default function({url, method, model, params = {}, isPost}) {
  let _config = {
    url: url,
    method: method
  }
  let _params = params ? model ? model.request(JSON.parse(JSON.stringify(params))) : params : ''
  if(method.toLowerCase() === 'post' || isPost) {
    _config.data = _params
  } else {
    _config.params = _params
  }
  return new Promise((resolve, reject) => {
    return service(_config).then(response => {
      resolve(model ? model.response(response.data) : response.data)
    })
    .catch(error => {
      reject(error)
    })
  })

}