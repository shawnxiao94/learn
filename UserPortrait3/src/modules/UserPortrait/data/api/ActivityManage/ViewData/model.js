/**
 * 查询活动数据
 */
export const queryActivityChartById = {
  request(params) {
    params = {
      marketingReq: {
        ...params
      }
    }
    return params
  },
  response(data) {
    return data.Result.data
  }
}

// 根据子活动信息查找子群信息
export const queryUserShareGroupByChildActivityIdModel = {
  request(params) {
    return params
  },
  response(data) {
    return data
  }
}