import api from '@/common/api'
import * as model from './model'

// 获取标签数据
export function selectTags(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/selectTags',
    method: 'post',
    model: model.selectTags,
    params: params
  })
}

// 选择标签 - 所属公司部门 - 下拉框数据
export function selectTagsQuerySources(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/selectTagsQuerySources',
    method: 'post',
    model: model.selectTagsQuerySources,
    params: params
  })
}

// 选择标签 - 标签分类 - 下拉框数据
export function queryCategory(params) {
  return api({
    url: process.env.API_HOST + '/TagCategoryOpenService/queryCategory',
    method: 'post',
    model: model.queryCategory,
    params: params
  })
}