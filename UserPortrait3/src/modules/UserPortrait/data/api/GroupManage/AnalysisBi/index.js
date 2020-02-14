import api from '@/common/api'
import * as model from './model'

/**
 * BI分析 - 查询共享给当前渠道的标签信息
 */
export function findTagsByPage(params) {
  return api({
    url: process.env.API_HOST + '/SourceMysqlOpenService/findTagsByPage',
    method: 'post',
    model: model.findTagsByPage,
    params: params
  })
}

/**
 * BI分析 - 查询BI分析结果
 */
export function findBiAnalysisGraphicalByTag(params) {
  return api({
    url: process.env.API_HOST + '/SourceMysqlOpenService/findBiAnalysisGraphicalByTag',
    method: 'post',
    model: model.findBiAnalysisGraphicalByTag,
    params: params
  })
}

/**
 * BI分析 - 保存分析历史记录
 */
export function saveBiAnalysisHistory(params) {
  return api({
    url: process.env.API_HOST + '/SourceMysqlOpenService/saveBiAnalysisHistory',
    method: 'post',
    model: model.saveBiAnalysisHistory,
    params: params
  })
}

/**
 * BI分析 - 回显历史分析记录数据
 */
export function queryHistoryDetail(params) {
  return api({
    url: process.env.API_HOST + '/BiAnalysisOpenService/queryHistoryDetail',
    method: 'post',
    model: model.queryHistoryDetail,
    params: params
  })
}

