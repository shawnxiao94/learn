import Mock from 'mockjs';

const login = {
  Code: 0,
  Result: {
    status: "scusess",
    data: ['admin', '123'],
    message: "ok"
  }
}

Mock.mock(/\/login/, login)