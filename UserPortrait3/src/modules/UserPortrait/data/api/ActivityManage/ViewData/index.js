import api from '@/common/api'
import * as model from './model'

/**
 * 查询活动数据
 */
export function queryActivityChartById(params) {
  return api({
    url: process.env.API_HOST + '/SourceMysqlOpenService/queryActivityChartById',
    method: 'post',
    model: model.queryActivityChartById,
    params
  })
}

/**
 * 根据子活动信息查找子群信息
 */
export function queryUserShareGroupByChildActivityId(params) {
  return api({
    url: process.env.API_HOST + '/ActivityMarketOpenService/queryUserShareGroupByChildActivityId',
    method: 'post',
    model: model.queryUserShareGroupByChildActivityIdModel,
    params
  })
}