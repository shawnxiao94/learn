/**
 * 标签管理 前端MOCK 数据仓库
 */
import Mock from 'mockjs'

const getGroupList = {
  'ErrorCode': 0,
  'Result': {
    'data': {
      'number': 1,
      'last': true,
      'numberOfElements': 4,
      'size': 10,
      'totalPages': 1,
      'content': [{
        'crtTime': 1565835950000,
        'description': '',
        'operatorStatus': 1,
        'srcChannelCode': '01',
        'crtUser': '测试',
        'expDate': 1567094400000,
        'effDate': 1565798400000,
        'children': [],
        'updUser': '测试',
        'updTime': 1565836408000,
        'name': 'test190812222222225',
        'channelName': '车享家',
        'id': 25,
        'protraitId': 1029,
        'status': 1
      }, {
        'crtTime': 1565756739000,
        'description': '',
        'operatorStatus': 1,
        'srcChannelCode': '01',
        'crtUser': '测试',
        'expDate': 1566489600000,
        'effDate': 1565712000000,
        'children': [],
        'updUser': '测试',
        'updTime': 1565836408000,
        'name': '测试-che',
        'channelName': '车享家',
        'id': 21,
        'protraitId': 1036,
        'status': 1
      }, {
        'crtTime': 1565062165000,
        'description': '',
        'operatorStatus': 1,
        'srcChannelCode': '01',
        'crtUser': '测试',
        'expDate': 1567440000000,
        'effDate': 1565020800000,
        'userCount': 9,
        'children': [{
          'crtTime': 1565154168000,
          'description': '',
          'operatorStatus': 1,
          'srcChannelCode': '05',
          'crtUser': '测试',
          'expDate': 1567440000000,
          'parentId': 16,
          'effDate': 1565107200000,
          'updUser': '测试',
          'updTime': 1565154756000,
          'name': '乘用车 外地车牌',
          'channelName': '乘用车',
          'id': 17,
          'status': 1
        }, {
          'crtTime': 1565154311000,
          'description': '',
          'operatorStatus': 1,
          'srcChannelCode': '05',
          'crtUser': '测试',
          'expDate': 1567440000000,
          'parentId': 16,
          'effDate': 1565107200000,
          'updUser': '测试',
          'updTime': 1565155296000,
          'name': '乘用车 车龄大于5年',
          'channelName': '乘用车',
          'id': 18,
          'status': 1
        }, {
          'crtTime': 1565154870000,
          'description': '',
          'operatorStatus': 1,
          'srcChannelCode': '05',
          'crtUser': '测试',
          'expDate': 1567180800000,
          'parentId': 16,
          'effDate': 1565107200000,
          'updUser': '测试',
          'updTime': 1565155866000,
          'name': '乘用车 中环以内',
          'channelName': '乘用车',
          'id': 19,
          'status': 1
        }],
        'updUser': '测试',
        'updTime': 1565149276000,
        'name': '车享家给乘用车 里程10',
        'channelName': '车享家',
        'id': 16,
        'protraitId': 1035,
        'status': 1
      }, {
        'crtTime': 1564971627000,
        'description': '',
        'operatorStatus': 1,
        'srcChannelCode': '01',
        'crtUser': '测试',
        'expDate': 1567094400000,
        'effDate': 1564934400000,
        'userCount': 302,
        'children': [],
        'updUser': '测试',
        'updTime': 1565058582000,
        'name': '共享给大通-车享有效用户',
        'channelName': '车享家',
        'id': 15,
        'protraitId': 1029,
        'status': 1
      }],
      'first': false,
      'totalElements': 4
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}

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
Mock.mock(/\/UserShareGroupOpenService\/findByPage/, getGroupList)