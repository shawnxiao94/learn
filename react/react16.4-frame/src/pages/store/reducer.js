import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  // 权限路由数组
  routerPermissions: [],
  // 权限菜单数组
  menuPermissions: [],
  // 权限按钮数组
  btnPermissions: []
});

const setPermissionData = (state, action) => {
  return state.merge({
    'routerPermissions': fromJS(action.permission.routerPermissions || []),
    'menuPermissions': fromJS(action.permission.menuPermissions || [])
  })
}

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.SET_PERMISSION:
			return setPermissionData(state, action)
		default:
			return state;
	}
}