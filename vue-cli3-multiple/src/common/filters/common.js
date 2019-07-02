import { formatFloat } from '@/common/utils/index'

// 获取时间
export function timeAgo(time) {
  const between = (Date.now() - Number(time)) / 1000
  if (between < 3600) {
    return ~~(between / 60) + ' 分'
  } else if (between < 86400) {
    return ~~(between / 3600) + ' 小时'
  } else {
    return ~~(between / 86400) + ' 天'
  }
}

/**
 *  格式化时间 Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 用户体验式格式化时间 几秒前、几分钟前、几小时前，何年何月何日
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
// 过滤HTML
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

// 过滤空
export function empty(val, str) {
  if (typeof val === 'undefined' || val === 'null' || val === '') {
    return str || '-'
  } else {
    return val
  }
}

// 转换金额
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

// 转换数字
export function conversionUnit(
  val,
  [digit, isNotRound] = [2, false],
  [individual, tenThousand, Billion] = ['', ' 万', ' 亿']
) {
  let _n
  val = Number(val)
  if (val >= 10000 && val < 100000000) {
    _n = formatFloat(val / 10000, digit, isNotRound) + tenThousand
  } else if (val >= 100000000) {
    _n = formatFloat(val / 100000000, digit, isNotRound) + Billion
  } else {
    _n = formatFloat(val, digit, isNotRound) + individual
  }
  return _n
}
