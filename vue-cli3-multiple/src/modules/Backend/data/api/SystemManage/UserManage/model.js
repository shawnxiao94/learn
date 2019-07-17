export const getAccout = {
  request(params) {
    return {
      roleCenterUser: {
        orderElement: params.orderElement,
        orderRule: params.orderRule,
        pageNum: params.pageNumber,
        pageSize: params.pageSize,
        sysId: params.sysId,
        userInfo: {
          email: params.email,
          mobile: params.mobile,
          userName: params.userName,
          createdDateFrom: params.createdDateFrom,
          createdDateTo: params.createdDateTo
        }
      }
    }
  },
  response(data) {
    return data.Result.data instanceof Object
      ? data.Result.data
      : JSON.parse(data.Result.data)
  }
}
export const getLoginTimesDetail = {
  request(params) {
    return params
  },
  response(data) {
    return data.Result.data instanceof Object
      ? data.Result.data
      : JSON.parse(data.Result.data)
  }
}
export const getLogDetail = {
  request(params) {
    return params
  },
  response(data) {
    return data.Result.data instanceof Object
      ? data.Result.data
      : JSON.parse(data.Result.data)
  }
}
export const addAccout = {
  request(params) {
    return {
      adminUser: {
        userName: params.userName,
        passWord: params.passWord,
        mobile: params.mobile
      }
    }
  },
  response(data) {
    return data.Result.data instanceof Object
      ? data.Result.data
      : JSON.parse(data.Result.data)
  }
}

export const addAccoutRoleCenter = {
  request(params) {
    return params
  },
  response(data) {
    return data.Result.data instanceof Object
      ? data.Result.data
      : JSON.parse(data.Result.data)
  }
}
