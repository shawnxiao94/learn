import { CHANGE_INPUT_VALUE, ADD_ITEM } from './actionTypes'

export const getInputchangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})

export const getAddItemAction = () => ({
  type: ADD_ITEM
})