import Mock from 'mockjs'

const permission = {
  Code: 0,
  Result: {
    status: 'scusess',
    data: [
      {
        routerPermissions: ['Home', 'News', 'NewsDetail'],
        btnPermissions: []
      }
    ],
    message: 'ok'
  }
}

Mock.mock(/\/permission/, permission)
