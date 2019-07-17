export const getUserOperationLogByType = {
  request(params) {
    return params
  },
  response(data) {
    return data
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
