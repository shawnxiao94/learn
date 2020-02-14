import api from '@/common/api'
import * as model from './model'
// 共享画像
export function addEnjoyData(params) {
  return api({
    url: process.env.API_HOST + '/UserShareGroupOpenService/createUserShareGroup',
    method: 'post',
    model: model.addEnjoyData,
    params: params
  })
}
// 共享画像查询渠道
export function queryChannel(params) {
  return api({
    url: process.env.API_HOST + '/UserShareGroupOpenService/queryChannel',
    method: 'post',
    model: model.queryChannel,
    params: params
  })
}