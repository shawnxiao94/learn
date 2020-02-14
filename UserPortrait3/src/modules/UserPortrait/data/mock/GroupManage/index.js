/**
 * 用户群 数据仓库
 */
import Mock from 'mockjs'

/**
 * 用户群列表
 */
const findByPage =
{
  'ErrorCode': 0,
  'Result': {
    'data': {
      'number': 1,
      'last': true,
      'numberOfElements': 10,
      'size': 10,
      'totalPages': 2,
      'content': [{
        'crtTime': 1569400737000,
        'description': '',
        'operatorStatus': 2,
        'srcChannelCode': '01',
        'crtUser': '测试',
        'expDate': 1569081600000,
        'effDate': 1568908800000,
        'userCount': 98,
        'children': [],
        'updUser': '测试',
        'updTime': 1569400737000,
        'name': '测试00001211',
        'channelName': '车享家',
        'id': 31,
        'protraitId': 490,
        'status': 0
      }, {
        'crtTime': 1569304237000,
        'description': '',
        'operatorStatus': 2,
        'srcChannelCode': '01',
        'crtUser': '测试',
        'expDate': 1569081600000,
        'effDate': 1568822400000,
        'userCount': 10,
        'children': [],
        'updUser': '测试',
        'updTime': 1569304237000,
        'name': 'test 9',
        'channelName': '车享家',
        'id': 30,
        'protraitId': 490,
        'status': 0
      }, {
        'crtTime': 1569234600000,
        'description': '',
        'operatorStatus': 2,
        'srcChannelCode': '01',
        'crtUser': '测试',
        'expDate': 1568995200000,
        'effDate': 1568822400000,
        'userCount': 10,
        'children': [],
        'updUser': '测试',
        'updTime': 1569234600000,
        'name': '3434343',
        'channelName': '车享家',
        'id': 29,
        'protraitId': 490,
        'status': 0
      }, {
        'crtTime': 1569224458000,
        'description': '',
        'operatorStatus': 2,
        'srcChannelCode': '01',
        'crtUser': '测试',
        'expDate': 1569081600000,
        'effDate': 1567526400000,
        'children': [],
        'updUser': '测试',
        'updTime': 1569224458000,
        'name': '11212',
        'channelName': '车享家',
        'id': 27,
        'protraitId': 490,
        'status': 0
      }, {
        'crtTime': 1569224409000,
        'description': '',
        'operatorStatus': 2,
        'srcChannelCode': '01',
        'crtUser': '测试',
        'expDate': 1569081600000,
        'effDate': 1568908800000,
        'children': [],
        'updUser': '测试',
        'updTime': 1569224409000,
        'name': '用户群名称121221',
        'channelName': '车享家',
        'id': 26,
        'protraitId': 490,
        'status': 0
      }, {
        'crtTime': 1569223953000,
        'description': '',
        'operatorStatus': 2,
        'srcChannelCode': '05',
        'crtUser': '测试',
        'expDate': 1569081600000,
        'effDate': 1568908800000,
        'children': [],
        'updUser': '测试',
        'updTime': 1569223953000,
        'name': '用户群名称001',
        'channelName': '乘用车',
        'id': 25,
        'protraitId': 490,
        'status': 0
      }, {
        'crtTime': 1569223873000,
        'description': '',
        'operatorStatus': 2,
        'srcChannelCode': '05',
        'crtUser': '测试',
        'expDate': 1568390400000,
        'effDate': 1568217600000,
        'children': [],
        'updUser': '测试',
        'updTime': 1569223873000,
        'name': '11111',
        'channelName': '乘用车',
        'id': 24,
        'protraitId': 490,
        'status': 0
      }, {
        'crtTime': 1566969756000,
        'description': '',
        'operatorStatus': 2,
        'srcChannelCode': '02',
        'crtUser': '享道测试专用',
        'expDate': 1567612800000,
        'effDate': 1567353600000,
        'children': [],
        'updUser': '享道测试专用',
        'updTime': 1566969756000,
        'name': '9999',
        'channelName': '享道',
        'id': 23,
        'protraitId': 491,
        'status': 0
      }, {
        'crtTime': 1566969726000,
        'description': '',
        'operatorStatus': 2,
        'srcChannelCode': '02',
        'crtUser': '享道测试专用',
        'expDate': 1567008000000,
        'effDate': 1566921600000,
        'children': [],
        'updUser': '享道测试专用',
        'updTime': 1566969726000,
        'name': '00000',
        'channelName': '享道',
        'id': 22,
        'protraitId': 491,
        'status': 0
      }, {
        'crtTime': 1566809787000,
        'description': '',
        'operatorStatus': 2,
        'srcChannelCode': '01',
        'crtUser': '测试',
        'expDate': 1567094400000,
        'effDate': 1566748800000,
        'userCount': 4,
        'children': [],
        'updUser': '测试',
        'updTime': 1566809787000,
        'name': '测试玩玩',
        'channelName': '车享家',
        'id': 20,
        'protraitId': 490,
        'status': 0
      }],
      'first': false,
      'totalElements': 14
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}
Mock.mock(/\/UserShareGroupOpenService\/findByPage/, findByPage)

/**
 * 用户群详情
 */
const findById =
{
  'ErrorCode': 0,
  'Result': {
    'data': {
      'crtTime': 1569400737000,
      'description': '',
      'operatorStatus': 2,
      'srcChannelCode': '01',
      'crtUser': '测试',
      'protraitName': 'ssss',
      'expDate': 1569081600000,
      'shareChannelCodes': [{
        'channelName': '享道',
        'channelCode': '02'
      }, {
        'channelName': '大通',
        'channelCode': '04'
      }, {
        'channelName': '乘用车',
        'channelCode': '05'
      }],
      'effDate': 1568908800000,
      'updUser': '测试',
      'updTime': 1569400737000,
      'name': '测试00001211',
      'channelName': '车享家',
      'id': 31,
      'status': 0
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}
Mock.mock(/\/UserShareGroupOpenService\/findById/, findById)