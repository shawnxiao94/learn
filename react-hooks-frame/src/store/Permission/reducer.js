import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  // 权限路由数组
  routerPermissions: [],
  // 权限菜单数组
  menuList: [
    {
      path: '/',
      title: '首页'
    },
    {
      path: '/app/news',
      title: '新闻列表 ',
      children: [
        {
          path: '/app/detail',
          title: '新闻详情 '
        }
      ]
    }
  ],
  // 权限按钮数组
  btnPermissions: []
})
const setPermissionData = (state, action) => {
  return state.merge({
    routerPermissions: fromJS(action.permission.routerPermissions || [])
    // 'menuList': fromJS(action.permission.routerPermissions || [])
  })
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_PERMISSION:
      return setPermissionData(state, action)
    default:
      return state
  }
}
