/**
 * 工具包
 *
 * throttle 节流，debounce 防抖动，请调用 throttle-debounce 插件
 *
 */
import moment from 'moment'
import { matchPath } from 'react-router-dom'

/**
 * 格式化时间
 * @param {Date|String} date 格式化日期对象
 * @param {String} cFormat 格式化日期的格式YYYY-MM-DD
 * @return {String} 格式化后的日期
 */
export function parseDate(date, cFormat) {
  if (date) {
    return moment(date).format(cFormat)
  } else {
    return '-'
  }
}

/**
 * 获取URL指定参数
 * @param {String} name 参数名称
 * @param {String} url 目标URL地址
 * @return {String|null} 参数值
 */
export function getQueryString(name, url) {
  let _url = url || window.location.href
  if (_url.includes('?') && _url.includes(name)) {
    let arr = _url
      .split('?')
      .filter(x => x.includes(name))
      .join()
      .split('&')
    return arr
      .find(_ => {
        return _.includes(name)
      })
      .split('=')[1]
  } else {
    return null
  }
}
/**
 * 获取URL参数
 * @param {String} url 目标URL地址
 * @return {Object} 参数对象
 */
export function getQueryObject(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

/**
 * 非空判断
 * @param {String} value 目标值
 * @return {Boolean} 是否为空
 */
export function isEmpty(value) {
  return typeof value === 'undefined' || value === '' || value === null
}
window.isEmpty = isEmpty

/**
 * merge对象
 * @param {Object} source 源对象
 * @param {Object} target 要merge的对象
 * @return {Object} merge后的source
 */
export function objectMerge(source, target) {
  if (typeof source !== 'object') {
    source = {}
  }
  if (Array.isArray(target)) {
    return target.slice()
  }
  for (const property in target) {
    if (target.hasOwnProperty(property)) {
      const targetProperty = target[property]
      if (typeof targetProperty === 'object' && !moment.isMoment(targetProperty)) {
        source[property] = objectMerge(source[property], targetProperty)
        continue
      }
      source[property] = targetProperty
    }
  }
  return source
}

/**
 * 数据深拷
 * @param {Array|Object} 要拷贝的对象
 * @return {Array|Object} 返回拷贝的新对象
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object' && !moment.isMoment(source[keys])) {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}
window.deepClone = deepClone

/**
 * 添加事件
 * @param {Element} el 目标DOM
 * @param {String} type 事件类型
 * @param {Function} fn 事件方法
 * @param {Boolean} capture true为事件捕获/false为事件冒泡 IE678不支持事件捕获，不填默认事件冒泡
 */
export function addEvent(el, type, fn, capture) {
  if (window.addEventListener) {
    if (type === 'mousewheel' && document.mozHidden !== undefined) {
      type = 'DOMMouseScroll'
    }
    el.addEventListener(type, fn, !!capture)
  } else if (window.attachEvent) {
    el.attachEvent('on' + type, fn)
  }
}
/**
 * 移除事件
 * @param {Element} el 目标DOM
 * @param {String} type 事件类型
 * @param {Function} fn 事件方法
 * @param {Boolean} capture true为事件捕获/false为事件冒泡 IE678不支持事件捕获，不填默认事件冒泡
 */
export function removeEvent(el, type, fn, capture) {
  if (window.removeEventListener) {
    if (type === 'mousewheel' && document.mozHidden !== undefined) {
      type = 'DOMMouseScroll'
    }
    el.removeEventListener(type, fn, !!capture)
  } else if (window.detachEvent) {
    el.detachEvent('on' + type, fn)
  }
}

/**
 * 解决浮点型计算精度问题
 * @param {Number} f 计算表达式
 * @param {Number} digit 保留小数点几位
 * @param {Boolean} isNotRound false为四舍五路
 * @return {Number} 计算后的表达式结果
 */
export function formatFloat(f, digit = 2, isNotRound) {
  if (arguments.length === 2 && typeof arguments[1] === 'boolean') {
    isNotRound = arguments[1]
    digit = 2
  }
  if (isNaN(Number(f))) {
    throw new Error('parameters cannot be non-numeric for formatFloat method')
  } else {
    if (typeof f === 'string') {
      f = Number(f)
    }
  }
  f = f.toFixed(10)
  let m = Math.pow(10, digit)
  if (isNotRound) {
    return parseInt(f * m, 10) / m
  }
  let _abs = 1
  if (f < 0) {
    f = Math.abs(f)
    _abs = -1
  }
  return (Math.round(f * m, 10) / m) * _abs
}

/**
 * 深冻结
 * @param {Object} o 要冻结的对象
 * @return {Object} 冻结后的源对象
 */
export function deepFreeze(o) {
  var prop, propKey
  Object.freeze(o)
  for (propKey in o) {
    prop = o[propKey]
    if (
      !o.hasOwnProperty(propKey) ||
        !(typeof prop === 'object') ||
        Object.isFrozen(prop)
    ) {
      continue
    }
    deepFreeze(prop)
  }
}

/**
 * 获取随机数
 * @param {String} str 随机数开头字母
 * @param {Number} n 随机数个数
 * @return {String} 生成的随机数
 */
export function getRandomNum(str = '', n = 12) {
  if (typeof n === 'string') {
    n = Number(n)
  }
  n += 2
  return str + String(Math.random()).slice(2, n)
}

/**
 * trigger 扩展dispatchEvent事件语法,兼容IE
 * @param {Element} element 目标DOM
 * @param {String} event 事件类型
 */
export function trigger(element, event) {
  if (document.createEventObject) {
    // IE浏览器支持fireEvent方法
    let evt = document.createEventObject()
    evt.dispatchEvent = true
    return element.fireEvent('on' + event, evt)
  } else {
    // 其他标准浏览器使用dispatchEvent方法
    let evt = document.createEvent('HTMLEvents')
    evt.initEvent(event, true, true)
    evt.dispatchEvent = true
    return !element.dispatchEvent(evt)
  }
};

/**
 * 转换金额
 * @param  {String||Number} val 入参为需要转换的金额
 * @return {String} _amount 如果val为空则返回"-",否则返回转换之后的金额
 */
export function amount(val) {
  val = Number(val)
  if (isNaN(val)) {
    return '-'
  }
  let _amount
  if (val >= 10000 && val < 100000000) {
    _amount = formatFloat(val / 10000) + ' 万元'
  } else if (val >= 100000000) {
    _amount = formatFloat(val / 100000000) + ' 亿元'
  } else {
    _amount = formatFloat(val) + '元'
  }
  return _amount
}

/**
 * 转换数字
 * @param {Number|String} val 目标数据
 * @param {Number} digit 保留小数
 * @param {Boolean} isNotRound 是否四舍五入
 * @param {Array} [individual tenThousand, Billion] 分别对应转换单位中文描述，默认“万”/“亿”
 * @param {Boolean} retrunArray 如果为true，则返回一个数组，分别为值和单位
 */
export function conversionUnit({
  val,
  digit = 2,
  isNotRound = false,
  unit = ['', ' 万', ' 亿'],
  retrunArray = false
}) {
  let _n
  val = Number(val)
  if (!retrunArray) {
    if (val >= 10000 && val < 100000000) {
      _n = formatFloat(val / 10000, digit, isNotRound) + unit[1]
    } else if (val >= 100000000) {
      _n = formatFloat(val / 100000000, digit, isNotRound) + unit[2]
    } else {
      _n = formatFloat(val, digit, isNotRound) + unit[0]
    }
    return _n
  } else {
    if (val >= 10000 && val < 100000000) {
      return [formatFloat(val / 10000, digit, isNotRound), unit[1]]
    } else if (val >= 100000000) {
      return [formatFloat(val / 100000000, digit, isNotRound), unit[2]]
    } else {
      return [formatFloat(val, digit, isNotRound), unit[0]]
    }
  }
}

/**
 * 格式化children
 * @param {Array} data 格式化数据
 * @param {String} clearEmptyChildren string为child的key命名 去除空数组的children对象
 */
export function formatChildren({ data, clearEmptyChildren }) {
  if (clearEmptyChildren) {
    data = data.map(item => {
      if (item[clearEmptyChildren]) {
        if (item[clearEmptyChildren].length < 1) {
          delete item[clearEmptyChildren]
        } else {
          item[clearEmptyChildren] = formatChildren({ data: item[clearEmptyChildren], clearEmptyChildren })
        }
      }
      return item
    })
  }
  return data
}

/**
 * 格式化ant design Form组件输出的Fields格式，将value上提
 * @param {Array} params 格式化数据
 */
export function formatAntDesignFormFieldsData(params) {
  let _p = {}
  Object.keys(params).forEach(key => {
    if (params[key] && typeof params[key] === 'object') {
      _p[key] = params[key].value
    } else {
      _p[key] = params[key]
    }
  })
  return _p
}

/**
 * 取react router dom中的params方法
 * 解决不同来源取不到match中的params值的办法
 */
window.getRouterParams = (pathname, routerName) => {
  pathname = /\?/.test(pathname) ? pathname.match(/(.*)(?=\?)/)[0] : pathname
  return matchPath(pathname, { path: routerName })
}

/**
 * trigger事件
 */
window.trigger = function(element, event) {
  if (document.createEventObject) {
    // IE浏览器支持fireEvent方法
    let evt = document.createEventObject()
    evt.dispatchEvent = true
    return element.fireEvent('on' + event, evt)
  } else {
    // 其他标准浏览器使用dispatchEvent方法
    let evt = document.createEvent('HTMLEvents')
    evt.initEvent(event, true, true)
    evt.dispatchEvent = true
    return !element.dispatchEvent(evt)
  }
}