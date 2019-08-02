import { CHANAGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes.js'
const defaultState = {
  inputValue: '123',
  list: [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ]
}

// reducer可以接收state,但是不能修改state,单向数据流
export default (state = defaultState, action) => {
  if(action.type === CHANAGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState
  }
  if(action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    if(newState.inputValue) {
      newState.list.push(newState.inputValue)
      newState.inputValue = ''
      return newState
    }
  }
  if(action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1)
    return newState
  }
  return state
}