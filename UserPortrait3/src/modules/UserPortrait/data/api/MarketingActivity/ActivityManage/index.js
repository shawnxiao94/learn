import api from '@/common/api'
import * as model from './model'

/**
 * 活动管理列表
 */
export function getFindByMarketPage(params) {
  return api({
    url: process.env.API_HOST + '/ActivityMarketOpenService/findByMarketPage',
    method: 'post',
    model: model.getFindByMarketPageModel,
    params: params
  })
}

/**
 * 活动列表-查询用户数
 */
export function findActivityUsers(params) {
  return api({
    url: process.env.API_HOST + '/SourceMysqlOpenService/findActivityUsers',
    method: 'post',
    model: model.findActivityUsersModel,
    params: params
  })
}