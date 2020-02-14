/**
 * 格式化ant design Form组件输出的Fields格式，将value上提
 */
import { formatAntDesignFormFieldsData } from '@/common/utils'
import moment from 'moment'

export const submitDataModel = {
  request(data) {
    // 格式化
    let params = formatAntDesignFormFieldsData(data)
    let tagIds = params.selectLabel.map(item => {
      return item.id
    })
    let _portraitObj = {
      portrait: {
        effDate: moment(params.lableBeginEndDate[0]).format('YYYY-MM-DD'),
        expDate: moment(params.lableBeginEndDate[1]).format('YYYY-MM-DD'),
        portraitName: params.portraitName,
        description: params.description,
        tagIds: tagIds || []
      }
    }
    return _portraitObj
  },
  response(data) {
    return data
  }
}

export const submitUpdataModel = {
  request(data) {
    // 格式化
    let params = formatAntDesignFormFieldsData(data)
    let tagIds = params.selectLabel.map(item => {
      return item.id
    })
    let _portraitObj = {
      portrait: {
        portraitId: params.portraitId,
        effDate: moment(params.lableBeginEndDate[0]).format('YYYY-MM-DD'),
        expDate: moment(params.lableBeginEndDate[1]).format('YYYY-MM-DD'),
        portraitName: params.portraitName,
        description: params.description,
        tagIds: tagIds || []
      }
    }
    return _portraitObj
  },
  response(data) {
    return data
  }
}