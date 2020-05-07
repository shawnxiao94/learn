import Mock from 'mockjs'

// 获取人员列表API
const getRoleCenterUsers = {
  ErrorCode: 0,
  Result: {
    data: {
      totalPages: 3,
      roleCenterUserDtoList: [
        {
          orgName: '上汽集团',
          role: '上汽集团',
          mobile: '17701788388',
          loginDate: '-',
          userName: '廉程',
          userId: '17701788388',
          email: 'liancheng@saicmotor.com',
          createDate: '2019-03-11'
        },
        {
          orgName: '上汽集团',
          role: '管理员',
          mobile: '18612613137',
          loginDate: '2019-03-29 18:42:34',
          userName: '吴小龙',
          userId: '18612613137',
          email: 'kiddwu@microsoft.com',
          loginCount: 28,
          createDate: '2019-01-23'
        },
        {
          orgName: '上汽集团',
          role: '',
          mobile: '17601320924',
          loginDate: '2019-05-14 14:49:02',
          userName: '圣亮',
          userId: '17601320924',
          email: '17601320924@163.com',
          loginCount: 40,
          createDate: '2019-01-17'
        },
        {
          orgName: '上汽集团',
          role: '普通用户',
          mobile: '17301777035',
          loginDate: '-',
          userName: '周小娟',
          userId: '17301777035',
          email: 'xiaojuan9177@163.com',
          createDate: '2019-01-16'
        },
        {
          orgName: '上汽集团',
          role: '普通用户',
          mobile: '15901826793',
          loginDate: '2019-05-09 16:16:16',
          userName: '倪双一',
          userId: '15901826793',
          email: 'nishuangyi@sina.com',
          loginCount: 259,
          createDate: '2019-01-14'
        },
        {
          orgName: '上汽集团',
          role: '普通用户',
          mobile: '13162823532',
          loginDate: '2019-05-17 10:39:51',
          userName: '朱秀秀',
          userId: '13162823532',
          email: 'ZZzhuxiuxiu@163.com',
          loginCount: 147,
          createDate: '2019-01-14'
        },
        {
          orgName: '上汽集团',
          role: '普通用户',
          mobile: '18515805219',
          loginDate: '2019-05-20 11:01:32',
          userName: '束争光',
          userId: '18515805219',
          email: '18515805219@163.com',
          loginCount: 216,
          createDate: '2019-01-14'
        },
        {
          orgName: '上汽集团',
          role: '普通用户',
          mobile: '17601235412',
          loginDate: '2019-05-20 11:02:41',
          userName: '张振民',
          userId: '17601235412',
          email: 'zhangzhenmin@heint.cn',
          loginCount: 966,
          createDate: '2019-01-13'
        },
        {
          orgName: '上汽集团',
          role: '普通用户',
          mobile: '13169946786',
          loginDate: '2019-05-15 17:18:51',
          userName: '侯海燕',
          userId: '13169946786',
          email: '1913315545@qq.com',
          loginCount: 341,
          createDate: '2019-01-13'
        },
        {
          orgName: '上汽集团',
          role: '普通用户',
          mobile: '15000286754',
          loginDate: '2019-05-20 10:31:02',
          userName: '孙振军',
          userId: '15000286754',
          email: '15000286754@163.com',
          loginCount: 575,
          createDate: '2019-01-13'
        }
      ],
      totalElements: 25
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/RoleCenterUserOpenService\/getRoleCenterUsers/, getRoleCenterUsers)

// 获取操作日志详情
const getLogDetail = {
  ErrorCode: 0,
  Result: {
    data: {
      number: 0,
      last: false,
      numberOfElements: 5,
      size: 5,
      totalPages: 31,
      content: [
        {
          role: '普通用户',
          createTime: 1557901599000,
          companyName: '-',
          succeed: 1,
          mobile: '17601235412',
          message: '失效统计型标签成功,标签名称:集团未说明的性别',
          userName: '张振民',
          userId: '17601235412',
          content: '修改标签',
          email: 'zhangzhenmin@heint.cn'
        },
        {
          role: '普通用户',
          createTime: 1557901587000,
          companyName: '-',
          succeed: 1,
          mobile: '17601235412',
          message: '修改统计型标签成功,标签名称:集团未说明的性别',
          userName: '张振民',
          userId: '17601235412',
          content: '修改标签',
          email: 'zhangzhenmin@heint.cn'
        },
        {
          role: '普通用户',
          createTime: 1557901575000,
          companyName: '-',
          succeed: 1,
          mobile: '17601235412',
          message: '修改统计型标签成功,标签名称:集团未说明的性别',
          userName: '张振民',
          userId: '17601235412',
          content: '修改标签',
          email: 'zhangzhenmin@heint.cn'
        },
        {
          role: '普通用户',
          createTime: 1557886912000,
          companyName: '-',
          succeed: 1,
          mobile: '17601235412',
          message: '修改统计型标签成功,标签名称:对的',
          userName: '张振民',
          userId: '17601235412',
          content: '修改标签',
          email: 'zhangzhenmin@heint.cn'
        },
        {
          role: '普通用户',
          createTime: 1557886901000,
          companyName: '-',
          succeed: 1,
          mobile: '17601235412',
          message: '新增统计型标签成功,标签名称:对的',
          userName: '张振民',
          userId: '17601235412',
          content: '新增标签',
          email: 'zhangzhenmin@heint.cn'
        }
      ],
      first: true,
      totalElements: 151
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/AuditLogOpenService\/getUserOperationLogByUserId/, getLogDetail)

// 获取登录详情
const getLoginDetail = {
  ErrorCode: 0,
  Result: {
    data: {
      number: 0,
      last: false,
      numberOfElements: 5,
      size: 5,
      totalPages: 194,
      content: [
        {
          loginSuccess: 1,
          loginTime: 1558321361000,
          loginIp: 'casserver.njdev.datago.vip',
          loginDevice: 'Windows 10 WOW64',
          userName: '17601235412',
          loginBrowser: 'Chrome74.0.3729.157',
          userId: '17601235412'
        },
        {
          loginSuccess: 1,
          loginTime: 1558316238000,
          loginIp: 'casserver.njdev.datago.vip',
          loginDevice: 'Windows 10 WOW64',
          userName: '17601235412',
          loginBrowser: 'Chrome74.0.3729.157',
          userId: '17601235412'
        },
        {
          loginSuccess: 1,
          loginTime: 1558316049000,
          loginIp: 'casserver.njdev.datago.vip',
          loginDevice: 'Windows 7 Win64',
          userName: '17601235412',
          loginBrowser: 'Chrome74.0.3729.108',
          userId: '17601235412'
        },
        {
          loginSuccess: 1,
          loginTime: 1558088496000,
          loginIp: 'casserver.njdev.datago.vip',
          loginDevice: 'Windows 10 WOW64',
          userName: '17601235412',
          loginBrowser: 'Chrome74.0.3729.157',
          userId: '17601235412'
        },
        {
          loginSuccess: 1,
          loginTime: 1558081530000,
          loginIp: 'casserver.njdev.datago.vip',
          loginDevice: 'Windows 10 WOW64',
          userName: '17601235412',
          loginBrowser: 'Chrome74.0.3729.157',
          userId: '17601235412'
        }
      ],
      first: true,
      totalElements: 967
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/AuditLogOpenService\/getUserLoginLogByUserId/, getLoginDetail)

// 获取角色选项
const getRoleData = {
  ErrorCode: 0,
  Result: {
    data: [
      { label: '管理员', value: 0 },
      { label: '超级管理员', value: 1 },
      { label: '普通用户', value: 2 }
    ],
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/userManage\/getRoleData/, getRoleData)

// 新增角色  保存
const addRoleApi = {
  ErrorCode: 0,
  Result: {
    data: [],
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/userManage\/addRole/, addRoleApi)
// 编辑用户  保存
const eidtUserAPI = {
  ErrorCode: 0,
  Result: {
    data: [],
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/userManage\/eidtUser/, eidtUserAPI)
// 删除用户
const delUserApi = {
  ErrorCode: 0,
  Result: {
    data: [],
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/userManage\/delUser/, delUserApi)
