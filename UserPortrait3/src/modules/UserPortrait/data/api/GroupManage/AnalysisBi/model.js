/**
 * BI分析 - 查询共享给当前渠道的标签信息
 */
import moment from 'moment'
export const findTagsByPage = {
  request(params = {}) {
    params = {
      biAnalysisHistoryReq: {
        userGroupId: params.userGroupId,
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

/**
 * BI分析 - 查询BI分析结果
 */
export const findBiAnalysisGraphicalByTag = {
  request(params = {}) {
    params = {
      biAnalysisUserGroupReq: {
        ...params
      }
    }
    return params
  },
  response(data) {
    return data.Result.data
  }
}

/**
 * BI分析 - 保存分析历史记录
 */
export const saveBiAnalysisHistory = {
  request(params = {}) {
    params = {
      biAnalysisUserGroupReq: {
        ...params
      }
    }
    return params
  },
  response(data) {
    return data.Result.data
  }
}

/**
 * BI分析 - 回显历史分析记录数据
 */
export const queryHistoryDetail = {
  request(params = {}) {
    return {
      biAnalysisHistoryReq: {
        historyId: params.historyId
      }
    }
  },
  response(data) {
    return data.Result.data
  }
}
