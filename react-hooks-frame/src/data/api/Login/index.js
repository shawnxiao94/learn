import axiosApi from '@common/axiosApi'
import * as model from './model'

// 登录验证接口
export function checkLogin (params) {
  return axiosApi({
    url: '/login',
    method: 'post',
    model: model.login,
    params: params
  })
}
