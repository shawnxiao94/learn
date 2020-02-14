/*
 * @Author: your name
 * @Date: 2020-01-19 17:47:38
 * @LastEditTime : 2020-01-19 17:49:22
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack4-react16.8-multiple-cms\src\data\store\Login\actionCreators.js
 */
// import * as api from "@data/api/Login"
// import { setStorage } from "@common/utils/auth"
import * as constants from "./constants"
// import { actionCreators } from "@/store/Permission"

export const changeLogin = (status) => ({
  type: constants.CHANGE_LOGIN,
  status,
})
export const logout = () => ({
  type: constants.LOGOUT,
  status: false,
})

export const handelLogin = (accout, password) => dispatch => {
  // api.checkLogin({ accout, password }).then(res => {
  //   if (res[1].account === accout && res[1].password === password) {
  //     dispatch(changeLogin(true))
  //     setStorage("Admin-Token", res[0].TokenKey)
  //     //  获取权限
  //     dispatch(actionCreators.getPermissionFn(res[0].TokenKey))
  //     history.push("/")
  //   } else {
  //     alert("登录失败,admin/123")
  //   }
  // })
}
