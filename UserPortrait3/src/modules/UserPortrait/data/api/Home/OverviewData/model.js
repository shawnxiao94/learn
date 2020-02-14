import * as utils from '@/common/utils/index.js'

/**
 * 数据汇总
 */
export const general = {
  request(params) {
    return params
  },
  response(data) {
    let res = data.Result.data
    const arr = ['userTotal', 'monthUserTotal', 'portraitTotal', 'monthPortraitTotal', 'tagTotal', 'monthTagTotal', 'userGroupShareTotal', 'monthUserGroupShareTotal']
    for (let k of Object.keys(res)) {
      if (arr.includes(k)) {
        const val = utils.conversionUnit({ val: res[k], retrunArray: true })
        res[k] = val
      }
    }
    return res
  }
}