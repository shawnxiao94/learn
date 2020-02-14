/**
 * 格式化参数
 */

import moment from 'moment'

/**
 * 格式化统计型编辑出参
 */
export function formatAlgorithmTagsResponse(data) {
  let form = {
    // id
    id: {
      value: data.tagDto.id
    },
    // 标签类别
    tagCategoryId: {
      value: data.tagDto.tagCategoryId
    },
    // 标签名称
    tagName: {
      value: data.tagDto.tagName
    },
    // 标签说明
    tagDesc: {
      value: data.tagDto.tagDesc
    },
    // 起止日期
    lableBeginEndDate: {
      value: [moment(data.tagDto.effDate), moment(data.tagDto.expDate)]
    },
    // 设置标签类型
    tagType: {
      value: data.tagDto.tagType
    },
    // 设置渠道
    channelCode: {
      value: data.tagDto.channelCode,
      label: data.tagDto.channelName
    },
    // 默认值
    codeStatus: {
      value: data.tagDto.codeStatus
    }
  }
  return {
    form: form,
    data: data
  }
}