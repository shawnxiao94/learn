/**
 * 格式化参数
 */

import moment from 'moment'

/**
 * 格式化主活动编辑出参
 */
export function formatActivityManageResponse(data) {
  let form = {
    activeInitiator: {
      value: data.activeInitiator
    },
    activeResponderList: {
      value: data.activeResponderList
    },
    markChannelList: {
      value: data.markChannelList
    },
    id: {
      value: data.id
    },
    markName: {
      value: data.markName
    },
    baseUserGroupIds: {
      value: data.baseUserGroupIds || [],
      oldValue: data.baseUserGroupIds || []
    },
    lableBeginEndDate: {
      value: (data.markStartTime && data.markEndTime)
        ? [moment(data.markStartTime), moment(data.markEndTime)] : [],
      oldValue: (data.markStartTime && data.markEndTime)
        ? [moment(data.markStartTime), moment(data.markEndTime)] : []
    },
    remark: {
      value: data.remark
    }
  }
  return {
    form: form,
    data: data
  }
}