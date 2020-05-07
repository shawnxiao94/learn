import axiosApi from '@/common/utils/axiosApi'

import * as model from './model'

// 系统管理 日志管理 获取日志列表
export function getUserOperationLogByType(params) {
  return axiosApi(
    '/AuditLogOpenService/getUserOperationLogByType',
    'post',
    model.getUserOperationLogByType,
    params
  )
}
