import Mock from 'mockjs'
const businessPercent =
{
  'ErrorCode': 0,
  'Result': {
    'data': {
      'portraitBusiness': {
        'portraitCount': 0,
        'portraitDistributes': [{
          'channelName': '集团',
          'channelPortraitTotal': 0,
          'channelCode': '00'
        }, {
          'channelName': '车享家',
          'channelPortraitTotal': 0,
          'channelCode': '01'
        }, {
          'channelName': '享道',
          'channelPortraitTotal': 0,
          'channelCode': '02'
        }, {
          'channelName': '环球车享',
          'channelPortraitTotal': 0,
          'channelCode': '03'
        }, {
          'channelName': '大通',
          'channelPortraitTotal': 0,
          'channelCode': '04'
        }, {
          'channelName': '乘用车',
          'channelPortraitTotal': 0,
          'channelCode': '05'
        }]
      },
      'userBusiness': {
        'userCount': 65,
        'userDistributes': [{
          'channelUserTotal': 65,
          'channelName': '集团',
          'channelCode': '00'
        }, {
          'channelUserTotal': 80,
          'channelName': '车享家',
          'channelCode': '01'
        }, {
          'channelUserTotal': 93,
          'channelName': '享道',
          'channelCode': '02'
        }, {
          'channelUserTotal': 122,
          'channelName': '环球车享',
          'channelCode': '03'
        }, {
          'channelUserTotal': 125,
          'channelName': '大通',
          'channelCode': '04'
        }, {
          'channelUserTotal': 140,
          'channelName': '乘用车',
          'channelCode': '05'
        }]
      },
      'tagBusiness': {
        'tagCount': 18,
        'tagDistributes': [{
          'channelName': '集团',
          'channelCode': '00',
          'channelTagTotal': 10
        }, {
          'channelName': '车享家',
          'channelCode': '01',
          'channelTagTotal': 6
        }, {
          'channelName': '享道',
          'channelCode': '02',
          'channelTagTotal': 0
        }, {
          'channelName': '环球车享',
          'channelCode': '03',
          'channelTagTotal': 0
        }, {
          'channelName': '大通',
          'channelCode': '04',
          'channelTagTotal': 0
        }, {
          'channelName': '乘用车',
          'channelCode': '05',
          'channelTagTotal': 2
        }]
      }
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}

Mock.mock(/\/OverviewOpenService\/businessPercent/, businessPercent)