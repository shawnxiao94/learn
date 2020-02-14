import moment from 'moment'
// 获取标签数据
export const selectTags = {
  request(params = {}) {
    params = {
      tagSelectReq: {
        pageSize: params.pageSize || 6,
        pageNumber: params.pageNumber || 1,
        tagTypes: params.tagTypes || [],
        querychannelCodes: params.querychannelCodes || [],
        tagName: params.tagName || '',
        tagCategoryId: params.tagCategoryId || '',
        startTime: (params.date && params.date[0] && moment(params.date[0]).format('YYYY-MM-DD')) || '',
        endTime: (params.date && params.date[1] && moment(params.date[1]).format('YYYY-MM-DD')) || ''
      }
    }
    return params
  },
  response(data) {
    return data.Result.data
  }
}

// 选择标签 - 所属公司部门 - 下拉框数据
export const selectTagsQuerySources = {
  request(params) {
    return params
  },
  response(data) {
    return data.Result.data
  }
}

// 选择标签 - 标签分类 - 下拉框数据
export const queryCategory = {
  request(params) {
    return params
  },
  response(data) {
    return data.Result.data
  }
}