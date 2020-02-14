/**
 * 标签管理 前端MOCK 数据仓库
 */
import Mock from 'mockjs'

/**
 * 标签画像 - 标签列表
 */
const queryTags =
{
  'ErrorCode': 0,
  'Result': {
    'data': {
      'number': 1,
      'last': false,
      'numberOfElements': 10,
      'size': 10,
      'totalPages': 8,
      'content': [{
        'reason': '基础类型',
        'tagCode': 'd9d8503e753e4e7fba18fd4aa770d0f9',
        'portraitTotals': 0,
        'crtTime': 1569489360000,
        'shareChannelTotals': 2,
        'ifIncludePortrait': 0,
        'label': '标签测试数据001',
        'categoryName': '基础类型',
        'expDate': 1569686400000,
        'codeStatus': 'PAS0100',
        'tagDesc': '11111',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1569427200000,
        'isOpen': 0,
        'isInDate': 0,
        'tagType': 'algorithm',
        'channelName': '集团',
        'id': 307,
        'value': 307,
        'channelCode': '00',
        'shareStatus': 1
      }, {
        'reason': '基础类型',
        'tagCode': 'b3b18f6f913f46ee8efc28514dc2a841',
        'portraitTotals': 0,
        'crtTime': 1569488997000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'label': '111111111112223331',
        'categoryName': '基础类型',
        'expDate': 1569686400000,
        'codeStatus': 'PAS0100',
        'tagDesc': '1111',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1569600000000,
        'isOpen': 0,
        'isInDate': 0,
        'tagType': 'algorithm',
        'channelName': '集团',
        'id': 306,
        'value': 306,
        'channelCode': '00',
        'shareStatus': 0
      }, {
        'reason': '基础类型',
        'tagCode': '4ae75590e4d742f396d70ce6ea14c437',
        'portraitTotals': 0,
        'crtTime': 1568945941000,
        'shareChannelTotals': 4,
        'ifIncludePortrait': 0,
        'label': 'william_test_06',
        'categoryName': '基础类型',
        'expDate': 1574438400000,
        'codeStatus': 'PAS0100',
        'tagDesc': '',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1568908800000,
        'isOpen': 1,
        'isInDate': 1,
        'tagType': 'statistical',
        'channelName': '集团',
        'id': 305,
        'value': 305,
        'channelCode': '00',
        'shareStatus': 1
      }, {
        'reason': '基础类型',
        'tagCode': 'a5ce5dc3888943f18aa36a9dc4674a97',
        'portraitTotals': 0,
        'crtTime': 1568885062000,
        'shareChannelTotals': 2,
        'ifIncludePortrait': 0,
        'label': '新建tag2',
        'categoryName': '基础类型',
        'expDate': 1572796800000,
        'codeStatus': 'PAS0100',
        'tagDesc': '自动化测试专用',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1569427200000,
        'isOpen': 1,
        'isInDate': 1,
        'tagType': 'statistical',
        'channelName': '集团',
        'id': 304,
        'value': 304,
        'channelCode': '00',
        'shareStatus': 1
      }, {
        'reason': '基础类型',
        'tagCode': '434deaaec8f7437c90f18643d89d1b07',
        'portraitTotals': 0,
        'crtTime': 1568881088000,
        'shareChannelTotals': 5,
        'ifIncludePortrait': 0,
        'label': 'william_test_05',
        'categoryName': '基础类型',
        'expDate': 3085228800000,
        'codeStatus': 'PAS0100',
        'tagDesc': '',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1568822400000,
        'isOpen': 1,
        'isInDate': 1,
        'tagType': 'statistical',
        'channelName': '集团',
        'id': 303,
        'value': 303,
        'channelCode': '00',
        'shareStatus': 1
      }, {
        'reason': '基础类型',
        'tagCode': '68878c75fe9b4f68bfa784e78550947e',
        'portraitTotals': 1,
        'crtTime': 1568875383000,
        'shareChannelTotals': 5,
        'ifIncludePortrait': 1,
        'label': 'william_test_04',
        'categoryName': '基础类型',
        'expDate': 1571760000000,
        'codeStatus': 'PAS0100',
        'tagDesc': '',
        'ifEffectPortrait': 1,
        'clientTotals': 0,
        'effDate': 1568822400000,
        'isOpen': 1,
        'isInDate': 1,
        'tagType': 'statistical',
        'channelName': '集团',
        'id': 302,
        'value': 302,
        'channelCode': '00',
        'shareStatus': 1
      }, {
        'reason': '基础类型',
        'tagCode': '2ceed1cfa14e422ea833932c5f07ba1d',
        'portraitTotals': 0,
        'crtTime': 1568798964000,
        'shareChannelTotals': 4,
        'ifIncludePortrait': 0,
        'label': '3331111',
        'categoryName': '基础类型',
        'expDate': 1571587200000,
        'codeStatus': 'PAS0100',
        'tagDesc': '333311111',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1568995200000,
        'isOpen': 1,
        'isInDate': 1,
        'tagType': 'algorithm',
        'channelName': '车享家',
        'id': 300,
        'value': 300,
        'channelCode': '01',
        'shareStatus': 1
      }, {
        'reason': '基础类型',
        'tagCode': '2292adaf2b254660ba2c4f399b8a446f',
        'portraitTotals': 0,
        'crtTime': 1568790769000,
        'shareChannelTotals': 2,
        'ifIncludePortrait': 0,
        'label': '333',
        'categoryName': '基础类型',
        'expDate': 1571846400000,
        'codeStatus': 'PAS0100',
        'tagDesc': '3333',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1569600000000,
        'isOpen': 1,
        'isInDate': 1,
        'tagType': 'algorithm',
        'channelName': '车享家',
        'id': 299,
        'value': 299,
        'channelCode': '01',
        'shareStatus': 1
      }, {
        'reason': '基础类型',
        'tagCode': 'afe8ce65547a460795328f84745d1614',
        'portraitTotals': 0,
        'crtTime': 1568788103000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'label': '111',
        'categoryName': '基础类型',
        'expDate': 1568736000000,
        'codeStatus': 'PAS0100',
        'tagDesc': '1111',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1568736000000,
        'isOpen': 0,
        'isInDate': 0,
        'tagType': 'statistical',
        'channelName': '车享家',
        'id': 298,
        'value': 298,
        'channelCode': '01',
        'shareStatus': 0
      }, {
        'reason': '基础类型',
        'tagCode': 'ee63a6f7869c41fe8316253ab7236ef2',
        'portraitTotals': 0,
        'crtTime': 1568788048000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'label': '1111',
        'categoryName': '基础类型',
        'expDate': 1568736000000,
        'codeStatus': 'PAS0100',
        'tagDesc': '111',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1568736000000,
        'isOpen': 0,
        'isInDate': 0,
        'tagType': 'algorithm',
        'channelName': '车享家',
        'id': 297,
        'value': 297,
        'channelCode': '01',
        'shareStatus': 0
      }],
      'first': false,
      'totalElements': 77
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}

/**
 * 标签画像 - 标签列表-查询用户数
 */
const queryTagUserCounts =
{
  'ErrorCode': 0,
  'Result': {
    'data': [{
      'id': 307,
      'type': 'algorithm',
      'userCounts': 0
    }, {
      'id': 306,
      'type': 'algorithm',
      'userCounts': 0
    }, {
      'id': 305,
      'type': 'statistical',
      'userCounts': 0
    }, {
      'id': 304,
      'type': 'statistical',
      'userCounts': 0
    }, {
      'id': 303,
      'type': 'statistical',
      'userCounts': 0
    }, {
      'id': 302,
      'type': 'statistical',
      'userCounts': 0
    }, {
      'id': 300,
      'type': 'algorithm',
      'userCounts': 0
    }, {
      'id': 299,
      'type': 'algorithm',
      'userCounts': 0
    }, {
      'id': 298,
      'type': 'statistical',
      'userCounts': 0
    }, {
      'id': 297,
      'type': 'algorithm',
      'userCounts': 0
    }],
    'errCode': 0,
    'errMsg': 'ok'
  }
}

/**
 * 标签画像 - 标签详情
 */
const queryTagByTagId =
{
  'ErrorCode': 0,
  'Result': {
    'data': {
      'portraitDtos': [],
      'sourceDtos': [],
      'tagRuleDtos': [],
      'userCounts': 0,
      'tagDto': {
        'tagCode': 'b3b18f6f913f46ee8efc28514dc2a841',
        'portraitTotals': 0,
        'crtTime': 1569488997000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'tagName': '111111111112223331',
        'categoryName': '基础类型',
        'expDate': 1569686400000,
        'codeStatus': 'PAS0100',
        'tagDesc': '1111',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1569600000000,
        'isOpen': 0,
        'isInDate': 0,
        'tagType': 'algorithm',
        'tagCategoryId': 5,
        'channelName': '集团',
        'id': 306,
        'channelCode': '00',
        'shareStatus': 0
      }
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}

/**
 * 标签共享查询
 */
const queryTagAndChannel =
{
  'ErrorCode': 0,
  'Result': {
    'data': {
      'tagId': 305,
      'sourceDtos': [{
        'ifSelect': 1,
        'flag': 0,
        'channelName': '车享家',
        'ifPortrait': 0,
        'channelCode': '01'
      }, {
        'ifSelect': 1,
        'flag': 0,
        'channelName': '享道',
        'ifPortrait': 0,
        'channelCode': '02'
      }, {
        'ifSelect': 1,
        'flag': 0,
        'channelName': '环球车享',
        'ifPortrait': 0,
        'channelCode': '03'
      }, {
        'ifSelect': 0,
        'flag': 0,
        'channelName': '大通',
        'ifPortrait': 0,
        'channelCode': '04'
      }, {
        'ifSelect': 1,
        'flag': 0,
        'channelName': '乘用车',
        'ifPortrait': 0,
        'channelCode': '05'
      }],
      'tagName': 'william_test_06'
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}

/**
 * 标签共享新增编辑
 */
const addShareChannel =
{
  'ErrorCode': 0,
  'Result': {
    'data': 305,
    'errCode': 0,
    'errMsg': 'ok'
  }
}

Mock.mock(/\/TagOpenService\/addShareChannel/, addShareChannel)
Mock.mock(/\/TagOpenService\/queryTagAndChannel/, queryTagAndChannel)
Mock.mock(/\/TagOpenService\/queryTags/, queryTags)
Mock.mock(/\/TagOpenService\/queryTagByTagId/, queryTagByTagId)
Mock.mock(/\/TagOpenService\/queryTagUserCounts/, queryTagUserCounts)
  