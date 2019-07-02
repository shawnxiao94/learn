import Mock from 'mockjs'

// 检查权限
const checkAccount = {
  ErrorCode: 0,
  Result: {
    data: 0,
    errCode: 0,
    errMsg: 'ok'
  },
  data: {
    data: 0,
    errCode: 0,
    errMsg: 'ok'
  },
  errCode: 0,
  errMsg: 'ok'
}
// 检查权限
Mock.mock(/\/SystemRoleCenterOpenService\/checkAccount/, checkAccount)

// 获取权限树
const getAllAuthorityTree = {
  ErrorCode: 0,
  errCode: 0,
  errMsg: 'ok',
  Result: {
    data: [
      {
        rightName: '业务系统',
        rightRootId: 'ROOT',
        levelSort: 1,
        sysId: 'DAM',
        rightId: 'UserCenterApiSystem',
        state: 'on',
        authorityUserBeanList: [
          {
            rightName: '页面权限',
            rightRootId: 'UserCenterApiSystem',
            levelSort: 2,
            sysId: 'DAM',
            rightId: 'PagePermission',
            state: 'on',
            authorityUserBeanList: [
              {
                rightName: '首页',
                rightRootId: 'PagePermission',
                levelSort: 3,
                sysId: 'DAM',
                rightId: 'Home',
                state: 'on',
                authorityUserBeanList: [
                  {
                    rightName: '首页',
                    rightRootId: 'Home',
                    levelSort: 4,
                    sysId: 'DAM',
                    rightId: 'HomeIndex',
                    state: 'on',
                    authorityUserBeanList: [
                      {
                        rightName: '查询',
                        rightRootId: 'HomeIndex',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'HomeIndex_search',
                        state: 'on'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            rightName: '数据权限',
            rightRootId: 'UserPortraitSystem',
            levelSort: 2,
            sysId: 'DAM',
            rightId: 'DataPermission',
            state: 'on',
            authorityUserBeanList: [
              {
                rightName: '乘用车',
                rightRootId: 'DataPermission',
                levelSort: 3,
                sysId: 'DAM',
                rightId: '05',
                state: 'on'
              }
            ]
          }
        ]
      }
    ],
    errCode: 0,
    errMsg: 'ok'
  }
}
// 获取权限树
Mock.mock(
  /\/SystemRoleCenterOpenService\/getAllAuthorityTree/,
  getAllAuthorityTree
)

// 获取用户信息
const getUserInfoByAccount = {
  ErrorCode: 0,
  Result: {
    data: {
      updateDate: '2019-02-28',
      role: '管理员',
      sysId: 'DAM',
      mobile: '17601235412',
      updateAt: 1551346327165,
      userName: 'admin',
      branch: '',
      userId: '17601235412',
      createAt: 1551346327165,
      rightList: [
        'UserPortraitSystem',
        'PagePermission',
        'DataPermission',
        'Home',
        'UserPortrait',
        'LabelManage',
        'PortraitManage',
        '05',
        '01',
        '03',
        '04',
        '02',
        'HomeIndex',
        'UserPortraitGroupPortrait',
        'UserPortraitUnitPortrait',
        'LabelManageUserLabel',
        'PortraitManageUserPortrait',
        'HomeIndex_search',
        'UserPortraitGroupPortrait_search',
        'UserPortraitUnitPortrait_search',
        'LabelManageUserLabel_search',
        'LabelManageUserLabel_add',
        'LabelManageUserLabel_update',
        'LabelManageUserLabel_lose',
        'LabelManageUserLabel_detail',
        'LabelManageUserLabel_share',
        'LabelManageUserLabel_editShare',
        'PortraitManageUserPortrait_search',
        'PortraitManageUserPortrait_add',
        'PortraitManageUserPortrait_update',
        'PortraitManageUserPortrait_lose',
        'PortraitManageUserPortrait_delete'
      ],
      createdDate: '2019-02-28',
      sysName: 'DAM',
      job: '',
      email: 'zhangzhenmin@heint.cn'
    },
    errCode: 0,
    errMsg: 'ok'
  },
  data: {
    data: {
      updateDate: '2019-02-28',
      role: '管理员',
      sysId: 'DAM',
      mobile: '17601235412',
      updateAt: 1551346327165,
      userName: '管理员 ',
      branch: '',
      userId: '17601235412',
      createAt: 1551346327165,
      rightList: [
        'UserPortraitSystem',
        'PagePermission',
        'DataPermission',
        'Home',
        'UserPortrait',
        'LabelManage',
        'PortraitManage',
        '05',
        '01',
        '03',
        '04',
        '02',
        'HomeIndex',
        'UserPortraitGroupPortrait',
        'UserPortraitUnitPortrait',
        'LabelManageUserLabel',
        'PortraitManageUserPortrait',
        'HomeIndex_search',
        'UserPortraitGroupPortrait_search',
        'UserPortraitUnitPortrait_search',
        'LabelManageUserLabel_search',
        'LabelManageUserLabel_add',
        'LabelManageUserLabel_update',
        'LabelManageUserLabel_lose',
        'LabelManageUserLabel_detail',
        'LabelManageUserLabel_share',
        'LabelManageUserLabel_editShare',
        'PortraitManageUserPortrait_search',
        'PortraitManageUserPortrait_add',
        'PortraitManageUserPortrait_update',
        'PortraitManageUserPortrait_lose',
        'PortraitManageUserPortrait_delete'
      ],
      createdDate: '2019-02-28',
      sysName: 'DAM',
      job: '',
      email: 'zhangzhenmin@heint.cn'
    },
    errCode: 0,
    errMsg: 'ok'
  },
  errCode: 0,
  errMsg: 'ok'
}
// 获取用户信息
Mock.mock(
  /\/SystemRoleCenterOpenService\/getUserInfoByAccount/,
  getUserInfoByAccount
)
