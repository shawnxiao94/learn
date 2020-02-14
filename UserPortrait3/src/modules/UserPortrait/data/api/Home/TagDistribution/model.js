/**
 * 上汽用户业务分布
 */
export const getBusinessPercentModel = {
  request(params) {
    return params
  },
  response(data) {
    let req = data.Result.data
    // 画像数
    req.portraitBusiness.portraitDistributes = req.portraitBusiness.portraitDistributes.map(a => {
      return { name: a.channelName, value: a.channelPortraitTotal }
    })
    req.portraitBusiness.count = req.portraitBusiness.portraitCount
    // 标签数
    req.tagBusiness.tagDistributes = req.tagBusiness.tagDistributes.map(b => {
      return { name: b.channelName, value: b.channelTagTotal }
    })
    req.tagBusiness.count = req.tagBusiness.tagCount
    // 用户数
    req.userBusiness.userDistributes = req.userBusiness.userDistributes.map(c => {
      return { name: c.channelName, value: c.channelUserTotal }
    })
    req.userBusiness.count = req.userBusiness.userCount
    return req
  }
}