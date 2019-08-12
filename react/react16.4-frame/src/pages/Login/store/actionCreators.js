import * as constants from './constants';
import * as api from '@data/api/Login'
import { setStorage } from '@common/utils/auth'

const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	status: true
})
const setPermission = (permission) => ({
	type: constants.SET_PERMISSION,
	permission: permission
})

export const logout = () => ({
	type: constants.LOGOUT,
	status: false
})

export const handelLogin = (accout, password) => {
  return dispatch => {
    api.checkLogin({accout, password}).then(res => {
      if(res[1].account === accout && res[1].password === password) {
        dispatch(changeLogin())
        dispatch(setPermission(res[2]))
        setStorage('Admin-Token',res[0].TokenKey)
        console.log('登录成功')
      } else {
        alert('登录失败,admin/123')
      }      
    })
  }
}