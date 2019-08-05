import { CHANAGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes.js'
import store from './index.js';
import * as api from '@/api/todoList/index.js'

export const getInputChangeAction = (value) => ({
  type: CHANAGE_INPUT_VALUE,
  value
}) 

export const getAddTodoAction = () => ({
  type: ADD_TODO_ITEM
}) 

export const getDeleteTotoAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
}) 

export const initListAction = data => ({
  type: INIT_LIST_ACTION,
  data
})

// 使用redux-thunk中间件后可以返回函数了，不仅仅是返回对象
export const getTodoList = () => {
  return () => {
    api.getTodolist().then(res => {
      debugger
      const data = res.data;
      const action = initListAction(data);
      store.dispatch(action);
    })
  }
}