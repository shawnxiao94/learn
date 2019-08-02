import { CHANAGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes.js'

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