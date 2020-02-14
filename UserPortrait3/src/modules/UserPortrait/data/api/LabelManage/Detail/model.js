/**
 * 获取手工型标签中导入用户的历史记录列表数据
 */
export const queryManualTagRecord = {
  request(params) {
    let _params = {
      ManualTagRecordPageReq: {
        pageSize: 3,
        pageNumber: 1,
        tagId: params.id
      }
    }
    return _params
  },
  response(data) {
    return data
  }
}