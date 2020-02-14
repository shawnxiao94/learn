export const getFromSelectModel = {
  request(params) {
    return params
  },
  response(data) {
    return data.Result.data
  }
}