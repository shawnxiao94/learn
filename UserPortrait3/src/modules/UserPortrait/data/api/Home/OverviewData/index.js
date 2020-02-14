import api from '@/common/api'
import * as model from './model'

export function general(params) {
  return api({
    url: process.env.API_HOST + '/OverviewOpenService/generalData',
    method: 'post',
    model: model.general,
    params: params
  })
}