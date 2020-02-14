/**
 * 数据汇总
 */
export const getPortraitList = {
  request(params) {
    let result = {
      portraitPageParam: {
        portraitName: params.portraitName,
        channelCodes: params.channelCodes,
        statuss: params.statuss,
        sortName: params.sortField ? params.sortField : '',
        sortType: params.sortOrder ? params.sortOrder.split('end').join('') : '',
        pageNumber: params.pageNumber,
        pageSize: params.pageSize
      }
    }
    return result
  },
  response(data) {
    return data.Result.data
  }
}
/**
 * 查询用户数
 */
export const findPortraitUsers = {
  request(params) {
    let _portraitIds = []
    params.content.map(item => {
      _portraitIds.push(item.id)
    })
    return { portraitIds: _portraitIds }
  },
  response(data) {
    return data.Result.data
  }
}