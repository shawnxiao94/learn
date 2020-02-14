import api from '@/common/api'
import * as model from './model'

/**
 * 上汽用户业务分布
 */

/**
 * 数据概览
 */
export function businessOverview(params) {
  return api({
    url: process.env.API_HOST + '/OverviewOpenService/businessOverview',
    method: 'post',
    model: model.businessOverview,
    params: params
  })
}

/**
 * 业务趋势
 */
export function businessTrend(params) {
  return api({
    url: process.env.API_HOST + '/OverviewOpenService/businessTrend',
    method: 'post',
    model: model.businessTrend,
    params: params
  })
}