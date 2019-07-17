import Mock from 'mockjs'

// 获取角色列表
const getRoleListData = {
  ErrorCode: 0,
  Result: {
    data: {
      content: [
        {
          id: '01',
          name: '管理员',
          code: 'admin',
          sortIndex: 0,
          createUser: 'admin'
        },
        {
          id: '02',
          name: '普通用户',
          code: 'user',
          sortIndex: 1,
          createUser: 'admin'
        },
        {
          id: '03',
          name: '超级管理员',
          code: 'superAdmin',
          sortIndex: 2,
          createUser: 'admin'
        }
      ],
      totalCount: 3
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/roleManage\/getRoleListData/, getRoleListData)

// 编辑保存
const editRoleSave = {
  ErrorCode: 0,
  Result: {
    data: {
      content: []
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/roleManage\/editRoleSave/, editRoleSave)
// 新增保存
const addRoleSave = {
  ErrorCode: 0,
  Result: {
    data: {
      content: []
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/roleManage\/addRoleSave/, addRoleSave)
// 删除角色
const delRole = {
  ErrorCode: 0,
  Result: {
    data: {
      content: []
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/roleManage\/delRole/, delRole)
