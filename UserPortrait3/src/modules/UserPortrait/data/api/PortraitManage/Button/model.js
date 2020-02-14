export const disableData = {
  request(params) {
    return { forBidPortraitReq: params }
  },
  response(data) {
    return data
  }
}