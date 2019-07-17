import axiosAPI from '@/common/utils/axiosApi'
import * as model from './model'

// 获取菜单列表
export function getCasUserName(params) {
  return axiosAPI(
    '/SystemRoleCenterOpenService/getUserInfoByAccount',
    'post',
    model.getUser,
    params
  )
}
// 检测token帐号是否合法
export function checkTokenAccout(params) {
  return axiosAPI(
    '/SystemRoleCenterOpenService/checkAccount',
    'post',
    null,
    params
  )
}
