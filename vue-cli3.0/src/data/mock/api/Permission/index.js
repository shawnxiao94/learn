import Mock from "mockjs";

// 检查权限
const checkAccount = {
  ErrorCode: 0,
  Result: {
    data: 0,
    errCode: 0,
    errMsg: "ok"
  }
};
Mock.mock(/\/SystemRoleCenterOpenService\/checkAccount/, checkAccount);

// 获取权限树
const getAllAuthorityTree = {
  ErrorCode: 0,
  Result: {
    data: [
      {
        rightName: "用户画像",
        rightRootId: "ROOT",
        levelSort: 1,
        sysId: "DAM",
        rightId: "UserPortraitSystem",
        state: "on",
        authorityUserBeanList: [
          {
            rightName: "页面权限",
            rightRootId: "UserPortraitSystem",
            levelSort: 2,
            sysId: "DAM",
            rightId: "PagePermission",
            state: "on",
            authorityUserBeanList: [
              {
                rightName: "首页",
                rightRootId: "PagePermission",
                levelSort: 3,
                sysId: "DAM",
                rightId: "Home",
                state: "on",
                authorityUserBeanList: [
                  {
                    rightName: "首页",
                    rightRootId: "Home",
                    levelSort: 4,
                    sysId: "DAM",
                    rightId: "HomeIndex",
                    state: "on",
                    authorityUserBeanList: [
                      {
                        rightName: "查询",
                        rightRootId: "HomeIndex",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "HomeIndex_search",
                        state: "on"
                      }
                    ]
                  }
                ]
              },
              {
                rightName: "用户画像",
                rightRootId: "PagePermission",
                levelSort: 3,
                sysId: "DAM",
                rightId: "UserPortrait",
                state: "on",
                authorityUserBeanList: [
                  {
                    rightName: "群体画像",
                    rightRootId: "UserPortrait",
                    levelSort: 4,
                    sysId: "DAM",
                    rightId: "UserPortraitGroupPortrait",
                    state: "on",
                    authorityUserBeanList: [
                      {
                        rightName: "查询",
                        rightRootId: "UserPortraitGroupPortrait",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "UserPortraitGroupPortrait_search",
                        state: "on"
                      }
                    ]
                  },
                  {
                    rightName: "群体行为分析",
                    rightRootId: "UserPortrait",
                    levelSort: 4,
                    sysId: "DAM",
                    rightId: "UserPortraitGroupBehavior",
                    state: "on",
                    authorityUserBeanList: [
                      {
                        rightName: "查询",
                        rightRootId: "UserPortraitGroupBehavior",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "UserPortraitGroupBehavior_search",
                        state: "on"
                      }
                    ]
                  },
                  {
                    rightName: "个体画像",
                    rightRootId: "UserPortrait",
                    levelSort: 4,
                    sysId: "DAM",
                    rightId: "UserPortraitUnitPortrait",
                    state: "on",
                    authorityUserBeanList: [
                      {
                        rightName: "查询",
                        rightRootId: "UserPortraitUnitPortrait",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "UserPortraitUnitPortrait_search",
                        state: "on"
                      }
                    ]
                  },
                  {
                    rightName: "个体行为分析",
                    rightRootId: "UserPortrait",
                    levelSort: 4,
                    sysId: "DAM",
                    rightId: "UserPortraitUnitBehavior",
                    state: "on",
                    authorityUserBeanList: [
                      {
                        rightName: "查询",
                        rightRootId: "UserPortraitUnitBehavior",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "UserPortraitUnitBehavior_search",
                        state: "on"
                      }
                    ]
                  }
                ]
              },
              {
                rightName: "标签管理",
                rightRootId: "PagePermission",
                levelSort: 3,
                sysId: "DAM",
                rightId: "LabelManage",
                state: "on",
                authorityUserBeanList: [
                  {
                    rightName: "用户标签",
                    rightRootId: "LabelManage",
                    levelSort: 4,
                    sysId: "DAM",
                    rightId: "LabelManageUserLabel",
                    state: "on",
                    authorityUserBeanList: [
                      {
                        rightName: "查询",
                        rightRootId: "LabelManageUserLabel",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "LabelManageUserLabel_search",
                        state: "on"
                      },
                      {
                        rightName: "新增",
                        rightRootId: "LabelManageUserLabel",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "LabelManageUserLabel_add",
                        state: "on"
                      },
                      {
                        rightName: "编辑",
                        rightRootId: "LabelManageUserLabel",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "LabelManageUserLabel_update",
                        state: "on"
                      },
                      {
                        rightName: "失效",
                        rightRootId: "LabelManageUserLabel",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "LabelManageUserLabel_lose",
                        state: "on"
                      },
                      {
                        rightName: "详情",
                        rightRootId: "LabelManageUserLabel",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "LabelManageUserLabel_detail",
                        state: "on"
                      },
                      {
                        rightName: "共享",
                        rightRootId: "LabelManageUserLabel",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "LabelManageUserLabel_share",
                        state: "on"
                      },
                      {
                        rightName: "编辑共享",
                        rightRootId: "LabelManageUserLabel",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "LabelManageUserLabel_editShare",
                        state: "on"
                      }
                    ]
                  }
                ]
              },
              {
                rightName: "画像管理",
                rightRootId: "PagePermission",
                levelSort: 3,
                sysId: "DAM",
                rightId: "PortraitManage",
                state: "on",
                authorityUserBeanList: [
                  {
                    rightName: "用户画像",
                    rightRootId: "PortraitManage",
                    levelSort: 4,
                    sysId: "DAM",
                    rightId: "PortraitManageUserPortrait",
                    state: "on",
                    authorityUserBeanList: [
                      {
                        rightName: "查询",
                        rightRootId: "PortraitManageUserPortrait",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "PortraitManageUserPortrait_search",
                        state: "on"
                      },
                      {
                        rightName: "新增",
                        rightRootId: "PortraitManageUserPortrait",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "PortraitManageUserPortrait_add",
                        state: "on"
                      },
                      {
                        rightName: "编辑",
                        rightRootId: "PortraitManageUserPortrait",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "PortraitManageUserPortrait_update",
                        state: "on"
                      },
                      {
                        rightName: "失效",
                        rightRootId: "PortraitManageUserPortrait",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "PortraitManageUserPortrait_lose",
                        state: "on"
                      },
                      {
                        rightName: "删除",
                        rightRootId: "PortraitManageUserPortrait",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "PortraitManageUserPortrait_delete",
                        state: "on"
                      }
                    ]
                  }
                ]
              },
              {
                rightName: "系统管理",
                rightRootId: "PagePermission",
                levelSort: 3,
                sysId: "DAM",
                rightId: "SystemManage",
                state: "on",
                authorityUserBeanList: [
                  {
                    rightName: "用户管理",
                    rightRootId: "SystemManage",
                    levelSort: 4,
                    sysId: "DAM",
                    rightId: "SystemManageUserManage",
                    state: "on",
                    authorityUserBeanList: [
                      {
                        rightName: "查询",
                        rightRootId: "SystemManageUserManage",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "SystemManageUserManage_search",
                        state: "on"
                      },
                      {
                        rightName: "新增",
                        rightRootId: "SystemManageUserManage",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "SystemManageUserManage_add",
                        state: "on"
                      }
                    ]
                  },
                  {
                    rightName: "日志管理",
                    rightRootId: "SystemManage",
                    levelSort: 4,
                    sysId: "DAM",
                    rightId: "SystemManageLogManage",
                    state: "on",
                    authorityUserBeanList: [
                      {
                        rightName: "查询",
                        rightRootId: "SystemManageLogManage",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "SystemManageLogManage_search",
                        state: "on"
                      }
                    ]
                  },
                  {
                    rightName: "标签类别",
                    rightRootId: "SystemManage",
                    levelSort: 4,
                    sysId: "DAM",
                    rightId: "SystemManageLabelTag",
                    state: "on",
                    authorityUserBeanList: [
                      {
                        rightName: "新增",
                        rightRootId: "SystemManageLabelTag",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "SystemManageLabelTag_add",
                        state: "on"
                      },
                      {
                        rightName: "编辑",
                        rightRootId: "SystemManageLabelTag",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "SystemManageLabelTag_update",
                        state: "on"
                      },
                      {
                        rightName: "删除",
                        rightRootId: "SystemManageLabelTag",
                        levelSort: 5,
                        sysId: "DAM",
                        rightId: "SystemManageLabelTag_del",
                        state: "on"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            rightName: "数据权限",
            rightRootId: "UserPortraitSystem",
            levelSort: 2,
            sysId: "DAM",
            rightId: "DataPermission",
            state: "on",
            authorityUserBeanList: [
              {
                rightName: "乘用车",
                rightRootId: "DataPermission",
                levelSort: 3,
                sysId: "DAM",
                rightId: "05",
                state: "on"
              },
              {
                rightName: "车享家",
                rightRootId: "DataPermission",
                levelSort: 3,
                sysId: "DAM",
                rightId: "01",
                state: "on"
              },
              {
                rightName: "环球车享",
                rightRootId: "DataPermission",
                levelSort: 3,
                sysId: "DAM",
                rightId: "03",
                state: "on"
              },
              {
                rightName: "大通",
                rightRootId: "DataPermission",
                levelSort: 3,
                sysId: "DAM",
                rightId: "04",
                state: "on"
              },
              {
                rightName: "享道",
                rightRootId: "DataPermission",
                levelSort: 3,
                sysId: "DAM",
                rightId: "02",
                state: "on"
              }
            ]
          }
        ]
      }
    ],
    errCode: 0,
    errMsg: "ok"
  }
};
Mock.mock(
  /\/SystemRoleCenterOpenService\/getAllAuthorityTree/,
  getAllAuthorityTree
);

// 获取用户信息
const getUserInfoByAccount = {
  ErrorCode: 0,
  Result: {
    data: {
      updateDate: "2019-02-28",
      role: "集团",
      sysId: "DAM",
      mobile: "17601235412",
      updateAt: 1551346327165,
      userName: "张振民",
      branch: "",
      userId: "17601235412",
      createAt: 1551346327165,
      rightList: [
        "UserPortraitSystem",
        "PagePermission",
        "DataPermission",
        "Home",
        "UserPortrait",
        "LabelManage",
        "PortraitManage",
        "05",
        "01",
        "03",
        "04",
        "02",
        "HomeIndex",
        "UserPortraitGroupPortrait",
        "UserPortraitUnitPortrait",
        "LabelManageUserLabel",
        "PortraitManageUserPortrait",
        "HomeIndex_search",
        "UserPortraitGroupPortrait_search",
        "UserPortraitUnitPortrait_search",
        "LabelManageUserLabel_search",
        "LabelManageUserLabel_add",
        "LabelManageUserLabel_update",
        "LabelManageUserLabel_lose",
        "LabelManageUserLabel_detail",
        "LabelManageUserLabel_share",
        "LabelManageUserLabel_editShare",
        "PortraitManageUserPortrait_search",
        "PortraitManageUserPortrait_add",
        "PortraitManageUserPortrait_update",
        "PortraitManageUserPortrait_lose",
        "PortraitManageUserPortrait_delete"
      ],
      createdDate: "2019-02-28",
      sysName: "DAM",
      job: "",
      email: "zhangzhenmin@heint.cn"
    },
    errCode: 0,
    errMsg: "ok"
  }
};
Mock.mock(
  /\/SystemRoleCenterOpenService\/getUserInfoByAccount/,
  getUserInfoByAccount
);
