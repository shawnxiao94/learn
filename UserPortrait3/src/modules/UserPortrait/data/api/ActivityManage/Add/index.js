import api from '@/common/api'
import * as model from './model'

/**
 * 获取用户群列表
 */
export function queryBaseUserGroup(params) {
  return api({
    url: process.env.API_HOST + '/ActivityMarketOpenService/queryBaseUserGroup',
    method: 'post',
    model: model.queryBaseUserGroupModel,
    params: params
  })
}

/**
 * 新增-主活动
 */
export function addActivity(params) {
  return api({
    url: process.env.API_HOST + '/ActivityMarketOpenService/saveActivity',
    method: 'post',
    model: model.addActivityModel,
    params: params
  })
}

/**
 * 编辑-主活动
 */
export function updateActivity(params) {
  return api({
    url: process.env.API_HOST + '/ActivityMarketOpenService/updateActivity',
    method: 'post',
    model: model.updateActivityModel,
    params: params
  })
}