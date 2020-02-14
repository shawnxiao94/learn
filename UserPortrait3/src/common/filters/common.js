import * as utils from '@/common/utils'

/**
 * 获取时间
 * @param  {Number} time 时间戳
 * @return {String} 根据between的值返回不同时间
 */
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
 * filter时间
 * @param  {Number} time 时间戳
 * @param  {String} cFormat 时间格式
 * @return {String} 根据between的值返回不同时间
 */
export function parseDate(time, cFormat) {
  return ~~time ? utils.parseDate(time, cFormat) : time || '-'
}

/**
 * 格式化时间
 * @param  {Number} time 时间戳
 * @param  {String} cFormat 时间格式
 */
export function formatTime(time, cFormat) {
  time = +time * 1000
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
  if (cFormat) {
    return parseDate(time, cFormat)
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

/**
 * 过滤HTML
 * @param {String} val html片段
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * 过滤空
 * @param  {undefined||null||String||Number} val 入参
 * @param  {undefined} str
 * @return {String||Number} 入参如果为undefined||null||""则返回"-",否则返回val
 */
export function empty(val, str) {
  if (utils.isEmpty(val)) {
    return str || '-'
  } else {
    return val
  }
}

/**
 * 转换金额
 * @param  {String||Number} val 入参为需要转换的金额
 * @return {String} _amount 如果val为空则返回"-",否则返回转换之后的金额
 */
export function amount() {
  utils.amount(arguments)
}

/**
 * 转换数字
 * @param {Number|String} val 目标数据
 * @param {Number} digit 保留小数
 * @param {Boolean} isNotRound 是否四舍五入
 * @param {Array} [individual, tenThousand, Billion] 分别对应转换单位中文描述，默认“万”/“亿”
 */
export function conversionUnit() {
  utils.conversionUnit(arguments)
}
