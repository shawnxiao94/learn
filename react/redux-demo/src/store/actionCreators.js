import { CHANGE_INPUT_VALUE, ADD_ITEM, DELETE_ITEM, INIT_LIST_ACTION } from './actionTypes'
import axios from 'axios'

export const getInputchangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})

export const getAddItemAction = () => ({
  type: ADD_ITEM
})

export const getDeleteItemAction = (index) => ({
  type: DELETE_ITEM,
  index
})

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
})

// 引入redux-thunk|| redux-saga中间件后 action 返回的值可以是函数了，不仅仅只是对象
// 此时是可以接收到dispatch方法进行直接调用的
export const getTodoList = () => {
  return (dispatch) => {
    axios.get('/list.json').then((res) => {
      const data = res.data
      debugger;
      const action = initListAction(data)
      dispatch(action)
    })
  }
}