import axiosApi from '@/common/utils/axiosApi'
import * as model from './model'

// 获取用户列表
export function getAccout(params) {
  return axiosApi(
    '/RoleCenterUserOpenService/getRoleCenterUsers',
    'post',
    model.getAccout,
    params
  )
}

// 系统管理 日志管理 获取日志列表详情
export function getLogDetail(params) {
  return axiosApi(
    '/AuditLogOpenService/getUserOperationLogByUserId',
    'post',
    model.getLogDetail,
    params
  )
}
// 获取登录次数 详情
export function getLoginTimesDetail(params) {
  return axiosApi(
    '/AuditLogOpenService/getUserLoginLogByUserId',
    'post',
    model.getLoginTimesDetail,
    params
  )
}

// 获取角色选项
export function getRoleData(params) {
  return axiosApi('/userManage/getRoleData', 'post', null, params)
}

// 新增用户
export function addRoleApi(params) {
  return axiosApi('/userManage/addRole', 'post', null, params)
}
// 编辑用户
export function eidtUserAPI(params) {
  return axiosApi('/userManage/eidtUser', 'post', null, params)
}
// 编辑用户
export function delUserApi(params) {
  return axiosApi('/userManage/delUser', 'post', null, params)
}
