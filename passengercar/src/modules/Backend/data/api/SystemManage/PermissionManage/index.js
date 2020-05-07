import axiosApi from '@/common/utils/axiosApi'

// 系统管理 权限管理 获取列表
export function getTreePermissionData(params) {
  return axiosApi(
    '/permissionManage/getTreePermissionData',
    'post',
    null,
    params
  )
}
// 系统管理 权限管理 删除行
export function deletePermission(params) {
  return axiosApi('/permissionManage/deletePermission', 'post', null, params)
}
// 系统管理 权限管理 编辑保存菜单行
export function eidtPermissionRow(params) {
  return axiosApi('/permissionManage/eidtPermissionRow', 'post', null, params)
}
// 系统管理 权限管理 新增子菜单 保存
export function addSubMenu(params) {
  return axiosApi('/permissionManage/addSubMenu', 'post', null, params)
}
// 系统管理 权限管理 新增权限菜单 保存
export function addPermission(params) {
  return axiosApi('/permissionManage/addPermission', 'post', null, params)
}
