import axios from 'axios'
import ErrorMessage from './errorMessage'
import ErrorLog from '@/data/store/ErrorLog'
import moment from 'moment'
import { getToken, loginOut } from '@/common/permission/auth'
import { Modal } from 'antd'
const w = window

let base = 'api'
// 自定义配置新建一个axios实例
const service = axios.create({
  baseURL: base,
  timeout: 60000
})
/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
  config => {
    // token
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    config.headers['version'] = '1'
    return config
  },
  error => {
    Promise.reject(error)
  }
)
/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
  response => {
    if (response.data.ErrorCode !== 0) {
      ErrorLog.addErrorLog({
        title: 'response.data.ErrorCode 不等于 0',
        message: response.data.ErrorMessage,
        log: {
          api: response.config.url,
          params: response.config.data,
          data: JSON.stringify(response.data) || '{}'
        },
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        url: w.location.hash
      })
      return Promise.reject(response)
    } else {
      if (response.data.Result.errCode !== 0) {
        ErrorLog.addErrorLog({
          title: 'errCode 不等于 0',
          message: response.data.Result.errMsg,
          log: {
            api: response.config.url,
            params: response.config.data,
            data: JSON.stringify(response.data) || '{}'
          },
          time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          url: w.location.hash
        })
        return Promise.reject(response)
      }
      return Promise.resolve(response)
    }
  },
  error => {
    if (!error.response) {
      // 服务器请求失败时错误提示
      ErrorLog.addErrorLog({
        title: '请求超时',
        message: ErrorMessage.API_ERROR_LOAD,
        log: {
          api: error.config.url,
          params: error.config.data,
          data: JSON.stringify(error.data) || '{}'
        },
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        url: w.location.hash
      })
    } else {
      switch (error.response.status) {
        case 400:
          error.message = ErrorMessage.STATUS_400
          break
        case 401:
          /**
           * 防止重复提示
           */
          if (window.isLoginout) return false
          window.isLoginout = true
          Modal.error({
            title: '提示',
            content: '用户信息校验失败，请重新登录',
            okText: '确定',
            keyboard: false,
            onOk() {
              loginOut()
            }
          })
          break
        case 403:
          error.message = ErrorMessage.STATUS_403
          break
        case 404:
          error.message = ErrorMessage.STATUS_404
          break
        case 408:
          error.message = ErrorMessage.STATUS_408
          break
        case 500:
          error.message = ErrorMessage.STATUS_500
          break
        case 501:
          error.message = ErrorMessage.STATUS_501
          break
        case 502:
          error.message = ErrorMessage.STATUS_502
          break
        case 503:
          error.message = ErrorMessage.STATUS_503
          break
        case 504:
          error.message = ErrorMessage.STATUS_504
          break
        case 505:
          error.message = ErrorMessage.STATUS_505
          break
        default:
      }
      ErrorLog.addErrorLog({
        title: '请求失败',
        message: error.message,
        log: {
          api: error.config.url,
          params: error.config.data,
          data: JSON.stringify(error.data) || '{}'
        },
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        url: w.location.hash
      })
    }
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
export default function({ url, method, model, params = {}, isPost }) {
  let _config = {
    url: url,
    method: method
  }
  let _params = params
    ? model
      ? model.request(JSON.parse(JSON.stringify(params)))
      : params
    : ''
  if (method.toLowerCase() === 'post' || isPost) {
    _config.data = _params
  } else {
    _config.params = _params
  }
  return new Promise((resolve, reject) => {
    return service(_config)
      .then(response => {
        resolve(model ? model.response(response.data) : response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
