import Mock from 'mockjs'

const login = {
  Code: 0,
  Result: {
    status: 'scusess',
    data: [
      { TokenKey: 'dkergk55' },
      { account: 'admin', password: '123' }
    ],
    message: 'ok'
  }
}

Mock.mock(/\/login/, login)
