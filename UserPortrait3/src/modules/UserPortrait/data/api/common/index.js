import api from '@/common/api'
import * as model from './model'

/**
 * 所有来源
 */
export function getFromSelect(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/queryChannels',
    method: 'post',
    model: model.getFromSelectModel,
    params: params
  })
}