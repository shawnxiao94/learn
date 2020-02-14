/*
 * @Author: your name
 * @Date: 2020-01-02 13:47:07
 * @LastEditTime : 2020-01-19 17:45:53
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack4-react16.8-multiple-cms\src\data\store\reducer.js
 */
import {
  combineReducers,
} from "redux-immutable"
import {
  reducer as loginReducer,
} from "./Login"
import {
  reducer as permissionReducer,
} from "./Permission"
// combineReducers 合并仓库reducer
const reducer = combineReducers({
  permission: permissionReducer,
  login: loginReducer,
})

export default reducer