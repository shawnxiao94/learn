import Mock from 'mockjs'
const general = {
  ErrorCode: 0,
  Result: {
    data: {
      'portraitTotal': 5300000,
      'tagRate': '100.00',
      'tagTotal': 11,
      'baseUserGroupRate': '100.00',
      'monthTagTotal': 11,
      'monthUserTotal': 65,
      'monthPortraitTotal': 0,
      'userTotal': 5500000000,
      'userRate': '118.00',
      'userGroupShareTotal': 423456789,
      'monthUserGroupShareTotal': 4,
      'portraitRate': '0.00'
    },
    // data: {
    //   a: [
    //     {
    //       title: '总用户数',
    //       num: '12321232'
    //     },
    //     {
    //       title: '当月用户',
    //       num: '121'
    //     }
    //   ],
    //   b: [
    //     {
    //       title: '用户画像',
    //       num: '123'
    //     },
    //     {
    //       title: '当月画像',
    //       num: '12'
    //     }
    //   ],
    //   c: [
    //     {
    //       title: '标签总量',
    //       num: '12'
    //     },
    //     {
    //       title: '当月标签',
    //       num: '12'
    //     }
    //   ],
    //   d: [{
    //     title: '总用户群',
    //     num: '123'
    //   },
    //   {
    //     title: '当月用户群',
    //     num: '12'
    //   }]
    // },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/general/, general)