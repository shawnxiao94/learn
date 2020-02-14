import api from '@/common/api'
import * as model from './model'
import Root from '@/data/store/Root'
/**
 * 获取用户信息
 */
export function getUserInfoByAccount() {
  return api({
    url: process.env.API_HOST +
    '/SystemRoleCenterOpenService/getUserInfoByAccount',
    method: 'post',
    model: model.getUserInfoByAccount,
    params: { sysId: Root.userInfo.sysId }
  })
}

/**
 * 校验用户token
 */
export function checkTokenAccout() {
  return api({
    url: process.env.API_HOST +
    '/SystemRoleCenterOpenService/checkAccount',
    method: 'post',
    model: null,
    params: { sysId: Root.userInfo.sysId }
  })
}

/**
 * 获取菜单列表
 */
export function getAllAuthorityTree() {
  return api({
    url: process.env.ROLE_CENTER +
    '/SystemRoleCenterOpenService/getAllAuthorityTree',
    method: 'post',
    model: model.getAllAuthorityTree,
    params: { sysId: Root.userInfo.sysId }
  })
}
