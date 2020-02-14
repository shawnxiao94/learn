import api from '@/common/api'
import * as model from './model'

/**
 *  新增算法型标签
 */
export function addAlgorithmLabel(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/addTagAndTagRule',
    method: 'post',
    model: model.addAlgorithmLabelModel,
    params: params
  })
}

/**
 *  编辑算法型标签
 */
export function updateAlgorithmLabel(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/updateTagAndRule',
    method: 'post',
    model: model.updateTagDetailModel,
    params: params
  })
}
