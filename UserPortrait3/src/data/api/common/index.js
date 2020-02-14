import api from '@/common/api'
import * as model from './model'

/**
 * Model 数据中转层
 */
export function test(params) {
  return api({
    url: process.env.API_HOST + '/test',
    method: 'post',
    model: model.test,
    params: params
  })
}