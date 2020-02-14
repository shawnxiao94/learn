/**
 * 状态码配置
 * 1：生效中、2：未生效、3：已失效
 */
export const STATUS = [
  {
    name: '生效中',
    color: statusColor(1),
    value: 1
  },
  {
    name: '未生效',
    color: statusColor(2),
    value: 2
  },
  {
    name: '已失效',
    color: statusColor(0),
    value: 0
  }
]
/**
 * 状态码 1：生效中、2：未生效、3：已失效
 * @param  {Number||String} val 状态码
 * @return {String}   返回code对应的value值
 */
export function statusFilters(val) {
  if (Number(val) === 1) {
    return '生效中'
  } else if (Number(val) === 2) {
    return '未生效'
  } else if (Number(val) === 0) {
    return '已失效'
  }
}

/**
 * 状态码 1：生效中、2：未生效、3：已失效
 * @param  {Number||String} val 状态码
 * @return {String}   返回code对应的颜色值
 */
export function statusColor(val) {
  if (Number(val) === 1) {
    return 'blue'
  } else if (Number(val) === 2) {
    return 'green'
  } else if (Number(val) === 0) {
    return 'red'
  } else {
    return 'gray'
  }
}

/**
 * 根据渠道CODE，返回对应的渠道SVG图标
 */
export function channelFiltersIcon(val) {
  switch (val) {
    case '01':
      return 'chexiangjia'
    case '02':
      return 'xiangdao'
    case '03':
      return 'huanqiuchexiang'
    case '04':
      return 'datong'
    case '05':
      return 'chengyongche'
    default:
      return 'saic'
  }
}

/**
 * 根据营销渠道code，展示对应的name值
 * @param  {String} val 标签类别code
 * @return {String}   返回不同的营销渠道code对应的name值
 */
export function marketChannelFilter(val) {
  switch (val) {
    case '10001':
      return 'App'
    case '10002':
      return 'Web'
    case '10003':
      return 'Phone'
    case '10004':
      return 'SMS'
    case '10005':
      return 'WeChat'
    case 'all':
      return '汇总'
    default:
      return '-'
  }
}

/**
 * 根据渠道来源code，展示对应的name值
 * @param  {String} val 标签类别code
 * @return {String}   返回不同的渠道来源code对应的name值
 */
export function channelFilters(val) {
  switch (val) {
    case '01':
      return '车享家'
    case '02':
      return '享道'
    case '03':
      return '环球车享'
    case '04':
      return '大通'
    case '05':
      return '乘用车'
  }
}

/**
 * 根据活动管理code，展示对应的状态值。0：进行中、1：未开始、2：已结束、3：满期、4：无用户群
 * @param  {Number||String} val 活动管理code
 * @return {String}   返回不同的活动管理code对应的状态name
 */
export function marketStatusFilters(val) {
  if (Number(val) === 1) {
    return '进行中'
  } else if (Number(val) === 2) {
    return '未开始'
  } else if (Number(val) === 0) {
    return '已结束'
  } else if (Number(val) === 3) {
    return '满期'
  } else if (Number(val) === 4) {
    return '无用户群'
  }
}

/**
 * 根据活动管理code，显示对应的className
 * @param  {Number||String} val 活动管理code
 * @return {String}   返回不同的活动管理code对应的className
 */
export function marketStatusFiltersBgColor(val) {
  if (Number(val) === 1) {
    return '#1B87ED'
  } else if (Number(val) === 2) {
    return '#1EBF8E'
  } else if (Number(val) === 0) {
    return '#B53022'
  } else if (Number(val) === 3) {
    return '#585858'
  } else {
    return ''
  }
}

/**
 * 根据标签类别code，展示对应的name值
 * @param  {String} val 标签类别code
 * @return {String}   返回不同的标签类别对应的name值
 */
export function tagTypeFilter(val) {
  if (val === 'manual') {
    return '手工型'
  } else if (val === 'algorithm') {
    return '算法型'
  } else {
    return '统计型'
  }
}

/**
 * 标签导入状态
 */
export function manualTagLogStatusFilter(val) {
  if (val === '0') {
    return '失败'
  } else if (val === '1') {
    return '成功'
  } else if (val === '2') {
    return '进行中'
  }
}

/**
 * 标签导入类型
 */
export function manualTagLogCategoryFilter(val) {
  if (val === '0') {
    return '失效'
  } else if (val === '1') {
    return '新增'
  } else if (val === '2') {
    return '添加'
  }
}