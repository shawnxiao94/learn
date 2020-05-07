import Mock from 'mockjs'

// 获取列表
const getTreePermissionData = {
  ErrorCode: 0,
  Result: {
    data: {
      content: [
        {
          id: '1',
          label: '一级 1',
          code: 'test1',
          type: '1',
          children: [
            {
              id: '1-1',
              label: '二级 1-1',
              code: 'test1-1',
              type: '1',
              children: [
                {
                  id: '1-1-1',
                  label: '三级 1-1-1',
                  type: '1',
                  code: 'test1-1-1'
                },
                {
                  id: '1-1-2',
                  label: '三级 1-1-2',
                  type: '1',
                  code: 'test1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: '2',
          label: '系统管理',
          code: 'SystemManage',
          children: [
            {
              id: '2-1',
              label: '角色管理',
              type: '1',
              code: 'SystemManageRoleManage',
              children: [
                {
                  id: '2-1-1',
                  label: '新增',
                  type: '2',
                  code: 'SystemManageRoleManage_add'
                },
                {
                  id: '2-1-2',
                  label: '编辑',
                  type: '2',
                  code: 'SystemManageRoleManage_update'
                },
                {
                  id: '2-1-3',
                  label: '删除',
                  type: '2',
                  code: 'SystemManageRoleManage_del'
                },
                {
                  id: '2-1-4',
                  label: '权限分配',
                  type: '2',
                  code: 'SystemManageRoleManage_setPermisstion'
                }
              ]
            },
            {
              id: '2-2',
              label: '权限管理',
              type: '1',
              code: 'SystemManagePermissionManage',
              children: [
                {
                  id: '2-2-1',
                  label: '新增',
                  type: '2',
                  code: 'SystemManagePermissionManage_add'
                },
                {
                  id: '2-2-2',
                  label: '编辑',
                  type: '2',
                  code: 'SystemManagePermissionManage_update'
                },
                {
                  id: '2-2-3',
                  label: '删除',
                  type: '2',
                  code: 'SystemManagePermissionManage_del'
                },
                {
                  id: '2-2-4',
                  label: '添加子菜单',
                  type: '2',
                  code: 'SystemManagePermissionManage_addSubMenu'
                }
              ]
            },
            {
              id: '2-3',
              label: '权限分配',
              type: '1',
              code: 'SystemManageSetPermission',
              children: [
                {
                  id: '4-1',
                  label: '保存',
                  type: '2',
                  code: 'SystemManageSetPermission_save'
                }
              ]
            },
            {
              id: '2-4',
              label: '人员管理',
              type: '1',
              code: 'SystemManageUserManage'
            },
            {
              id: '2-5',
              label: '日志管理',
              type: '1',
              code: 'SystemManageLogManage'
            }
          ]
        },
        {
          id: '3',
          label: '首页',
          code: 'Home',
          type: '1',
          children: [
            {
              id: '3-1',
              label: '首页',
              type: '1',
              code: 'HomeIndex'
            }
          ]
        }
      ],
      totalElements: 903
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/permissionManage\/getTreePermissionData/, getTreePermissionData)

// 删除权限行
const deletePermission = {
  ErrorCode: 0,
  Result: {
    data: {
      content: []
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/permissionManage\/deletePermission/, deletePermission)

// 编辑后保存权限行
const eidtPermissionRow = {
  ErrorCode: 0,
  Result: {
    data: {
      content: []
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/permissionManage\/eidtPermissionRow/, eidtPermissionRow)
// 新增子菜单保存
const addSubMenu = {
  ErrorCode: 0,
  Result: {
    data: {
      content: []
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/permissionManage\/addSubMenu/, addSubMenu)
// 新增权限菜单保存
const addPermission = {
  ErrorCode: 0,
  Result: {
    data: {
      content: []
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/permissionManage\/addPermission/, addPermission)
