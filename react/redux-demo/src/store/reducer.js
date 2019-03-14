import { CHANGE_INPUT_VALUE, ADD_ITEM } from './actionTypes'

const defaultState = {
  list: [],
  inputValue: ''
}

export default (state = defaultState, action) => {
  if(action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if(action.type === ADD_ITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  // if(action.type === 'delete_item') {
  //   const newState = JSON.parse(JSON.stringify(state))
  //   debugger
  //   newState.list.splice(newState.index,1)
  //   return newState
  // }
  return state
}