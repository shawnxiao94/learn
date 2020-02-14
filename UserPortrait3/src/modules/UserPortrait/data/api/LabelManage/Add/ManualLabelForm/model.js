/**
 * 格式化ant design Form组件输出的Fields格式，将value上提
 */
import { formatAntDesignFormFieldsData } from '@/common/utils'
import moment from 'moment'

/**
 * 新增手工型标签
 */
export const addManualLabelModel = {
  request(data) {
    // 格式化
    let params = formatAntDesignFormFieldsData(data)
    let _a = {
      tagAndRuleReq: {
        batchNo: params.batchNo,
        fileName: params.fileName,
        type: params.accountType,
        tagDto: {
          channelCode: params.channelCode,
          tagType: params.tagType,
          tagCategoryId: params.tagCategoryId,
          tagDesc: params.tagDesc,
          effDate: moment(params.lableBeginEndDate[0]).format('YYYY-MM-DD'),
          expDate: moment(params.lableBeginEndDate[1]).format('YYYY-MM-DD'),
          tagName: params.tagName,
          userName: params.userName,
          codeStatus: params.codeStatus
        }
      }
    }
    return _a
  },
  response(data) {
    return data.Result.data
  }
}

export const updateTagDetailModel = {
  request(data) {
    // 格式化
    let params = formatAntDesignFormFieldsData(data)
    let _a = {
      'tagAndRuleReq': {
        'tagDto': {
          id: params.id,
          channelCode: params.channelCode,
          tagType: params.tagType,
          tagCategoryId: params.tagCategoryId,
          tagDesc: params.tagDesc,
          effDate: moment(params.lableBeginEndDate[0]).format('YYYY-MM-DD'),
          expDate: moment(params.lableBeginEndDate[1]).format('YYYY-MM-DD'),
          tagName: params.tagName,
          userName: params.userName,
          codeStatus: params.codeStatus
        }
      }
    }
    return _a
  },
  response(data) {
    return data
  }
}