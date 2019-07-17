import axiosApi from '@/common/utils/axiosApi'
import * as model from './model'

// 获取菜单列表
export function getPermissionList(params) {
  return axiosApi(
    '/SystemRoleCenterOpenService/getAllAuthorityTree',
    'post',
    model.getPermissionList,
    params
  )
}
