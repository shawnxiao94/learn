import api from '@/common/api'
import * as model from './model'

/**
 * 获取子用户群列表
 */
export function queryChildUserGroup(params) {
  return api({
    url: process.env.API_HOST + '/ActivityMarketOpenService/queryChildUserGroup',
    method: 'post',
    model: model.queryChildUserGroupModel,
    params: params
  })
}

/**
 * 新增-子活动
 */
export function createChildActivity(params) {
  return api({
    url: process.env.API_HOST + '/ActivityMarketOpenService/createChildActivity',
    method: 'post',
    model: model.createChildActivityModel,
    params: params
  })
}

/**
 * 编辑-子活动
 */
export function updateChildActivity(params) {
  return api({
    url: process.env.API_HOST + '/ActivityMarketOpenService/updateChildActivity',
    method: 'post',
    model: model.updateChildActivityModel,
    params: params
  })
}