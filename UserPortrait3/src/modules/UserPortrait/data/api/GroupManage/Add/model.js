/**
 * 格式化ant design Form组件输出的Fields格式，将value上提
 */
import { formatAntDesignFormFieldsData } from '@/common/utils'
import moment from 'moment'
/**
 * 新增子用户群-获取选择标签
 */
export const getSelectedTagModel = {
  request(params) {
    // 格式化
    let _params = {
      biAnalysisHistoryReq: {
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        userGroupId: params.userGroupId,
        historyId: params.historyId
      }
    }
    return _params
  },
  response(data) {
    return data
  }
}

/**
 * 新增子用户群
 */
export const addSubGroupModel = {
  request(data) {
    let params = formatAntDesignFormFieldsData(data)
    let tagIds = params.selectLabel.map(item => {
      return item.id
    })
    let _params = {
      userShareGroupReq: {
        beginEndDate: [moment(params.beginEndDate[0]).format('YYYY-MM-DD'), moment(params.beginEndDate[1]).format('YYYY-MM-DD')],
        desc: params.desc,
        effDate: moment(params.beginEndDate[0]).format('YYYY-MM-DD'),
        expDate: moment(params.beginEndDate[1]).format('YYYY-MM-DD'),
        historyId: params.historyId,
        name: params.name,
        parentId: params.parentId,
        selectLabel: params.selectLabel,
        tagIds: tagIds || []
      }
    }
    return _params
  },
  response(data) {
    return data
  }
}