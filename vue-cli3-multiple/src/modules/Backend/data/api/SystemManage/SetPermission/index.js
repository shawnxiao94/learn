import axiosApi from '@/common/utils/axiosApi'

// 系统管理 权限分配 获取所有权限树
export function getPermissionChecked(params) {
  return axiosApi('/setPermission/permissionChecked', 'post', null, params)
}
// 系统管理 权限分配 保存该角色分配的权限
export function savePermission(params) {
  return axiosApi('/setPermission/savePermission', 'post', null, params)
}
