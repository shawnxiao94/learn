import api from '@/common/api'
import * as model from './model'

/**
 * 营销活动面板
 */
export function marketingGeneral(params) {
  return api({
    url: process.env.API_HOST + '/MarketingCenterOpenService/marketingGeneral',
    method: 'post',
    model: model.marketingGeneral,
    params: params
  })
}
