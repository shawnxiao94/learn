import api from '@/common/api'
import * as model from './model'
// 禁用按钮
export function disableData(params) {
  return api({
    url: process.env.API_HOST + '/PortraitOpenService/portraitForBid',
    method: 'post',
    model: model.disableData,
    params: params
  })
}