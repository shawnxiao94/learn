/**
 * 格式化ant design Form组件输出的Fields格式，将value上提
 */
import { formatAntDesignFormFieldsData } from '@/common/utils'
import moment from 'moment'

/**
 * 获取用户群列表（子用户群）-数据
 */
export const queryChildUserGroupModel = {
  request(params) {
    return params
  },
  response(data) {
    return data.Result.data
  }
}

/**
 * 新增-子活动
 */
export const createChildActivityModel = {
  request(data) {
    let params = formatAntDesignFormFieldsData(data)
    let _params = {
      marketingActivitiesReq: {
        childUserGroupIds: params.childUserGroupIds,
        id: params.id,
        markChannelList: params.markChannelList,
        markName: params.markName,
        markStartTime: (params.lableBeginEndDate && params.lableBeginEndDate.length > 0)
          ? moment(params.lableBeginEndDate[0]).format('YYYY-MM-DD') : '',
        markEndTime: (params.lableBeginEndDate && params.lableBeginEndDate.length > 0)
          ? moment(params.lableBeginEndDate[1]).format('YYYY-MM-DD') : '',
        parentId: params.parentId,
        remark: params.remark
      }
    }
    return _params
  },
  response(data) {
    return data
  }
}

/**
 * 编辑-子活动
 */
export const updateChildActivityModel = {
  request(data) {
    let params = formatAntDesignFormFieldsData(data)
    let _params = {
      marketingActivitiesReq: {
        childUserGroupIds: params.childUserGroupIds,
        id: params.id,
        markChannelList: params.markChannelList,
        markName: params.markName,
        markStartTime: (params.lableBeginEndDate && params.lableBeginEndDate.length > 0)
          ? moment(params.lableBeginEndDate[0]).format('YYYY-MM-DD') : '',
        markEndTime: (params.lableBeginEndDate && params.lableBeginEndDate.length > 0)
          ? moment(params.lableBeginEndDate[1]).format('YYYY-MM-DD') : '',
        parentId: params.parentId,
        remark: params.remark
      }
    }
    return _params
  },
  response(data) {
    return data
  }
}