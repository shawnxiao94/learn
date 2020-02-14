/**
 * 活动管理列表
 */
export const getFindByMarketPageModel = {
  request(params) {
    if (params.sortType) {
      params.sortType = params.sortType.split('end').join('')
    }
    let paramsObj = {
      marketingActivitiesReq: {
        pageNumber: params.current,
        pageSize: params.pageSize,
        markName: params.markName,
        statuss: params.statuss,
        sortName: params.sortName ? params.sortName : '',
        sortType: params.sortName ? params.sortType : ''
      }
    }
    return paramsObj
  },
  response(data) {
    let _data = data.Result.data || {}
    if (_data.content.length > 0) {
      _data.content = _data.content.map(item => {
        let paramsObj = {}
        paramsObj.createBy = item.createBy
        paramsObj.createTime = item.createTime
        paramsObj.id = item.id
        paramsObj.markChannel = item.markChannel.split(',')
        paramsObj.markEndTime = item.markEndTime
        if (paramsObj.children && paramsObj.children.length > 0) {
          paramsObj.userGroupId = 1
        } else {
          if (
            Number(item.status) === 4 ||
            Number(item.status) === 0 ||
            Number(item.status) === 3
          ) {
            // 禁用提示
            paramsObj.userGroupId = 0
          } else {
            paramsObj.userGroupId = 1
          }
        }
        paramsObj.markName = item.markName
        paramsObj.markStartTime = item.markStartTime
        paramsObj.status = item.status
        paramsObj.children = item.children
        paramsObj.parentId = item.parentId
        paramsObj.fileBuildStatus = item.fileBuildStatus
        paramsObj.filePath = item.filePath
        if (paramsObj.children && paramsObj.children.length > 0) {
          paramsObj.children = item.children.map(lab => {
            let labData = {}
            labData.createBy = lab.createBy
            labData.createTime = lab.createTime
            labData.id = lab.id
            labData.markChannel = lab.markChannel.split(',')
            labData.markEndTime = lab.markEndTime
            labData.userGroupId = lab.userGroupId
            labData.markName = lab.markName
            labData.markStartTime = lab.markStartTime
            labData.status = lab.status
            labData.parentId = lab.parentId
            labData.fileBuildStatus = lab.fileBuildStatus
            labData.filePath = lab.filePath
            return labData
          })
        }
        return paramsObj
      })
    }
    return _data
  }
}

/**
 * 活动列表-查询用户数
 */
export const findActivityUsersModel = {
  request(params) {
    let activityUserCounts = []
    params.content.map(_item => {
      // 主活动
      activityUserCounts.push({ id: _item.id, type: 'base' })
      // 子活动
      if (_item.children && _item.children.length > 0) {
        _item.children.map(_childrenItem => {
          activityUserCounts.push({ id: _childrenItem.id, type: 'child' })
        })
      }
    })
    return { activityUsersReq: { activityUserCounts: activityUserCounts } }
  },
  response(data) {
    return data
  }
}