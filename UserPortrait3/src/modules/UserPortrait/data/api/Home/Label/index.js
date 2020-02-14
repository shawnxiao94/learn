import api from '@/common/api'
import * as model from './model'

/**
 * 标签画像 - 标签列表
 */
export function getLabelList(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/queryTags',
    method: 'post',
    model: model.getLabelListModel,
    params: params
  })
}

/**
 * 标签画像 - 标签列表-查询用户数
 */
export function queryTagUserCounts(params) {
  return api({
    url: process.env.API_HOST + '/SourceMysqlOpenService/findTagUserCounts',
    method: 'post',
    model: model.queryTagUserCountsModel,
    params: params
  })
}

// 用户标签 - 禁用启用
export function updateTagIsOpen(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/updateIsOpen',
    method: 'post',
    model: model.updateTagIsOpenModel,
    params: params
  })
}

// 手工型失效
export function loseEfficacyTagStatus(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/loseEfficacyTag',
    method: 'post',
    model: model.loseEfficacyTagStatusModel,
    params: params
  })
}

/**
 * 标签画像 - 标签详情
 */
export function queryTagByTagId(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/queryTagByTagId',
    method: 'post',
    model: model.queryTagByTagIdModel,
    params: params
  })
}

// 标签共享查询
export function queryTagAndChannel(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/queryTagAndChannel',
    method: 'post',
    model: model.queryTagAndChannelModel,
    params: params
  })
}

// 标签共享新增编辑
export function addShareChannel(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/addShareChannel',
    method: 'post',
    model: model.addShareChannelModel,
    params: params
  })
}

// 标签画像 - 来源下拉框
// export function getFromSelect(params) {
//   return api({
//     url: process.env.API_HOST + '/TagOpenService/queryChannels',
//     method: 'post',
//     model: model.getFromSelectModel,
//     params: params
//   })
// }

/**
 * 根据标签ID 获取共享标签
 */
export function queryShareChannelName(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/queryShareChannelName',
    method: 'post',
    model: model.queryShareChannelNameModel,
    params: params
  })
}
