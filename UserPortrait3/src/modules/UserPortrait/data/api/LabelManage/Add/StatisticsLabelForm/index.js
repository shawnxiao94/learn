import api from '@/common/api'
import * as model from './model'

/**
 *  新增统计型标签
 */
export function addTagAndTagRule(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/addTagAndTagRule',
    method: 'post',
    model: model.addTagAndTagRule,
    params: params
  })
}

/**
 *  编辑统计型标签
 */
export function updateTagAndRule(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/updateTagAndRule',
    method: 'post',
    model: model.addTagAndTagRule,
    params: params
  })
}

/**
 * 获取表达式操作字符列表
 */
export function getOperationCharacters(params) {
  return api({
    url: process.env.API_HOST + '/DictionaryOpenService/getOperationCharacters',
    method: 'post',
    model: model.getOperationCharacters,
    params: params
  })
}

/**
 * 获取表字段/值列表
 */
export function getCodeTablesByPropertyCode(params) {
  return api({
    url: process.env.API_HOST + '/DictionaryOpenService/getCodeTablesByPropertyCode',
    method: 'post',
    model: model.getCodeTablesByPropertyCode,
    params: params
  })
}

/**
 * 获取行业
 * 由于行业为级联数据，所以另起接口
 */
export function getFindIndustryList(params) {
  return api({
    url: process.env.API_HOST + '/DictionaryOpenService/findIndustryList',
    method: 'post',
    model: model.getFindIndustryList,
    params: params
  })
}
