import axiosApi from '@/common/utils/axiosApi'

// 系统管理 角色管理 获取列表
export function getRoleListData(params) {
  return axiosApi('/roleManage/getRoleListData', 'post', null, params)
}
// 系统管理 角色管理 编辑保存
export function editRoleSave(params) {
  return axiosApi('/roleManage/editRoleSave', 'post', null, params)
}
// 系统管理 角色管理 新增角色 => 保存
export function addRoleSave(params) {
  return axiosApi('/roleManage/addRoleSave', 'post', null, params)
}
// 系统管理 角色管理 删除角色
export function delRole(params) {
  return axiosApi('/roleManage/delRole', 'post', null, params)
}
