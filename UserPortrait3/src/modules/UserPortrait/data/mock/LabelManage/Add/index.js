/**
 * 标签管理
 */
import Mock from 'mockjs'
/**
 * 获取标签类别
 */
const queryCategory =
{
  'ErrorCode': 0,
  'Result': {
    'data': {
      'categroys': [{
        'categoryType': 'null',
        'edit': false,
        'crtTime': 1564737953000,
        'categoryCode': 'null',
        'id': 5,
        'crtUser': '用户画像管理员',
        'categoryName': '基础类型',
        'categoryDesc': '基础'
      }],
      'channelName': '集团'
    },
    'errCode': 0,
    'errMsg': 'ok'
  }
}

Mock.mock(/\/TagCategoryOpenService\/queryCategory/, queryCategory)
