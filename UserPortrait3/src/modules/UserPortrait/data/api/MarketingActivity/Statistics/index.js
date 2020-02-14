import api from '@/common/api'
import * as model from './model'

/**
 * 营销活动统计
 */
export function queryStatisticsOfMarketingActivities(params) {
  return api({
    url: process.env.API_HOST + '/MarketingCenterOpenService/queryStatisticsOfMarketingActivities',
    method: 'post',
    model: model.queryStatisticsOfMarketingActivities,
    params: params
  })
}