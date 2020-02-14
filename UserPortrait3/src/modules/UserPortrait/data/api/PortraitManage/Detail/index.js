import api from '@/common/api'
import * as model from './model'
// 画像详情
export function findByPortraitId(params) {
  return api({
    url: process.env.API_HOST + '/PortraitOpenService/findByPortraitId',
    method: 'post',
    model: model.findByPortraitId,
    params: params
  })
}