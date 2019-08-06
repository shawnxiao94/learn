
/**
 * Model 数据中转层
 */
export const login = {
  request(params) {
      return params
  },
  response(data) {
      return data.Result.data
  }
}