import Mock from 'mockjs'
/**
 * 数据概览
 */
const businessOverview = {
  ErrorCode: 0,
  Result: {
    'data': {
      'userTotal': 65,
      'max': 65 * 2,
      'channelTotalList': [
        {
          'portraitTotal': 0,
          'tagTotal': 11,
          'channelName': '车享家',
          'userTotal': 80,
          'channelCode': '01'
        },
        {
          'portraitTotal': 53,
          'tagTotal': 1,
          'channelName': '享道',
          'userTotal': 93,
          'channelCode': '02'
        },
        {
          'portraitTotal': 0,
          'tagTotal': 2,
          'channelName': '环球车享',
          'userTotal': 122,
          'channelCode': '03'
        },
        {
          'portraitTotal': 0,
          'tagTotal': 1,
          'channelName': '大通',
          'userTotal': 125,
          'channelCode': '04'
        },
        {
          'portraitTotal': 0,
          'tagTotal': 9,
          'channelName': '乘用车',
          'userTotal': 140,
          'channelCode': '05'
        }
      ]
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}
Mock.mock(/\/OverviewOpenService\/businessOverview/, businessOverview)

/**
 * 业务趋势
 */
const businessTrend = {
  ErrorCode: 0,
  Result: {
    'data': {
      'tagTotalList': [
        {
          'date': '20190802',
          'value': '4'
        },
        {
          'date': '20190803',
          'value': 0
        },
        {
          'date': '20190804',
          'value': 0
        },
        {
          'date': '20190805',
          'value': 0
        }
      ],
      'userTotalList': [
        {
          'date': '20190802',
          'value': 0
        },
        {
          'date': '20190803',
          'value': 0
        },
        {
          'date': '20190804',
          'value': 0
        },
        {
          'date': '20190805',
          'value': 0
        }
      ],
      'portraitTotalList': [
        {
          'date': '20190802',
          'value': 0
        },
        {
          'date': '20190803',
          'value': 0
        },
        {
          'date': '20190804',
          'value': 0
        },
        {
          'date': '20190805',
          'value': 0
        }
      ]
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}
Mock.mock(/\/OverviewOpenService\/businessTrend/, businessTrend)