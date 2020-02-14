/**
  * description: 前端MOCK 数据仓库
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import Mock from 'mockjs'

const test = {
  ErrorCode: 0,
  Result: {
    data: [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        status: 1,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 3,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 1,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 1,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 1,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 21,
        status: 3,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 76,
        status: 1,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 12,
        status: 1,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 65,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 2,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 2,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        status: 2,
        address: '西湖区湖底公园1号'
      }
    ],
    errCode: 0,
    errMsg: 'ok'
  }
}

/**
 * 获取用户信息
 */
const getUserInfoByAccount =
{
  'ErrorCode': 0,
  'Result': {
    'data': {
      'updateDate': '2019-07-09',
      'role': '',
      'updatedBy': '王树开',
      'sysId': 'center',
      'mobile': '17717219665',
      'updateAt': 1562652216930,
      'userName': 'Emma',
      'branch': '',
      'userId': '17717219665',
      'createAt': 1562652216930,
      'rightList': ['PortraitManageUserPortrait_lose', 'SystemManageUserManage', 'GroupManageUserGroup', '04', 'GroupManageUserGroup_add', 'GroupManageUserGroupCreateSubgroup', 'MarketingManageMarketingActivity_endActivity', 'SystemManageLabelTag', 'LabelManage', 'GroupManageUserGroup_filter', 'MarketingManage', 'LabelManageUserLabel_editShare', 'DataPermission', 'SystemManageLogManage', 'PortraitManage', 'PortraitManageUserPortrait_add', 'GroupManageUserGroup_catDetail', 'UserPortraitGroupPortrait_search', 'SystemManageUserManage_search', 'LabelManageUserLabel_add', 'GroupManageUs', 'PortraitManageUserPortrait_search', 'SystemManageUserManage_detail', 'UserPortraitGroupBehavior_search', 'UserPortraitUnitPortrait', 'PortraitManageUserPortrait_share'],
      'createdDate': '2019-07-09',
      'createdBy': '王树开',
      'sysName': '中台项目',
      'job': '',
      'email': '17717219665@qq.com'
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}

/**
 * 校验用户token
 */
const checkAccount =
{
  'ErrorCode': 0,
  'Result': {
    'data': 0,
    'errCode': 0,
    'errMsg': 'ok'
  }
}

/**
 * 获取菜单列表
 */
const getAllAuthorityTree =
{
  'ErrorCode': 0,
  'Result': {
    'data': [{
      'rightName': '用户画像',
      'rightRootId': 'ROOT',
      'levelSort': 1,
      'sysId': 'center',
      'rightId': 'UserPortraitSystem',
      'state': 'half',
      'authorityUserBeanList': [{
        'rightName': '页面权限',
        'rightRootId': 'UserPortraitSystem',
        'levelSort': 2,
        'sysId': 'center',
        'rightId': 'PagePermission',
        'state': 'half',
        'authorityUserBeanList': [{
          'rightName': '首页',
          'rightRootId': 'PagePermission',
          'levelSort': 3,
          'sysId': 'center',
          'rightId': 'Home',
          'state': 'on',
          'authorityUserBeanList': [{
            'rightName': '首页',
            'rightRootId': 'Home',
            'levelSort': 4,
            'sysId': 'center',
            'rightId': 'HomeIndex',
            'state': 'on',
            'authorityUserBeanList': [{
              'rightName': '查询',
              'rightRootId': 'HomeIndex',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'HomeIndex_search',
              'state': 'on'
            }]
          }]
        }, {
          'rightName': '用户画像',
          'rightRootId': 'PagePermission',
          'levelSort': 3,
          'sysId': 'center',
          'rightId': 'UserPortrait',
          'state': 'on',
          'authorityUserBeanList': [{
            'rightName': '群体画像',
            'rightRootId': 'UserPortrait',
            'levelSort': 4,
            'sysId': 'center',
            'rightId': 'UserPortraitGroupPortrait',
            'state': 'on',
            'authorityUserBeanList': [{
              'rightName': '查询',
              'rightRootId': 'UserPortraitGroupPortrait',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'UserPortraitGroupPortrait_search',
              'state': 'on'
            }]
          }, {
            'rightName': '群体行为分析',
            'rightRootId': 'UserPortrait',
            'levelSort': 4,
            'sysId': 'center',
            'rightId': 'UserPortraitGroupBehavior',
            'state': 'on',
            'authorityUserBeanList': [{
              'rightName': '查询',
              'rightRootId': 'UserPortraitGroupBehavior',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'UserPortraitGroupBehavior_search',
              'state': 'on'
            }]
          }, {
            'rightName': '个体画像',
            'rightRootId': 'UserPortrait',
            'levelSort': 4,
            'sysId': 'center',
            'rightId': 'UserPortraitUnitPortrait',
            'state': 'on',
            'authorityUserBeanList': [{
              'rightName': '查询',
              'rightRootId': 'UserPortraitUnitPortrait',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'UserPortraitUnitPortrait_search',
              'state': 'on'
            }]
          }, {
            'rightName': '个体行为分析',
            'rightRootId': 'UserPortrait',
            'levelSort': 4,
            'sysId': 'center',
            'rightId': 'UserPortraitUnitBehavior',
            'state': 'on',
            'authorityUserBeanList': [{
              'rightName': '查询',
              'rightRootId': 'UserPortraitUnitBehavior',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'UserPortraitUnitBehavior_search',
              'state': 'on'
            }]
          }]
        }, {
          'rightName': '标签管理',
          'rightRootId': 'PagePermission',
          'levelSort': 3,
          'sysId': 'center',
          'rightId': 'LabelManage',
          'state': 'on',
          'authorityUserBeanList': [{
            'rightName': '用户标签',
            'rightRootId': 'LabelManage',
            'levelSort': 4,
            'sysId': 'center',
            'rightId': 'LabelManageUserLabel',
            'state': 'on',
            'authorityUserBeanList': [{
              'rightName': '查询',
              'rightRootId': 'LabelManageUserLabel',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'LabelManageUserLabel_search',
              'state': 'on'
            }, {
              'rightName': '新增',
              'rightRootId': 'LabelManageUserLabel',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'LabelManageUserLabel_add',
              'state': 'on'
            }, {
              'rightName': '编辑',
              'rightRootId': 'LabelManageUserLabel',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'LabelManageUserLabel_update',
              'state': 'on'
            }, {
              'rightName': '失效',
              'rightRootId': 'LabelManageUserLabel',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'LabelManageUserLabel_lose',
              'state': 'on'
            }, {
              'rightName': '查看详情',
              'rightRootId': 'LabelManageUserLabel',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'LabelManageUserLabel_detail',
              'state': 'on'
            }, {
              'rightName': '共享',
              'rightRootId': 'LabelManageUserLabel',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'LabelManageUserLabel_share',
              'state': 'on'
            }, {
              'rightName': '编辑共享',
              'rightRootId': 'LabelManageUserLabel',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'LabelManageUserLabel_editShare',
              'state': 'on'
            }]
          }]
        }, {
          'rightName': '画像管理',
          'rightRootId': 'PagePermission',
          'levelSort': 3,
          'sysId': 'center',
          'rightId': 'PortraitManage',
          'state': 'half',
          'authorityUserBeanList': [{
            'rightName': '用户画像',
            'rightRootId': 'PortraitManage',
            'levelSort': 4,
            'sysId': 'center',
            'rightId': 'PortraitManageUserPortrait',
            'state': 'half',
            'authorityUserBeanList': [{
              'rightName': '查询',
              'rightRootId': 'PortraitManageUserPortrait',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'PortraitManageUserPortrait_search',
              'state': 'on'
            }, {
              'rightName': '新增',
              'rightRootId': 'PortraitManageUserPortrait',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'PortraitManageUserPortrait_add',
              'state': 'on'
            }, {
              'rightName': '编辑',
              'rightRootId': 'PortraitManageUserPortrait',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'PortraitManageUserPortrait_update',
              'state': 'on'
            }, {
              'rightName': '失效',
              'rightRootId': 'PortraitManageUserPortrait',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'PortraitManageUserPortrait_lose',
              'state': 'on'
            }, {
              'rightName': '详情',
              'rightRootId': 'PortraitManageUserPortrait',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'PortraitManageUserPortrait_detail',
              'state': 'on'
            }, {
              'rightName': '共享',
              'rightRootId': 'PortraitManageUserPortrait',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'PortraitManageUserPortrait_share',
              'state': 'on'
            }, {
              'rightName': '查看群体画像',
              'rightRootId': 'PortraitManageUserPortrait',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'PortraitManageUserPortrait_groupPortrait',
              'state': 'on'
            }]
          }]
        }, {
          'rightName': '系统管理',
          'rightRootId': 'PagePermission',
          'levelSort': 3,
          'sysId': 'center',
          'rightId': 'SystemManage',
          'state': 'on',
          'authorityUserBeanList': [{
            'rightName': '人员管理',
            'rightRootId': 'SystemManage',
            'levelSort': 4,
            'sysId': 'center',
            'rightId': 'SystemManageUserManage',
            'state': 'on',
            'authorityUserBeanList': [{
              'rightName': '查询',
              'rightRootId': 'SystemManageUserManage',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'SystemManageUserManage_search',
              'state': 'on'
            }, {
              'rightName': '新增',
              'rightRootId': 'SystemManageUserManage',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'SystemManageUserManage_add',
              'state': 'on'
            }, {
              'rightName': '日志详情',
              'rightRootId': 'SystemManageUserManage',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'SystemManageUserManage_detail',
              'state': 'on'
            }]
          }, {
            'rightName': '日志管理',
            'rightRootId': 'SystemManage',
            'levelSort': 4,
            'sysId': 'center',
            'rightId': 'SystemManageLogManage',
            'state': 'on',
            'authorityUserBeanList': [{
              'rightName': '查询',
              'rightRootId': 'SystemManageLogManage',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'SystemManageLogManage_search',
              'state': 'on'
            }]
          }, {
            'rightName': '标签类别管理',
            'rightRootId': 'SystemManage',
            'levelSort': 4,
            'sysId': 'center',
            'rightId': 'SystemManageLabelTag',
            'state': 'on',
            'authorityUserBeanList': [{
              'rightName': '新增',
              'rightRootId': 'SystemManageLabelTag',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'SystemManageLabelTag_add',
              'state': 'on'
            }, {
              'rightName': '编辑',
              'rightRootId': 'SystemManageLabelTag',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'SystemManageLabelTag_update',
              'state': 'on'
            }, {
              'rightName': '删除',
              'rightRootId': 'SystemManageLabelTag',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'SystemManageLabelTag_del',
              'state': 'on'
            }]
          }]
        }, {
          'rightName': '用户群管理',
          'rightRootId': 'PagePermission',
          'levelSort': 3,
          'sysId': 'center',
          'rightId': 'GroupManage',
          'state': 'on',
          'authorityUserBeanList': [{
            'rightName': '用户群管理',
            'rightRootId': 'GroupManage',
            'levelSort': 4,
            'sysId': 'center',
            'rightId': 'GroupManageUserGroup',
            'state': 'on',
            'authorityUserBeanList': [{
              'rightName': '查询',
              'rightRootId': 'GroupManageUserGroup',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'GroupManageUserGroup_search',
              'state': 'on'
            }, {
              'rightName': '新增',
              'rightRootId': 'GroupManageUserGroup',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'GroupManageUserGroup_add',
              'state': 'on'
            }, {
              'rightName': '详情',
              'rightRootId': 'GroupManageUserGroup',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'GroupManageUserGroup_catDetail',
              'state': 'on'
            }, {
              'rightName': '筛选',
              'rightRootId': 'GroupManageUserGroup',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'GroupManageUserGroup_filter',
              'state': 'on'
            }, {
              'rightName': 'BI自助分析',
              'rightRootId': 'GroupManageUserGroup',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'GroupManageUserGroup_selfAnalysis',
              'state': 'on'
            }, {
              'rightName': '查看BI自助分析历史记录',
              'rightRootId': 'GroupManageUserGroup',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'GroupManageUserGroup_analysisHistory',
              'state': 'on'
            }, {
              'rightName': 'BI报表分析历史数据',
              'rightRootId': 'GroupManageUserGroup',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'GroupManageUserGroupAnalyisHistory',
              'state': 'on',
              'authorityUserBeanList': [{
                'rightName': 'BI分析',
                'rightRootId': 'GroupManageUserGroupAnalyisHistory',
                'levelSort': 6,
                'sysId': 'center',
                'rightId': 'GroupManageUserGroupAnalyisHistory_update',
                'state': 'on'
              }, {
                'rightName': 'BI分析历史搜索',
                'rightRootId': 'GroupManageUserGroupAnalyisHistory',
                'levelSort': 6,
                'sysId': 'center',
                'rightId': 'GroupManageUserGroupAnalyisHistory_search',
                'state': 'on'
              }]
            }, {
              'rightName': 'BI分析',
              'rightRootId': 'GroupManageUserGroup',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'GroupManageUserGroupAnalyisSelect',
              'state': 'on'
            }, {
              'rightName': '创建子用户群',
              'rightRootId': 'GroupManageUserGroup',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'GroupManageUserGroupCreateSubgroup',
              'state': 'on'
            }]
          }]
        }, {
          'rightName': '活动管理',
          'rightRootId': 'PagePermission',
          'levelSort': 3,
          'sysId': 'center',
          'rightId': 'MarketingManage',
          'state': 'on',
          'authorityUserBeanList': [{
            'rightName': '活动管理',
            'rightRootId': 'MarketingManage',
            'levelSort': 4,
            'sysId': 'center',
            'rightId': 'MarketingManageMarketingActivity',
            'state': 'on',
            'authorityUserBeanList': [{
              'rightName': '查询',
              'rightRootId': 'MarketingManageMarketingActivity',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'MarketingManageMarketingActivity_search',
              'state': 'on'
            }, {
              'rightName': '新增',
              'rightRootId': 'MarketingManageMarketingActivity',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'MarketingManageMarketingActivity_addSubActivity',
              'state': 'on'
            }, {
              'rightName': '新增主活动',
              'rightRootId': 'MarketingManageMarketingActivity',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'MarketingManageMarketingActivity_addActivity',
              'state': 'on'
            }, {
              'rightName': '生成文件',
              'rightRootId': 'MarketingManageMarketingActivity',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'MarketingManageMarketingActivity_generateFile',
              'state': 'on'
            }, {
              'rightName': '编辑',
              'rightRootId': 'MarketingManageMarketingActivity',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'MarketingManageMarketingActivity_updActivity',
              'state': 'on'
            }, {
              'rightName': '结束',
              'rightRootId': 'MarketingManageMarketingActivity',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'MarketingManageMarketingActivity_endActivity',
              'state': 'on'
            }, {
              'rightName': '查看详情',
              'rightRootId': 'MarketingManageMarketingActivity',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'MarketingManageMarketingActivity_activityDetail',
              'state': 'on'
            }, {
              'rightName': '查看数据',
              'rightRootId': 'MarketingManageMarketingActivity',
              'levelSort': 5,
              'sysId': 'center',
              'rightId': 'MarketingManageMarketingActivity_viewData',
              'state': 'on'
            }]
          }]
        }]
      }, {
        'rightName': '数据权限',
        'rightRootId': 'UserPortraitSystem',
        'levelSort': 2,
        'sysId': 'center',
        'rightId': 'DataPermission',
        'state': 'on',
        'authorityUserBeanList': [{
          'rightName': '乘用车',
          'rightRootId': 'DataPermission',
          'levelSort': 3,
          'sysId': 'center',
          'rightId': '05',
          'state': 'on'
        }, {
          'rightName': '车享家',
          'rightRootId': 'DataPermission',
          'levelSort': 3,
          'sysId': 'center',
          'rightId': '01',
          'state': 'on'
        }, {
          'rightName': '环球车享',
          'rightRootId': 'DataPermission',
          'levelSort': 3,
          'sysId': 'center',
          'rightId': '03',
          'state': 'on'
        }, {
          'rightName': '大通',
          'rightRootId': 'DataPermission',
          'levelSort': 3,
          'sysId': 'center',
          'rightId': '04',
          'state': 'on'
        }, {
          'rightName': '享道',
          'rightRootId': 'DataPermission',
          'levelSort': 3,
          'sysId': 'center',
          'rightId': '02',
          'state': 'on'
        }]
      }]
    }],
    'errCode': 0,
    'errMsg': 'ok'
  }
}

Mock.mock(/\/SystemRoleCenterOpenService\/getUserInfoByAccount/, getUserInfoByAccount)
Mock.mock(/\/SystemRoleCenterOpenService\/checkAccount/, checkAccount)
Mock.mock(/\/SystemRoleCenterOpenService\/getAllAuthorityTree/, getAllAuthorityTree)
Mock.mock(/\/test/, test)
  