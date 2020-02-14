/**
 * 格式化参数
 */

import moment from 'moment'

/**
 * 格式化画像编辑出参
 */
export function formatPortraitManageResponse(data) {
  let form = {
    // id
    id: {
      value: data.portraitId
    },
    // 画像ID
    portraitId: {
      value: data.portraitId
    },
    // 画像名称
    portraitName: {
      value: data.portraitName
    },
    // 画像说明
    description: {
      value: data.description || ''
    },
    // 起止日期
    lableBeginEndDate: {
      value: [moment(data.effDate), moment(data.expDate)],
      oldValue: [moment(data.effDate), moment(data.expDate)]
    },
    // 选择标签集合
    selectLabel: {
      value: data.tags
    },
    status: {
      value: data.status
    }
  }
  return {
    form: form,
    data: data
  }
}