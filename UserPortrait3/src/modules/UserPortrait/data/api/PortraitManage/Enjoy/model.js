/**
 * 格式化ant design Form组件输出的Fields格式，将value上提
 */
import { formatAntDesignFormFieldsData } from '@/common/utils'
import moment from 'moment'

// 新增共享画像
export const addEnjoyData = {
  request(data) {
    // 格式化
    let params = formatAntDesignFormFieldsData(data)
    let refLabel = params.tagIds.map(item => {
      return item.id
    })
    let _p = {
      userShareGroupReq: {
        channelCodes: params.channelCodes,
        desc: params.desc,
        // 开始日期
        effDate: moment(params.lableBeginEndDate[0]).format('YYYY-MM-DD'),
        // 结束日期
        expDate: moment(params.lableBeginEndDate[1]).format('YYYY-MM-DD'),
        name: params.name,
        protraitId: params.protraitId,
        shareChannelCode: params.shareChannelCode,
        tagIds: refLabel
      }
    }
    return _p
  },
  response(data) {
    return data
  }
}
// 共享画像查询渠道
export const queryChannel = {
  request(params) {
    return params
  },
  response(data) {
    if (data.Result.data && data.Result.data.length) {
      data.Result.data = data.Result.data.map(item => {
        item.value = item.channelCode
        item.label = item.channelName
        delete item.channelCode
        delete item.channelName
        return item
      })
    }
    return data
  }
}