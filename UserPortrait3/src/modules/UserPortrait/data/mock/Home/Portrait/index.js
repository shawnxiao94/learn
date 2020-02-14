/**
 * 标签管理 前端MOCK 数据仓库
 */
import Mock from 'mockjs'

/**
 * 查询画像列表
 */
const findByPage =
{
  'ErrorCode': 0,
  'Result': {
    'data': {
      'number': 1,
      'last': false,
      'numberOfElements': 10,
      'size': 10,
      'totalPages': 9,
      'content': [{
        'shareFlag': 0,
        'tagSum': 9,
        'portraitName': 'william_test_01',
        'crtTime': 1569216754000,
        'crtUser': '雷李艳',
        'expDate': 1569600000000,
        'effDate': 1569168000000,
        'updUser': '雷李艳',
        'updTime': 1569216754000,
        'channelName': '大通',
        'id': 493,
        'channelCode': '04',
        'status': '0'
      }, {
        'shareFlag': 0,
        'tagSum': 3,
        'portraitName': '测试',
        'crtTime': 1567748671000,
        'crtUser': '画像集团用户',
        'expDate': 1568908800000,
        'effDate': 1567699200000,
        'updUser': '画像集团用户',
        'updTime': 1567748671000,
        'channelName': '集团',
        'id': 492,
        'channelCode': '00',
        'status': '0'
      }, {
        'shareFlag': 0,
        'tagSum': 1,
        'portraitName': '5555',
        'crtTime': 1566962456000,
        'crtUser': '享道测试专用',
        'expDate': 1567699200000,
        'effDate': 1566921600000,
        'updUser': '享道测试专用',
        'updTime': 1566962456000,
        'channelName': '享道',
        'id': 491,
        'channelCode': '02',
        'status': '0'
      }, {
        'shareFlag': 0,
        'tagSum': 3,
        'portraitName': 'test880',
        'description': '1221',
        'crtTime': 1566800298000,
        'crtUser': '测试',
        'expDate': 1567180800000,
        'effDate': 1566662400000,
        'updUser': '测试',
        'updTime': 1566713912000,
        'channelName': '乘用车',
        'id': 489,
        'channelCode': '05',
        'status': '0'
      }, {
        'shareFlag': 0,
        'tagSum': 2,
        'portraitName': 'ssss',
        'description': 'sss',
        'crtTime': 1566723299000,
        'crtUser': '测试',
        'expDate': 1569206541000,
        'effDate': 1566748800000,
        'updUser': '测试',
        'updTime': 1569206541000,
        'channelName': '车享家',
        'id': 490,
        'channelCode': '01',
        'status': '0'
      }, {
        'shareFlag': 0,
        'tagSum': 1,
        'portraitName': '23123123123',
        'description': '123123',
        'crtTime': 1560152781000,
        'crtUser': '孙振军',
        'expDate': 1560182400000,
        'effDate': 1560096000000,
        'updUser': '孙振军',
        'updTime': 1560152781000,
        'channelName': '大通',
        'id': 488,
        'channelCode': '04',
        'status': '0'
      }, {
        'effDate': 1559145600000,
        'shareFlag': 0,
        'updTime': 1559201579000,
        'tagSum': 2,
        'portraitName': '啊啊',
        'description': '嗯嗯嗯',
        'crtTime': 1559201579000,
        'channelName': '享道',
        'id': 487,
        'expDate': 1561046400000,
        'channelCode': '02',
        'status': '0'
      }, {
        'effDate': 1559059200000,
        'shareFlag': 0,
        'updTime': 1559184998000,
        'portraitName': '营销算法画像3',
        'description': '1111',
        'crtTime': 1559096494000,
        'channelName': '享道',
        'id': 486,
        'expDate': 1561737600000,
        'channelCode': '02',
        'status': '0'
      }, {
        'effDate': 1559059200000,
        'shareFlag': 0,
        'updTime': 1559184219000,
        'portraitName': '营销算法画像2木木木木',
        'crtTime': 1559096464000,
        'channelName': '享道',
        'id': 485,
        'expDate': 1561737600000,
        'channelCode': '02',
        'status': '0'
      }, {
        'effDate': 1559059200000,
        'shareFlag': 0,
        'updTime': 1559182331000,
        'portraitName': '134',
        'crtTime': 1559095931000,
        'channelName': '享道',
        'id': 484,
        'expDate': 1561651200000,
        'channelCode': '02',
        'status': '0'
      }],
      'first': false,
      'totalElements': 83
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}

/**
 * 查询画像用户数
 */
const findPortraitUsers = {
  'ErrorCode': 0,
  'Result': {
    'data': [{
      'portraitId': 493,
      'portraitUsers': 0
    }, {
      'portraitId': 492,
      'portraitUsers': 0
    }, {
      'portraitId': 491,
      'portraitUsers': 0
    }, {
      'portraitId': 489,
      'portraitUsers': 0
    }, {
      'portraitId': 490,
      'portraitUsers': 0
    }, {
      'portraitId': 488,
      'portraitUsers': 0
    }, {
      'portraitId': 487,
      'portraitUsers': 0
    }, {
      'portraitId': 486,
      'portraitUsers': 0
    }, {
      'portraitId': 485,
      'portraitUsers': 0
    }, {
      'portraitId': 484,
      'portraitUsers': 0
    }],
    'errCode': 0,
    'errMsg': 'ok'
  }
}

Mock.mock(/\/PortraitOpenService\/findByPage/, findByPage)
Mock.mock(/\/PortraitOpenService\/findPortraitUsers/, findPortraitUsers)