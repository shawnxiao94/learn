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

/**
 * 用户群详情
 */
export function getGroupDetail(params) {
  return api({
    url: process.env.API_HOST + '/UserShareGroupOpenService/findById',
    method: 'post',
    model: model.getGroupDetailModel,
    params: params
  })
}

/**
 * 分页查询历史记录
 */
export function queryBiHistory(params) {
  return api({
    url: process.env.API_HOST + '/BiAnalysisOpenService/queryBiHistory',
    method: 'post',
    model: model.queryBiHistoryModel,
    params: params
  })
}