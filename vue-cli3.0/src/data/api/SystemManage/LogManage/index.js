import axiosAPI from "@/common/utils/axiosAPI";

import * as model from "./model";

// 系统管理 日志管理 获取日志列表
export function getUserOperationLogByType(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/AuditLogOpenService/getUserOperationLogByType",
    "post",
    model.getUserOperationLogByType,
    params
  );
  // return axiosAPI('http://10.100.61.148:8082/services/AuditLogOpenService/getUserOperationLogByType', 'post', model.getUserOperationLogByType, params)
}
