import axiosApi from '@common/axiosApi'
import * as model from './model'

// 获取权限接口
export function getPermission (params) {
  return axiosApi({
    url: '/permission',
    method: 'post',
    model: model.permission,
    params: params
  })
}
