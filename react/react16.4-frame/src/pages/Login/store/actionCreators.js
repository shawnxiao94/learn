import * as constants from './constants';
import * as api from '@data/api/Login'

const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	status: true
})

export const logout = () => ({
	type: constants.LOGOUT,
	status: false
})

export const handelLogin = (accout, password) => {
  return dispatch => {
    api.checkLogin({accout, password}).then(res => {
      if(res[0] === accout && res[1] === password) {
        dispatch(changeLogin())
        console.log('登录成功')
      } else {
        alert('登录失败,admin/123')
      }      
    })
  }
}