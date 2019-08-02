import axios from 'axios'
import Cookies from 'js-cookie'
import ErrorMessage from './errorMessage'
import ErrorLog from '@/data/store/ErrorLog'
import moment from 'moment'
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
        if (Cookies.get('JSESSIONID')) {
            config.headers['Authorization'] = 'Bearer ' + Cookies.get('JSESSIONID')
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
                    error.message = ErrorMessage.STATUS_401
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
 * @return 如果key不存在返回null，存在则返回对应value
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
