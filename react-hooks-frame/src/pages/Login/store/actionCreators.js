import * as constants from './constants'
import * as api from '@data/api/Login'
import { setStorage } from '@common/utils/auth'
import { actionCreators } from '@/store/Permission'

export const changeLogin = (status) => ({
  type: constants.CHANGE_LOGIN,
  status: status
})
export const logout = () => ({
  type: constants.LOGOUT,
  status: false
})

export const handelLogin = (accout, password, history) => {
  return dispatch => {
    api.checkLogin({ accout, password }).then(res => {
      if (res[1].account === accout && res[1].password === password) {
        dispatch(changeLogin(true))
        setStorage('Admin-Token', res[0].TokenKey)
        //  获取权限
        dispatch(actionCreators.getPermissionFn(res[0].TokenKey))
        history.push('/')
      } else {
        alert('登录失败,admin/123')
      }
    })
  }
}
