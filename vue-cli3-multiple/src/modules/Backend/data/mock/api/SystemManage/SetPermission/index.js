import Mock from 'mockjs'

// 获取角色所拥有的权限树列表
const getPermissionChecked = {
  ErrorCode: 0,
  Result: {
    data: {
      content: ['1', '2', '3']
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/setPermission\/permissionChecked/, getPermissionChecked)
// 保存该角色分配的权限
const savePermission = {
  ErrorCode: 0,
  Result: {
    data: {
      content: []
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/setPermission\/savePermission/, savePermission)
