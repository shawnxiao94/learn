/**
 * 标签画像 - 标签列表
 */
export const getLabelListModel = {
  request(params) {
    if (params.sortOrder) {
      params.sortOrder = params.sortOrder.split('end').join('')
    }
    let result = {
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      isOpenStatus: params.isOpenStatus && params.isOpenStatus.length > 0 ? params.isOpenStatus : [],
      selectChannelCodes: params.selectChannelCodes && params.selectChannelCodes.length > 0 ? params.selectChannelCodes : [],
      sortName: params.sortField ? params.sortField : '',
      sortType: params.sortOrder ? params.sortOrder : '',
      tagTypes: params.tagTypes && params.tagTypes.length > 0 ? params.tagTypes : [],
      vagueName: params.name
    }
    return { group: result }
  },
  response(data) {
    return data.Result.data
  }
}

/**
 * 标签画像 - 标签列表-查询用户数
 */
export const queryTagUserCountsModel = {
  request(params) {
    let tagUserCounts = []
    params.content.map(_item => {
      tagUserCounts.push({ id: _item.id, type: _item.tagType })
    })
    return { tagUserCountsReq: { tagUserCounts: tagUserCounts } }
  },
  response(data) {
    return data
  }
}

// 用户标签 - 修改状态
export const updateTagIsOpenModel = {
  request(params) {
    return params
  },
  response(data) {
    return data
  }
}

// 手工型失效
export const loseEfficacyTagStatusModel = {
  request(params) {
    delete params.status
    return params
  },
  response(data) {
    return data
  }
}

/**
 * 标签画像 - 标签详情
 */
export const queryTagByTagIdModel = {
  request(params) {
    let _params = {
      tagDetailReq: {
        tagId: params.id
      }
    }
    return _params
  },
  response(data) {
    return data
  }
}

// 标签共享查询
export const queryTagAndChannelModel = {
  request(params) {
    return { 'updateStateReq': { 'tagId': params.id } }
  },
  response(data) {
    // 选中的keys
    let checkValues = []
    if (data.Result.data.sourceDtos && data.Result.data.sourceDtos.length) {
      data.Result.data.sourceDtos = data.Result.data.sourceDtos.map(item => {
        item.value = item.channelCode
        item.label = item.channelName
        delete item.channelCode
        delete item.channelName
        if (item.ifSelect) {
          item.disabled = true
          checkValues.push(item.value)
        }
        return item
      })
      data.Result.data.checkValues = checkValues
    }
    return data.Result.data
  }
}

// 标签共享新增编辑
export const addShareChannelModel = {
  request(params) {
    return {
      tagShareReq: {
        tagId: params.tagId,
        tagName: params.tagName,
        sourceDtos: params.sourceDtos
      }
    }
  },
  response(data) {
    return data
  }
}

// 标签画像 - 来源下拉框
// export const getFromSelectModel = {
//   request(params) {
//     return params
//   },
//   response(data) {
//     return {
//       data:
//         data.Result.data instanceof Object
//           ? data.Result.data
//           : JSON.parse(data.Result.data)
//     }
//   }
// }

/**
 * 根据标签ID 获取共享标签
 */
export const queryShareChannelNameModel = {
  request(params) {
    return params
  },
  response(data) {
    return data
  }
}
