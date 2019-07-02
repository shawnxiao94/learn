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
