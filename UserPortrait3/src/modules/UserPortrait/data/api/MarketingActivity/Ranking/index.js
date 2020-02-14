import api from '@/common/api'
import * as model from './model'

/**
 * 营销活动排名
 */
export function getRankData(params) {
  return api({
    url: process.env.API_HOST + '/MarketingCenterOpenService/queryActivityRanking',
    method: 'post',
    model: model.getRankData,
    params: params
  })
}