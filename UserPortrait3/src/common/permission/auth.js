const TokenKey = 'Admin-Token'
const err = 'Error:保存到本地存储失败!'
const errlimt = 'Error:本地存储超过限制!'

/**
 * 获取指定key本地存储的值
 * @param  {String} key key值
 * @return 如果key不存在返回null，存在则返回对应value
 */
export function getToken(key) {
  if (window.localStorage.getItem(key || TokenKey)) {
    let dataObj = JSON.parse(window.localStorage.getItem(key || TokenKey))
    // 如果当前时间 - 存储元素在创建时设置得时间 大于过期时间
    let isTimed = new Date().getTime() - dataObj.time > dataObj.exprise
    if (isTimed) {
      // 存储已经过期
      window.localStorage.removeItem(key || TokenKey)
      return null
    } else {
      return dataObj.value
    }
  } else {
    return null
  }
}

/**
 * 将value存储到key字段
 * @param  {String} key key值
 * @param  {String} value value值
 * @param  {Number} exprise 过期时间
 * @param  {String} type AccessToken类型
 * @return 如果key不存在返回null，存在则返回对应value
 */
export function setToken(key, value, exprise, type) {
  // 过期时间默认7天(毫秒)，获取当前时间，转换成JSON字符串序列
  let valueDate = JSON.stringify({
    value: value,
    time: new Date().getTime(),
    exprise: exprise || 60 * 60 * 24 * 7 * 1000,
    type: type || ''
  })
  try {
    window.localStorage.setItem(key || TokenKey, valueDate)
  } catch (e) {
    if (isQuotaExceeded(e)) {
      window.localStorage.clear()
      throw errlimt
    } else {
      throw err
    }
  }
}

/**
 * 删除key对应的数据
 * @param  {String} key
 */
export function removeToken(key) {
  try {
    window.localStorage.removeItem(key || TokenKey)
  } catch (e) {
    throw err
  }
}

/**
 * 注销登出
 */
export function loginOut() {
  // 注销登出
  let token = getToken()
  removeToken()
  let href = encodeURIComponent(
    window.location.origin + window.location.pathname
  )
  window.location.href =
    process.env.LOGOUT_HOST +
    '/logout?service=' +
    href +
    '&accessToken=' +
    token
}

/**
 * 跳转登录认证
 */
export function loginCas() {
  // 跳转登录认证
  let hash = window.location.hash.includes('?')
    ? window.location.hash
      .split('?')
      .filter(x => x.includes('#'))
      .join()
    : window.location.hash
  let targetUrl = hash.replace('#', 'targetUrl')
  let href = encodeURIComponent(
    window.location.origin + window.location.pathname + targetUrl
  )
  window.location.href =
    process.env.LOGIN_HOST +
    '/oauth2.0/authorize?response_type=token&client_id=100001&redirect_uri=' +
    href
}

function isQuotaExceeded(e) {
  let flag = false
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          flag = true
          break
        // fireFox
        case 1014:
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            flag = true
          }
          break
      }
    } else if (e.number === -2147024882) {
      // ie
      flag = true
    }
  }
  return flag
}
