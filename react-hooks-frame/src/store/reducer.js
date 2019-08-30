import { combineReducers } from 'redux-immutable'
import { reducer as permissionReducer } from './Permission'
import { reducer as loginReducer } from '@pages/Login/store'
// combineReducers 合并仓库reducer
const reducer = combineReducers({
  permission: permissionReducer,
  login: loginReducer
})

export default reducer
