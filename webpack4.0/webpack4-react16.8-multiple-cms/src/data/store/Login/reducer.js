/*
 * @Author: your name
 * @Date: 2020-01-19 17:46:29
 * @LastEditTime: 2020-01-19 17:50:57
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \webpack4-react16.8-multiple-cms\src\data\store\Login\reducer.js
 */
import { fromJS } from "immutable"
import { getStorage } from "@/common/utils/auth.js"
import * as constants from "./constants"

const defaultState = fromJS({
  // 登录状态
  loginStatus: !!getStorage(),
})

export default (state = defaultState, action) => {
  switch (action.type) {
  case constants.CHANGE_LOGIN:
    return state.set("loginStatus", action.status)
  case constants.LOGOUT:
    return state.set("loginStatus", action.status)
  default:
    return state
  }
}
