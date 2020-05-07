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
              },
              {
                rightName: '任务调度管理',
                rightRootId: 'PagePermission',
                levelSort: 3,
                sysId: 'DAM',
                rightId: 'TaskSchedulingManage',
                state: 'on',
                authorityUserBeanList: [
                  {
                    rightName: '任务调度管理',
                    rightRootId: 'TaskSchedulingManage',
                    levelSort: 4,
                    sysId: 'DAM',
                    rightId: 'TaskSchedulingManageIndex',
                    state: 'on',
                    authorityUserBeanList: [
                      {
                        rightName: '查询',
                        rightRootId: 'TaskSchedulingManageIndex',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'TaskSchedulingManageIndex_search',
                        state: 'on'
                      }
                    ]
                  }
                ]
              },
              {
                rightName: '数据地图',
                rightRootId: 'PagePermission',
                levelSort: 3,
                sysId: 'DAM',
                rightId: 'DataMap',
                state: 'on',
                authorityUserBeanList: [
                  {
                    rightName: '数据地图',
                    rightRootId: 'DataMap',
                    levelSort: 4,
                    sysId: 'DAM',
                    rightId: 'DataMapIndex',
                    state: 'on',
                    authorityUserBeanList: [
                      {
                        rightName: '查询',
                        rightRootId: 'DataMapIndex',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'DataMapIndex_search',
                        state: 'on'
                      }
                    ]
                  }
                ]
              },
              {
                rightName: '数据标签',
                rightRootId: 'PagePermission',
                levelSort: 3,
                sysId: 'DAM',
                rightId: 'DataTags',
                state: 'on',
                authorityUserBeanList: [
                  {
                    rightName: '数据标签',
                    rightRootId: 'DataTags',
                    levelSort: 4,
                    sysId: 'DAM',
                    rightId: 'DataTagsIndex',
                    state: 'on',
                    authorityUserBeanList: [
                      {
                        rightName: '查询',
                        rightRootId: 'DataTagsIndex',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'DataTagsIndex_search',
                        state: 'on'
                      }
                    ]
                  }
                ]
              },
              {
                rightName: '数据探索',
                rightRootId: 'PagePermission',
                levelSort: 3,
                sysId: 'DAM',
                rightId: 'DataDiscovery',
                state: 'on',
                authorityUserBeanList: [
                  {
                    rightName: '数据探索',
                    rightRootId: 'DataDiscovery',
                    levelSort: 4,
                    sysId: 'DAM',
                    rightId: 'DataDiscoveryIndex',
                    state: 'on',
                    authorityUserBeanList: [
                      {
                        rightName: '查询',
                        rightRootId: 'DataDiscoveryIndex',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'DataDiscoveryIndex_search',
                        state: 'on'
                      }
                    ]
                  }
                ]
              },
              {
                rightName: '数据源管理及传输',
                rightRootId: 'PagePermission',
                levelSort: 3,
                sysId: 'DAM',
                rightId: 'DataSourceManage',
                state: 'on',
                authorityUserBeanList: [
                  {
                    rightName: '数据源管理',
                    rightRootId: 'DataSourceManage',
                    levelSort: 4,
                    sysId: 'DAM',
                    rightId: 'DataSourceManageDataManage',
                    state: 'on',
                    authorityUserBeanList: [
                      {
                        rightName: '查询',
                        rightRootId: 'DataSourceManageDataManage',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'DataSourceManageDataManage_search',
                        state: 'on'
                      }
                    ]
                  },
                  {
                    rightName: '数据源传输',
                    rightRootId: 'DataSourceManage',
                    levelSort: 4,
                    sysId: 'DAM',
                    rightId: 'DataSourceManageDataSourceTransfer',
                    state: 'on',
                    authorityUserBeanList: [
                      {
                        rightName: '查询',
                        rightRootId: 'DataSourceManageDataSourceTransfer',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'DataSourceManageDataSourceTransfer_search',
                        state: 'on'
                      }
                    ]
                  }
                ]
              },
              {
                rightName: '系统管理',
                rightRootId: 'PagePermission',
                levelSort: 3,
                sysId: 'DAM',
                rightId: 'SystemManage',
                state: 'on',
                authorityUserBeanList: [
                  {
                    rightName: '人员管理',
                    rightRootId: 'SystemManage',
                    levelSort: 4,
                    sysId: 'DAM',
                    rightId: 'SystemManageUserManage',
                    state: 'on',
                    authorityUserBeanList: [
                      {
                        rightName: '查询',
                        rightRootId: 'SystemManageUserManage',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'SystemManageUserManage_search',
                        state: 'on'
                      },
                      {
                        rightName: '新增',
                        rightRootId: 'SystemManageUserManage',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'SystemManageUserManage_add',
                        state: 'on'
                      },
                      {
                        rightName: '日志详情',
                        rightRootId: 'SystemManageUserManage',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'SystemManageUserManage_detail',
                        state: 'on'
                      }
                    ]
                  },
                  {
                    rightName: '日志管理',
                    rightRootId: 'SystemManage',
                    levelSort: 4,
                    sysId: 'DAM',
                    rightId: 'SystemManageLogManage',
                    state: 'on',
                    authorityUserBeanList: [
                      {
                        rightName: '查询',
                        rightRootId: 'SystemManageLogManage',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'SystemManageUserManage_search',
                        state: 'on'
                      }
                    ]
                  },
                  {
                    rightName: '角色管理',
                    rightRootId: 'SystemManage',
                    levelSort: 4,
                    sysId: 'DAM',
                    rightId: 'SystemManageRoleManage',
                    state: 'on',
                    authorityUserBeanList: [
                      {
                        rightName: '查询',
                        rightRootId: 'SystemManageRoleManage',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'SystemManageUserManage_search',
                        state: 'on'
                      }
                    ]
                  },
                  {
                    rightName: '系统设置',
                    rightRootId: 'SystemManage',
                    levelSort: 4,
                    sysId: 'DAM',
                    rightId: 'SystemManageSettings',
                    state: 'on',
                    authorityUserBeanList: [
                      {
                        rightName: '查询',
                        rightRootId: 'SystemManageSettings',
                        levelSort: 5,
                        sysId: 'DAM',
                        rightId: 'SystemManageSettings_search',
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
                rightName: 'PC渠道',
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
      userName: '张三',
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
