
/**
 * 用户群 数据仓库
 */
import Mock from 'mockjs'

/**
 * 画像详情
 */
const findByPortraitId =
{
  'ErrorCode': 0,
  'Result': {
    'data': {
      'portraitId': 492,
      'effDate': '2019-09-06',
      'userShareGroups': [],
      'portraitName': '测试',
      'channelName': '集团',
      'portraitUsers': 0,
      'expDate': '2019-09-20',
      'channelCode': '00',
      'status': '0',
      'tags': [{
        'tagCode': '2649f05ea8dc4fd0a54a0316694aba7d',
        'portraitTotals': 0,
        'crtTime': 1567044181000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'tagName': '乘用车_测试1_19.08.29-19.09.30',
        'expDate': 1569772800000,
        'codeStatus': 'PAS0100',
        'tagDesc': '',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1567008000000,
        'isOpen': 0,
        'isInDate': 0,
        'tagCategoryId': 5,
        'tagType': 'algorithm',
        'id': 272,
        'channelCode': '05',
        'shareStatus': 1
      }, {
        'tagCode': '03f04da1fe874abea76a31a8f8b7cc53',
        'portraitTotals': 0,
        'crtTime': 1567066565000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'tagName': '乘用车_测试_19.08.29-19.09.30',
        'expDate': 1569772800000,
        'codeStatus': 'PAS0100',
        'tagDesc': '',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1567008000000,
        'isOpen': 0,
        'isInDate': 0,
        'tagCategoryId': 5,
        'tagType': 'statistical',
        'id': 274,
        'channelCode': '05',
        'shareStatus': 0
      }, {
        'tagCode': '9035eb35536e40a4958de0d633bbae0f',
        'portraitTotals': 0,
        'crtTime': 1567390013000,
        'shareChannelTotals': 0,
        'ifIncludePortrait': 0,
        'tagName': '乘用车_乘用车测试_19.09.02-19.10.30',
        'expDate': 1572364800000,
        'codeStatus': 'PAS0100',
        'tagDesc': '',
        'ifEffectPortrait': 0,
        'clientTotals': 0,
        'effDate': 1567353600000,
        'isOpen': 1,
        'isInDate': 0,
        'tagCategoryId': 5,
        'tagType': 'statistical',
        'id': 279,
        'channelCode': '05',
        'shareStatus': 1
      }]
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}
Mock.mock(/\/PortraitOpenService\/findByPortraitId/, findByPortraitId)