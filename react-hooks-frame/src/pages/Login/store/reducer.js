import { fromJS } from 'immutable'
import * as constants from './constants'
import { getStorage } from '@common/utils/auth.js'

const defaultState = fromJS({
  // 登录状态
  loginStatus: !!getStorage()
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_LOGIN:
      return state.set('loginStatus', action.status)
    case constants.LOGOUT:
      return state.set('loginStatus', action.status)
    default:
      return state
  }
}
