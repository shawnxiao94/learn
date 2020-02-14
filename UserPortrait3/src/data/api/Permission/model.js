/**
 * Model 获取用户信息
 */
export const getUserInfoByAccount = {
  request(params) {
    return params
  },
  response(data) {
    return data.Result.data
  }
}

/**
 * Model 获取权限列表
 */
export const getAllAuthorityTree = {
  request(params) {
    return params
  },
  response(data) {
    return data
  }
}
