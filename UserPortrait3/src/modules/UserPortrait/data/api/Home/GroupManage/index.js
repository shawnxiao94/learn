import api from '@/common/api'
import * as model from './model'

/**
 * 用户群列表
 */
export function getGroupList(params) {
  return api({
    url: process.env.API_HOST + '/SourceMysqlOpenService/findByPage',
    method: 'post',
    model: model.getGroupList,
    params: params
  })
}