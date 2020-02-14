import api from '@/common/api'
import * as model from './model'
/**
 * 查询画像列表
 */
export function getPortraitList(params) {
  return api({
    url: process.env.API_HOST + '/PortraitOpenService/findByPage',
    method: 'post',
    model: model.getPortraitList,
    params: params
  })
}
/**
 * 查询画像用户数
 */
export function findPortraitUsers(params) {
  return api({
    url: process.env.API_HOST + '/PortraitOpenService/findPortraitUsers',
    method: 'post',
    model: model.findPortraitUsers,
    params: params
  })
}
