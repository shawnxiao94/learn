/**
 * 用户群 数据仓库
 */
import Mock from 'mockjs'

/**
 * 选择标签 - 所属公司部门 - 下拉框数据
 */
const selectTagsQuerySources =
{
  'ErrorCode': 0,
  'Result': {
    'data': [{
      'ifSelect': 0,
      'flag': 0,
      'channelName': '集团',
      'ifPortrait': 0,
      'channelCode': '00'
    }, {
      'ifSelect': 0,
      'flag': 0,
      'channelName': '车享家',
      'ifPortrait': 0,
      'channelCode': '01'
    }, {
      'ifSelect': 0,
      'flag': 0,
      'channelName': '享道',
      'ifPortrait': 0,
      'channelCode': '02'
    }, {
      'ifSelect': 0,
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
      'ifSelect': 0,
      'flag': 0,
      'channelName': '乘用车',
      'ifPortrait': 0,
      'channelCode': '05'
    }],
    'errCode': 0,
    'errMsg': 'ok'
  }
}
Mock.mock(/\/TagOpenService\/selectTagsQuerySources/, selectTagsQuerySources)

/**
 * 获取标签数据
 */
const selectTags =
{
  'ErrorCode': 0,
  'Result': {
    'data': {
      'number': 1,
      'last': false,
      'numberOfElements': 6,
      'size': 6,
      'totalPages': 3,
      'content': [{
        'tagCode': '4ae75590e4d742f396d70ce6ea14c437',
        'portraitTotals': 0,
        'crtTime': 1568945941000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'tagName': '集团_william_test_06_19.09.20-19.11.23',
        'expDate': 1574438400000,
        'codeStatus': 'PAS0100',
        'tagDesc': '',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1568908800000,
        'isOpen': 1,
        'isInDate': 0,
        'tagCategoryId': 5,
        'tagType': 'statistical',
        'id': 305,
        'channelCode': '00',
        'shareStatus': 1
      }, {
        'tagCode': 'a5ce5dc3888943f18aa36a9dc4674a97',
        'portraitTotals': 0,
        'crtTime': 1568885062000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'tagName': '集团_新建tag2_19.09.26-19.11.04',
        'expDate': 1572796800000,
        'codeStatus': 'PAS0100',
        'tagDesc': '自动化测试专用',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1569427200000,
        'isOpen': 1,
        'isInDate': 0,
        'tagCategoryId': 5,
        'tagType': 'statistical',
        'id': 304,
        'channelCode': '00',
        'shareStatus': 1
      }, {
        'tagCode': '434deaaec8f7437c90f18643d89d1b07',
        'portraitTotals': 0,
        'crtTime': 1568881088000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'tagName': '集团_william_test_05_19.09.19-67.10.08',
        'expDate': 3085228800000,
        'codeStatus': 'PAS0100',
        'tagDesc': '',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1568822400000,
        'isOpen': 1,
        'isInDate': 0,
        'tagCategoryId': 5,
        'tagType': 'statistical',
        'id': 303,
        'channelCode': '00',
        'shareStatus': 1
      }, {
        'tagCode': '68878c75fe9b4f68bfa784e78550947e',
        'portraitTotals': 0,
        'crtTime': 1568875383000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'tagName': '集团_william_test_04_19.09.19-19.10.23',
        'expDate': 1571760000000,
        'codeStatus': 'PAS0100',
        'tagDesc': '',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1568822400000,
        'isOpen': 1,
        'isInDate': 0,
        'tagCategoryId': 5,
        'tagType': 'statistical',
        'id': 302,
        'channelCode': '00',
        'shareStatus': 1
      }, {
        'tagCode': '8e362e9a35fa4d52a1a3ff4b6e12cfb2',
        'portraitTotals': 0,
        'crtTime': 1568712920000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'tagName': '集团_william_test_03_19.09.19-19.10.17',
        'expDate': 1571241600000,
        'codeStatus': 'PAS0100',
        'tagDesc': 'a',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1568822400000,
        'isOpen': 1,
        'isInDate': 0,
        'tagCategoryId': 5,
        'tagType': 'statistical',
        'id': 293,
        'channelCode': '00',
        'shareStatus': 1
      }, {
        'tagCode': 'a98d044d5235466983a6a6f0c9154935',
        'portraitTotals': 0,
        'crtTime': 1568703542000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'tagName': '集团_william_test_02_19.09.19-19.10.23',
        'expDate': 1571760000000,
        'codeStatus': 'PAS0100',
        'tagDesc': 'test_02',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1568822400000,
        'isOpen': 1,
        'isInDate': 0,
        'tagCategoryId': 5,
        'tagType': 'statistical',
        'id': 292,
        'channelCode': '00',
        'shareStatus': 1
      }],
      'first': false,
      'totalElements': 18
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}
Mock.mock(/\/TagOpenService\/selectTags/, selectTags)

