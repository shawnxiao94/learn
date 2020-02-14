
/**
 * 获取详情-主活动
 */
export const queryParentActivityByIdModel = {
  request(params) {
    return params
  },
  response(data) {
    data = data.Result.data
    let _baseUserGroupIds = data.userShareGroups && data.userShareGroups.length > 0
      ? data.userShareGroups.map(item => {
        return item.id
      }) : []
    let _filePath = data.filePath && data.filePath.split(',')
    // 活动响应方
    data.activeResponderList = data.activeResponder
    // 营销渠道
    data.markChannelList = (data.markChannel && data.markChannel.split(',')) || '-'
    // 日期区间
    data.lableBeginEndDate = []
    // 用户群ID
    data.userGroupId =
      data.userShareGroups && data.userShareGroups.length > 0
        ? data.userShareGroups
        : []
    // 主用户群名称
    data.baseUserGroupIds = _baseUserGroupIds
    // 子用户群名称
    data.userGroupName = data.userShareGroups
    // 生成文件路径
    data.filePath = _filePath || []
    delete data.markChannel
    delete data.activeResponder

    return data
  }
}

/**
 * 获取详情-子活动
 */
export const querySubActivityByIdModel = {
  request(params) {
    return params
  },
  response(data) {
    data = data.Result.data
    let _baseUserGroupIds = data.userShareGroups && data.userShareGroups.length > 0
      ? data.userShareGroups.map(item => {
        return item.id
      }) : []
    let _filePath = data.filePath && data.filePath.split(',')
    // 活动响应方
    data.activeResponderList = data.activeResponder
    // 营销渠道
    data.markChannelList = (data.markChannel && data.markChannel.split(',')) || '-'
    // 日期区间
    data.lableBeginEndDate = []
    // 子用户群名称
    data.userGroupName = data.userShareGroups
    // 子用户群id
    data.userShareGroups = data.userShareGroups.map(item => {
      return item.id
    })
    // 子用户群编辑回显
    data.childUserGroupIds = _baseUserGroupIds
    // 生成文件路径
    data.filePath = _filePath || []
    delete data.markChannel
    delete data.activeResponder
    return data
  }
}

/**
 * 活动结束按钮
 */
export const disableActivityDataModel = {
  request(params) {
    return params
  },
  response(data) {
    return data
  }
}

/**
 * 生成按钮
 */
export const generateFormDataModel = {
  request(params) {
    return params
  },
  response(data) {
    return data
  }
}