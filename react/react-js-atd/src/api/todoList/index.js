import api from 'appSrc/common/api';
import * as model from './model'

export function getTodolist(params) {
  return api({
    url: process.env.API_HOST + '/todolist',
    method: 'post',
    model: model.todoList,
    params
  })
}