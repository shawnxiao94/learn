/**
 * 获取详情接口
 */
export const queryTagByTagId = {
  request(params) {
    return { 'tagDetailReq': { 'tagId': params.id } }
  },
  response(data) {
    return data.Result.data
  }
}