import * as constants from './constants';
import * as api from '@data/api/Permission'
import { getStorage } from '@common/utils/auth'

const setPermission = (permission) => ({
	type: constants.SET_PERMISSION,
	permission: permission
})


export const getPermissionFn = (token) => {
  return dispatch => {
    api.getPermission({'token': token || getStorage()}).then(res => {
      if(res) {
        dispatch(setPermission(res[0]))
        console.log('获取权限成功')
      } else {
        alert('获取权限失败')
      }      
    })
  }
}