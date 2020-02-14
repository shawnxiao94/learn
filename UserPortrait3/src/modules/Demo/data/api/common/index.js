import api from '@/common/api'
import * as model from './model'
export function test(params) {
  return api({
    url: process.env.API_HOST + '/test',
    method: 'post',
    model: model.test,
    params: params
  })
}