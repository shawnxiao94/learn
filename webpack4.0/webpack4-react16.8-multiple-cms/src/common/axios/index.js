import axios from "axios"

const base = "api"
const service = axios.create({
  baseURL: base,
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // eslint-disable-next-line no-param-reassign
    config.headers.version = "1"
    return config
  },
  error => {
    Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  response => Promise.resolve(response),
  error => Promise.reject(error),
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
export default function ({
  url, method, model, params = {}, isPost,
}) {
  const pConfig = {
    url,
    method,
  }
  // eslint-disable-next-line no-nested-ternary
  const aParams = params ? model ? model.request(JSON.parse(JSON.stringify(params))) : params : ""
  if (method.toLowerCase() === "post" || isPost) {
    pConfig.data = aParams
  } else {
    pConfig.params = aParams
  }
  return new Promise((resolve, reject) => service(pConfig).then(response => {
    resolve(model ? model.response(response.data) : response.data)
  })
    .catch(error => {
      reject(error)
    }))
}
