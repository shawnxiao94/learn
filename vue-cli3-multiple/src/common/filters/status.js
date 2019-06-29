// 未生效、生效中、已生效
export function statusFilters(val) {
  if (Number(val) === 1) {
    return '生效中'
  } else if (Number(val) === 2) {
    return '未生效'
  } else if (Number(val) === 0) {
    return '已失效'
  }
}

export function statusFiltersBgColor(val) {
  if (Number(val) === 1) {
    return 'theme-d'
  } else if (Number(val) === 2) {
    return 'theme-c'
  } else if (Number(val) === 0) {
    return 'theme-e'
  }
}

// 标签类别
export function tagTypeFilter(val) {
  if (val === 'manual') {
    return '手工型'
  } else if (val === 'algorithm') {
    return '算法型'
  } else {
    return '统计型'
  }
}

// 营销渠道
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

// 渠道来源
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

// 活动管理未开始、进行中、已结束
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

export function marketStatusFiltersBgColor(val) {
  if (Number(val) === 1) {
    return 'theme-d'
  } else if (Number(val) === 2) {
    return 'theme-c'
  } else if (Number(val) === 0) {
    return 'theme-f'
  } else if (Number(val) === 3) {
    return 'theme-f'
  }
}
