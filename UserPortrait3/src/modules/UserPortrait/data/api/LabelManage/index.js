import api from '@/common/api'
import * as model from './model'
/**
 * 获取详情接口
 */
export function queryTagByTagId(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/queryTagByTagId',
    method: 'post',
    model: model.queryTagByTagId,
    params: params
  })
}