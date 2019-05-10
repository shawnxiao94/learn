import axiosAPI from "@/common/utils/axiosAPI";
import * as model from "./model";

// 获取用户列表
export function getAccout(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/RoleCenterUserOpenService/getRoleCenterUsers",
    "post",
    model.getAccout,
    params
  );
  // return axiosAPI('/usermanage/userlist', 'post', model.getAccout, params)
}
// 获取登录次数详情
export function getLoginTimesDetail(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/AuditLogOpenService/getUserOperationLogByUserId",
    "post",
    model.getLoginTimesDetail,
    params
  );
  // return axiosAPI('http://10.100.61.148:8082/services/AuditLogOpenService/getUserOperationLogByUserId', 'post', model.getLoginTimesDetail, params)
  // return axiosAPI('/usermanage/loginDetail', 'post', model.getLoginTimesDetail, params)
}
// 获取操作日志和登录次数 详情
export function getLogDetail(params) {
  return axiosAPI(
    process.env.VUE_APP_API_HOST +
      "/AuditLogOpenService/getUserOperationLogByUserId",
    "post",
    model.getLogDetail,
    params
  );
  // return axiosAPI('http://10.100.61.148:8082/services/AuditLogOpenService/getUserOperationLogByUserId', 'post', model.getLogDetail, params)
  // return axiosAPI('/usermanage/logDetail', 'post', model.getLogDetail, params)
}
// 新增用户
export function addAccout(params) {
  return axiosAPI(
    process.env.VUE_APP_ROLE_CENTER + "/LoginOpenService/createLoginUser",
    "post",
    model.addAccout,
    params
  );
}
// 新增用户同步到上汽RoleCenter
export function addAccoutRoleCenter(params) {
  return axiosAPI(
    process.env.VUE_APP_ROLE_CENTER +
      "/SystemRoleCenterOpenService/syncOperatorToRoleCenter",
    "post",
    model.addAccoutRoleCenter,
    params
  );
}
