import api from '@/common/api'
import * as model from './model'
/**
 * 新增提交
 */
export function submitData(params) {
  return api({
    url: process.env.API_HOST + '/PortraitOpenService/save',
    method: 'post',
    model: model.submitDataModel,
    params: params
  })
}
/**
 * 编辑提交
 */
export function submitUpdata(params) {
  return api({
    url: process.env.API_HOST + '/PortraitOpenService/updatePortrait',
    method: 'post',
    model: model.submitUpdataModel,
    params: params
  })
}