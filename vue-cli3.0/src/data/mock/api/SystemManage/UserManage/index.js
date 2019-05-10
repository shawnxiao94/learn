import Mock from "mockjs";

// 获取人员列表API
const getRoleCenterUsers = {
  ErrorCode: 0,
  Result: {
    data: {
      totalPages: 3,
      roleCenterUserDtoList: [
        {
          orgName: "上汽集团",
          role: "上汽集团",
          mobile: "17701788388",
          loginDate: "-",
          userName: "廉程",
          userId: "17701788388",
          email: "liancheng@saicmotor.com",
          createDate: "2019-03-11"
        },
        {
          orgName: "-",
          role: "管理员",
          mobile: "18612613137",
          loginDate: "-",
          userName: "吴小龙",
          userId: "18612613137",
          email: "kiddwu@microsoft.com",
          createDate: "2019-01-23"
        },
        {
          orgName: "上汽集团",
          role: "",
          mobile: "17601320924",
          loginDate: "2019-04-02 10:16:18",
          userName: "圣亮",
          userId: "17601320924",
          email: "17601320924@163.com",
          loginCount: 1,
          createDate: "2019-01-17"
        },
        {
          orgName: "享道",
          role: "普通用户",
          mobile: "17301777035",
          loginDate: "-",
          userName: "周小娟",
          userId: "17301777035",
          email: "xiaojuan9177@163.com",
          createDate: "2019-01-16"
        },
        {
          orgName: "环球车享",
          role: "普通用户",
          mobile: "13162823532",
          loginDate: "2019-04-02 10:23:56",
          userName: "朱秀秀",
          userId: "13162823532",
          email: "ZZzhuxiuxiu@163.com",
          loginCount: 33,
          createDate: "2019-01-14"
        },
        {
          orgName: "乘用车",
          role: "普通用户",
          mobile: "18515805219",
          loginDate: "2019-04-01 19:37:12",
          userName: "束争光",
          userId: "18515805219",
          email: "18515805219@163.com",
          loginCount: 34,
          createDate: "2019-01-14"
        },
        {
          orgName: "车享家",
          role: "普通用户",
          mobile: "15901826793",
          loginDate: "2019-03-28 16:34:21",
          userName: "倪双一",
          userId: "15901826793",
          email: "nishuangyi@sina.com",
          loginCount: 17,
          createDate: "2019-01-14"
        },
        {
          orgName: "-",
          role: "系统管理员",
          mobile: "15214351990",
          loginDate: "2019-04-02 10:30:30",
          userName: "于小刚",
          userId: "15214351990",
          email: "yuxiaogang@broadtext.com.cn",
          loginCount: 26,
          createDate: "2019-01-13"
        },
        {
          orgName: "享道",
          role: "普通用户",
          mobile: "13169946786",
          loginDate: "2019-04-02 10:18:28",
          userName: "侯海燕",
          userId: "13169946786",
          email: "1913315545@qq.com",
          loginCount: 55,
          createDate: "2019-01-13"
        },
        {
          orgName: "大通",
          role: "普通用户",
          mobile: "15000286754",
          loginDate: "2019-03-26 10:04:07",
          userName: "孙振军",
          userId: "15000286754",
          email: "15000286754@163.com",
          loginCount: 3,
          createDate: "2019-01-13"
        }
      ],
      totalElements: 25
    },
    errCode: 0,
    errMsg: "ok"
  }
};
Mock.mock(
  /\/RoleCenterUserOpenService\/getRoleCenterUsers/,
  getRoleCenterUsers
);

// 获取操作日志和登录次数详情
const getUserOperationLogByUserId = {
  ErrorCode: 0,
  Result: {
    data: {
      number: 0,
      last: false,
      numberOfElements: 5,
      size: 5,
      totalPages: 18,
      content: [
        {
          role: "普通用户",
          createTime: 1554175851000,
          companyName: "-",
          succeed: 1,
          mobile: "17601235412",
          message: "新增手工型标签成功,标签名称:部分匹配",
          userName: "张振民",
          userId: "17601235412",
          content: "新增标签",
          email: "zhangzhenmin@heint.cn"
        },
        {
          role: "普通用户",
          createTime: 1554175299000,
          companyName: "-",
          succeed: 1,
          mobile: "17601235412",
          message: "新增手工型标签成功,标签名称:啊啊啊",
          userName: "张振民",
          userId: "17601235412",
          content: "新增标签",
          email: "zhangzhenmin@heint.cn"
        },
        {
          role: "普通用户",
          createTime: 1554173704000,
          companyName: "-",
          succeed: 1,
          mobile: "17601235412",
          message: '新增统计型标签成功,标签名称:集团.注册时间 = "2018-12-23',
          userName: "张振民",
          userId: "17601235412",
          content: "新增标签",
          email: "zhangzhenmin@heint.cn"
        },
        {
          role: "普通用户",
          createTime: 1554173623000,
          companyName: "-",
          succeed: 1,
          mobile: "17601235412",
          message: '新增统计型标签成功,标签名称:集团.生日 != "04-22"',
          userName: "张振民",
          userId: "17601235412",
          content: "新增标签",
          email: "zhangzhenmin@heint.cn"
        },
        {
          role: "普通用户",
          createTime: 1554173533000,
          companyName: "-",
          succeed: 1,
          mobile: "17601235412",
          message: '新增统计型标签成功,标签名称:集团.实名认证等级 = "已经实名',
          userName: "张振民",
          userId: "17601235412",
          content: "新增标签",
          email: "zhangzhenmin@heint.cn"
        }
      ],
      first: true,
      totalElements: 90
    },
    errCode: 0,
    errMsg: "ok"
  }
};
Mock.mock(
  /\/AuditLogOpenService\/getUserOperationLogByUserId/,
  getUserOperationLogByUserId
);
