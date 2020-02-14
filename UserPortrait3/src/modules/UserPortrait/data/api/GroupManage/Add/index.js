import api from '@/common/api'
import * as model from './model'

/**
 * 新增子用户群-获取选择标签
 */
export function getSelectedTag(params) {
  return api({
    url: process.env.API_HOST + '/BiAnalysisOpenService/findSelectedTagByPage',
    method: 'post',
    model: model.getSelectedTagModel,
    params: params
  })
}

/**
 * 新增子用户群
 */
export function addSubGroup(params) {
  return api({
    url: process.env.API_HOST + '/BiAnalysisOpenService/saveBiUserShareGroup',
    method: 'post',
    model: model.addSubGroupModel,
    params: params
  })
}