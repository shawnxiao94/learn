import api from '@/common/api'
import * as model from './model'

/**
 * 查询详情-主活动
 */
export function queryParentActivityById(params) {
  return api({
    url: process.env.API_HOST + '/ActivityMarketOpenService/queryActivityById',
    method: 'post',
    model: model.queryParentActivityByIdModel,
    params: params
  })
}

/**
 * 查询详情-子活动
 */
export function querySubActivityById(params) {
  return api({
    url: process.env.API_HOST + '/ActivityMarketOpenService/queryActivityById',
    method: 'post',
    model: model.querySubActivityByIdModel,
    params: params
  })
}

/**
 * 活动结束按钮
 */
export function disableActivityData(params) {
  return api({
    url: process.env.API_HOST + '/ActivityMarketOpenService/closingActivities',
    method: 'post',
    model: model.disableActivityDataModel,
    params: params
  })
}

/**
 * 生成按钮
 */
export function generateFormData(params) {
  return api({
    url: process.env.API_HOST + '/ActivityMarketOpenService/sendDownLoadMessage',
    method: 'post',
    model: model.generateFormDataModel,
    params: params
  })
}