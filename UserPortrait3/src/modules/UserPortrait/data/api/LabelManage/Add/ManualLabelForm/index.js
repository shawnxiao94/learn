import api from '@/common/api'
import * as model from './model'

/**
 *  新增手工型标签
 */
export function addManualLabel(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/addTagAndTagRule',
    method: 'post',
    model: model.addManualLabelModel,
    params: params
  })
}

/**
 *  编辑手工型标签
 */
export function updateManualLabel(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/updateTagAndRule',
    method: 'post',
    model: model.updateTagDetailModel,
    params: params
  })
}