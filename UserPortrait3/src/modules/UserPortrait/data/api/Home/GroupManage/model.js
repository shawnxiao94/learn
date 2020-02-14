import { formatChildren } from '@/common/utils'
/**
 * 用户群列表
 */
export const getGroupList = {
  request(params) {
    switch (params.sortOrder) {
      case 'ascend':
        params.sortOrder = 'asc'
        break
      case 'descend':
        params.sortOrder = 'desc'
        break
      default :
        params.sortOrder = ''
    }
    
    const _o = {
      userShareGroupPage: {
        channelCodes: params.channelCodes || [],
        name: params.name || '',
        pageNumber: params.current || 1,
        pageSize: params.pageSize || 10,
        sortName: params.sortField || '',
        sortType: params.sortOrder || '',
        statuss: params.statuss || []
      }
    }
    return _o
  },
  response(data) {
    if (data.Result.data.content) {
      data.Result.data.content = formatChildren({ data: data.Result.data.content, clearEmptyChildren: 'children' })
    }
    return data.Result.data
  }
}
