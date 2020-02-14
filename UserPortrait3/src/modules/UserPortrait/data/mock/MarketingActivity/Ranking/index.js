/**
 * 活动排名 前端MOCK
 */
import Mock from 'mockjs'

const getRankData = {
  'ErrorCode': 0,
  'Result': {
    'data': {
      'enterStoreConversionRate': [{
        'markName': 'FTP主活动',
        'rate': '1.0000',
        'id': 267
      }, {
        'markName': '不同渠道双主群主活动',
        'rate': '1.0000',
        'id': 274
      }, {
        'markName': '同渠道双主群主活动',
        'rate': '1.0000',
        'id': 277
      }, {
        'markName': '接口多主群',
        'rate': '0.7857',
        'id': 281
      }, {
        'markName': '接口主活动1',
        'rate': '0.6667',
        'id': 271
      }],
      'turnoverConversionRate': []
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}

Mock.mock(/\/MarketingCenterOpenService\/queryActivityRanking/, getRankData)