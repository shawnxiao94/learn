import Mock from 'mockjs'
// 登录
const loginReg = {
  ErrorCode: 0,
  Result: {
    data: {
      content: [
        {
          name: 'Admin-Token',
          access_token: 'AT-1-Z8zpbiHQfLzAc5WON-QkiyUA6qYeRDLo',
          expires_in: 172800000,
          token_type: 'bearer'
        }
      ]
    },
    errCode: 0,
    errMsg: 'ok'
  }
}
Mock.mock(/\/reg\/login/, loginReg)
