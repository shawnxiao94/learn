/**
 * 格式化参数
 */

import moment from 'moment'

/**
 * 格式化画像编辑出参
 */
export function formatGroupManageResponse(data) {
  let form = {
    beginEndDate: {
      value: [moment(data.effDate), moment(data.expDate)]
    },
    desc: {
      value: data.desc
    },
    effDate: {
      value: data.effDate
    },
    expDate: {
      value: data.expDate
    },
    historyId: {
      value: data.historyId
    },
    name: {
      value: data.name
    },
    parentId: {
      value: data.parentId
    },
    selectLabel: {
      value: data.selectLabel
    },
    tagIds: {
      value: data.tagIds
    }
  }
  return {
    form: form,
    data: data
  }
}