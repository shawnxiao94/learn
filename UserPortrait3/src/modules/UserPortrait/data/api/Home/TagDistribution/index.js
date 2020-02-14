import api from '@/common/api'
import * as model from './model'

/**
 * 上汽用户业务分布
 */
export function getBusinessPercent(params) {
  return api({
    url: process.env.API_HOST + '/OverviewOpenService/businessPercent',
    method: 'post',
    model: model.getBusinessPercentModel,
    params: params
  })
}