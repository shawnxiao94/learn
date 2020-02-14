import api from '@/common/api'
import * as model from './model'

// 标签详情 - 手工型标签中导入用户的历史记录列表数据
export function queryManualTagRecord(params) {
  return api({
    url: process.env.API_HOST + '/ManualTagRecordOpenService/queryManualTagRecord',
    method: 'post',
    model: model.queryManualTagRecord,
    params: params
  })
}