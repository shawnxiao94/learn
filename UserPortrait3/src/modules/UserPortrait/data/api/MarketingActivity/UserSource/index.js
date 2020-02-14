import api from '@/common/api'
import * as model from './model'

/**
 * 活动用户来源
 */
export function queryActiveUserSource(params) {
  return api({
    url: process.env.API_HOST + '/MarketingCenterOpenService/queryActiveUserSource',
    method: 'post',
    model: model.queryActiveUserSource,
    params: params
  })
}