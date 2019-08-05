import Mock from 'mockjs';

const todolist =  {
  'code': 0,
  'data': {
    'list|1-10':[{
      'id|+1': 1,
      'title': '@title',
      'status': 1,
      'userId|5': ''
    }]
  },
  'message': '@cparagraph',
  'systemDate': new Date.getTime()
}

Mock.mock(/\/todolist/, todolist);
