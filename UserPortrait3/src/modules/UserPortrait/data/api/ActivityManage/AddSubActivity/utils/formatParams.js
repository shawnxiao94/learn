/**
 * 格式化参数
 */

import moment from 'moment'

/**
 * 格式化子活动编辑出参
 */
export function formatSubActivityManageResponse(data) {
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
    childUserGroupIds: {
      value: data.childUserGroupIds || [],
      oldValue: data.childUserGroupIds || []
    },
    lableBeginEndDate: {
      value: (data.markStartTime && data.markEndTime)
        ? [moment(data.markStartTime), moment(data.markEndTime)] : [],
      oldValue: (data.markStartTime && data.markEndTime)
        ? [moment(data.markStartTime), moment(data.markEndTime)] : []
    },
    remark: {
      value: data.remark
    },
    parentId: {
      value: data.parentId
    }
  }
  return {
    form: form,
    data: data
  }
}