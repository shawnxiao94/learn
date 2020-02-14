export const findByPortraitId = {
  request(params) {
    let _params = { findByPortraitIdReq: { portraitId: params.id } }
    return _params
  },
  response(data) {
    return data.Result.data
  }
}