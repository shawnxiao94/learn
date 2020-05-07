import Mock from 'mockjs'

// 获取获取日志列表
const getUserOperationLogByType = {
  ErrorCode: 0,
  Result: {
    data: {
      number: 0,
      last: false,
      numberOfElements: 10,
      size: 10,
      totalPages: 91,
      content: [
        {
          role: '普通用户',
          createTime: 1558083139000,
          companyName: '大通',
          succeed: 1,
          mobile: '15000286754',
          message: '共享统计型标签成功,标签名称:统计型-0516',
          userName: '孙振军',
          userId: '15000286754',
          content: '修改标签',
          email: '15000286754@163.com'
        },
        {
          role: '普通用户',
          createTime: 1558065278000,
          companyName: '大通',
          succeed: 1,
          mobile: '15000286754',
          message: '共享统计型标签成功,标签名称:统计型-0516',
          userName: '孙振军',
          userId: '15000286754',
          content: '修改标签',
          email: '15000286754@163.com'
        },
        {
          createTime: 1558004937000,
          companyName: '-',
          succeed: 1,
          mobile: '18721252175',
          message: '修改统计型标签成功,标签名称:William_test',
          userName: 'minghao',
          userId: '18721252175',
          content: '修改标签'
        },
        {
          createTime: 1558002607000,
          companyName: '-',
          succeed: 1,
          mobile: '18721252175',
          message: '新增统计型标签成功,标签名称:William_test',
          userName: 'minghao',
          userId: '18721252175',
          content: '新增标签'
        },
        {
          role: '普通用户',
          createTime: 1558002368000,
          companyName: '大通',
          succeed: 1,
          mobile: '15000286754',
          message: '修改统计型标签成功,标签名称:统计型-0516',
          userName: '孙振军',
          userId: '15000286754',
          content: '修改标签',
          email: '15000286754@163.com'
        },
        {
          role: '普通用户',
          createTime: 1558002363000,
          companyName: '大通',
          succeed: 1,
          mobile: '15000286754',
          message: '修改统计型标签成功,标签名称:统计型-0516',
          userName: '孙振军',
          userId: '15000286754',
          content: '修改标签',
          email: '15000286754@163.com'
        },
        {
          role: '普通用户',
          createTime: 1558002350000,
          companyName: '大通',
          succeed: 1,
          mobile: '15000286754',
          message: '修改统计型标签成功,标签名称:统计型-0516',
          userName: '孙振军',
          userId: '15000286754',
          content: '修改标签',
          email: '15000286754@163.com'
        },
        {
          role: '普通用户',
          createTime: 1558002134000,
          companyName: '大通',
          succeed: 1,
          mobile: '15000286754',
          message: '修改统计型标签成功,标签名称:统计型-0516',
          userName: '孙振军',
          userId: '15000286754',
          content: '修改标签',
          email: '15000286754@163.com'
        },
        {
          role: '普通用户',
          createTime: 1558002108000,
          companyName: '大通',
          succeed: 1,
          mobile: '15000286754',
          message: '修改统计型标签成功,标签名称:统计型-0516',
          userName: '孙振军',
          userId: '15000286754',
          content: '修改标签',
          email: '15000286754@163.com'
        },
        {
          role: '普通用户',
          createTime: 1558002094000,
          companyName: '大通',
          succeed: 1,
          mobile: '15000286754',
          message: '修改统计型标签成功,标签名称:统计型-0516',
          userName: '孙振军',
          userId: '15000286754',
          content: '修改标签',
          email: '15000286754@163.com'
        }
      ],
      first: true,
      totalElements: 903
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(
  /\/AuditLogOpenService\/getUserOperationLogByType/,
  getUserOperationLogByType
)
