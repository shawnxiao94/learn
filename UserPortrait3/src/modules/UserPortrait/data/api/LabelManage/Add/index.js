import api from '@/common/api'
import * as model from './model'
/**
 * 获取标签类别
 */
export function queryCategory(params) {
  return api({
    url: process.env.API_HOST + '/TagCategoryOpenService/queryCategory',
    method: 'post',
    model: model.queryCategory,
    params: params
  })
}

/**
 * 预览表达式
 */
export function queryTagExpression(params) {
  return api({
    url: process.env.API_HOST + '/TagOpenService/queryTagExpression',
    method: 'post',
    model: model.queryTagExpression,
    params: params
  })
}

/**
 *  删除上传文件
 */
export function deleteUploadFile(params) {
  return api({
    url: process.env.API_HOST + '/FileUploadOpenService/deletTemData',
    method: 'post',
    model: model.deleteUploadFileModel,
    params: params
  })
}