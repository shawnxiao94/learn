import { getQueryString } from '@/common/utils'
import Permission from '@/data/store/Permission'
import Root from '@/data/store/Root'
import { checkTokenAccout } from '@/data/api/Permission'
import { getToken, setToken, loginCas, loginOut } from '@/common/permission/auth'
import { Modal } from 'antd'
/**
 * 检索用户是否登陆，登入了则继续，未登陆拦截跳转至登录页面
 * @param {Object} props 父级传参
 */
const checkLogined = props => {
  // if (props.location.pathname !== '/login') {
  // 检索URL是否有token，如果有的话判断Cookies里是否有，没有的话装载URL上的token到Cookies里
  checkURLHasTokenForStore(props)
  if (!getToken()) {
    // 如果URL及Cookies里都没有token则跳转登录页面
    loginCas()
  } else {
    /**
     * 如果没有登录
     */
    if (!Permission.allKeys.routeKeys) {
      /**
       * 校验用户token
       */
      checkTokenAccout().then(res => {
        /**
         * 获取权限
         */
        Permission.getAllkeys().then(res => {
          /**
           * 获取用户
           */
          Root.getCasUserName().then(res => {
            Permission.setLoading(false)
          }).catch(res => {
            failure(res)
          })
        }).catch(res => {
          failure(res)
        })
      }).catch(res => {
        failure(res)
      })
    }
  }
}

/**
 * 页面初始化失败
 */
function failure(res) {
  Permission.setLoading(false, 'notReady')
  /**
   * 防止重复提示
   */
  if (window.isLoginout) return false
  window.isLoginout = true
  Modal.error({
    title: '提示',
    content: '用户信息校验失败，请重新登录',
    okText: '确定',
    keyboard: false,
    onOk() {
      loginOut()
    }
  })
}

/**
 * 检索URL是否有token，如果有的话判断Cookies里是否有，没有的话装载URL上的token到Cookies里
 * @param {Object} props 父级传参
 */
const checkURLHasTokenForStore = props => {
  if (getQueryString('access_token')) {
    setToken(
      null,
      getQueryString('access_token'),
      getQueryString('expires_in') * 1000,
      getQueryString('token_type')
    )
  }
}

/**
 * 权限系统
 * @param {Object} props 父级传参
 */
const permission = props => {
  // 检索用户是否登陆，登入了则继续，未登陆拦截跳转至登录页面
  checkLogined(props)
}

export default permission