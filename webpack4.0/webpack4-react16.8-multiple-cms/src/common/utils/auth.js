const TokenKey = "Admin-Token"
const err = "Error:保存到本地存储失败!"
const errlimt = "Error:本地存储超过限制!"

export function getStorage(key) {
  if (window.localStorage.getItem(key || TokenKey)) {
    const dataObj = JSON.parse(window.localStorage.getItem(key || TokenKey))
    // 如果当前时间 - 存储元素在创建时设置得时间 大于过期时间
    const isTimed = new Date().getTime() - dataObj.time > dataObj.exprise
    if (isTimed) {
      // 存储已经过期
      window.localStorage.removeItem(key || TokenKey)
      return null
    }
    return dataObj.value
  }
  return null
}

export function setStorage(key, value, exprise, type) {
  return new Promise(resolve => {
    // 过期时间默认7天(毫秒)，获取当前时间，转换成JSON字符串序列
    const valueDate = JSON.stringify({
      value,
      time: new Date().getTime(),
      exprise: exprise || 60 * 60 * 24 * 7 * 1000,
      type: type || "",
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
    resolve()
  })
}

export function removeStorage(key) {
  try {
    window.localStorage.removeItem(key || TokenKey)
  } catch (e) {
    throw err
  }
}

// 获取链接参数
export function getQueryString(name) {
  const { href } = window.location
  if (href.includes("?") && href.includes(name)) {
    const arr = href
      .split("?")
      .filter(x => x.includes(name))
      .join()
      .split("&")
    return arr
      .find(_ => _.includes(name))
      .split("=")[1]
  }
  return null
}

export function loginOutCas() {
  // 注销登出
  const token = getStorage()
  removeStorage()
  const href = encodeURIComponent(
    window.location.origin + window.location.pathname,
  )
  window.location.href = `${process.env.VUE_APP_BASE_API
  }/logout?service=${
    href
  }&accessToken=${
    token}`
}

export function loginCas() {
  // 跳转登录认证
  const hash = window.location.hash.includes("?")
    ? window.location.hash
      .split("?")
      .filter(x => x.includes("#"))
      .join()
    : window.location.hash
  const targetUrl = hash.replace("#", "targetUrl")
  const href = encodeURIComponent(
    window.location.origin + window.location.pathname + targetUrl,
  )
  window.location.href = `${process.env.VUE_APP_BASE_API
  }/oauth2.0/authorize?response_type=token&client_id=100001&redirect_uri=${
    href}`
}

function isQuotaExceeded(e) {
  let flag = false
  if (e) {
    if (e.code) {
      // eslint-disable-next-line default-case
      switch (e.code) {
      case 22:
        flag = true
        break
        // fireFox
      case 1014:
        if (e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
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
