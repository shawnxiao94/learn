import router from '../../router'
import store from '../../data/store'
import { Message, MessageBox } from 'element-ui'
// progress bar
import NProgress from 'nprogress'
// progress bar style
import 'nprogress/nprogress.css'
import {
  setStorage,
  getStorage,
  getQueryString,
  loginCas,
  loginOutCas
} from '@/common/utils/auth' // get token from cookie
import getPageTitle from '@/common/utils/getPageTitle'

import { checkTokenAccout } from '../../data/api/User'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  setStorage(
    'Admin-Token',
    'AT-1-Z8zpbiHQfLzAc5WON-QkiyUA6qYeRDLo',
    172800000,
    'bearer'
  )
  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasToken = getStorage()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      try {
        runRouter()
      } catch (error) {
        // 错误 重置token 跳转登录页
        // await store.dispatch('resetStorage')
        Message.error(error || 'Has Error')
        // next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    // has no token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (getQueryString('access_token')) {
        // url 里有传token时
        setStorage(
          null,
          getQueryString('access_token'),
          getQueryString('expires_in') * 1000,
          getQueryString('token_type')
        ).then(() => {
          runRouter()
        })
      } else {
        // 跳转登录认证
        loginCas()
        // next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  }
  function runRouter() {
    if (store.getters.permission.addRouters.length === 0) {
      checkTokenAccout({ sysId: store.getters.user.userInfo.sysId })
        .then(() => {
          store
            .dispatch('GenerateRoutes')
            .then(() => {
              // 依token获取用户信息
              store
                .dispatch('GetCasUserName')
                .then(() => {
                  // 没有任何页面权限的时候
                  if (store.getters.permission.addRouters.length < 1) {
                    NProgress.done()
                    MessageBox({
                      message: '您没有任何页面访问权限，请联系管理员配置权限！',
                      showCancelButton: false,
                      confirmButtonText: '确定',
                      callback() {
                        loginOutCas()
                      }
                    })
                  } else {
                    router.addRoutes(store.getters.permission.addRouters)
                    next({ ...to, replace: true })
                  }
                })
                .catch(() => {
                  NProgress.done()
                  MessageBox({
                    message: '获取用户信息失败！',
                    showCancelButton: false,
                    confirmButtonText: '确定',
                    callback() {}
                  })
                })
            })
            .catch(() => {
              NProgress.done()
              MessageBox({
                message: '获取菜单树失败！',
                showCancelButton: false,
                confirmButtonText: '确定',
                callback() {
                  loginOutCas()
                }
              })
            })
        })
        .catch(() => {
          NProgress.done()
          MessageBox({
            message: '账户检测失败！',
            showCancelButton: false,
            confirmButtonText: '确定',
            callback() {
              loginOutCas()
            }
          })
        })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
