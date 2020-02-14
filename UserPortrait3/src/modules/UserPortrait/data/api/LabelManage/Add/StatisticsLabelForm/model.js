/**
 * 格式化ant design Form组件输出的Fields格式，将value上提
 */
import { formatAntDesignFormFieldsData } from '@/common/utils'
import moment from 'moment'
/**
 * 格式化表达式入参
 */
import { formatTagsExpressionParams } from './utils/formatParams'

/**
 * 新增统计型标签
 */
export const addTagAndTagRule = {
  request(data) {
    let params = formatAntDesignFormFieldsData(data)
    let _p = {
      tagAndRuleReq: {
        list: params.expressionEdit ? [] : {
          tagRuleName: params.expressionLabel,
          // 如果为编辑咱是不做处理，即原封返回。
          tagRuleExpressions: formatTagsExpressionParams(params.expression)
        },
        tagDto: {
          id: params.id,
          // 渠道
          channelCode: params.channelCode,
          codeStatus: params.codeStatus,
          // 开始日期
          effDate: moment(params.lableBeginEndDate[0]).format('YYYY-MM-DD'),
          // 结束日期
          expDate: moment(params.lableBeginEndDate[1]).format('YYYY-MM-DD'),
          // lableBeginEndDate: params.lableBeginEndDate,
          // 标签ID
          tagCategoryId: params.tagCategoryId,
          // 标签说明
          tagDesc: params.tagDesc,
          // 标签名称
          tagName: params.tagName,
          // 标签类别
          tagType: params.tagType,
          // 用户名称
          userName: params.userName
        }
      }
    }
    return _p
  },
  response(data) {
    return data.Result.data
  }
}

/**
 * 获取表达式操作字符列表
 */
export const getOperationCharacters = {
  request(params) {
    return { operatorReq: {} }
  },
  response(data) {
    return data.Result.data
  }
}

/**
 * 获取表字段/值列表
 */
export const getCodeTablesByPropertyCode = {
  request(params) {
    return params
  },
  response(data) {
    return data.Result.data
  }
}

/**
 * 获取行业
 */
export const getFindIndustryList = {
  request(params) {
    return params
  },
  response(data) {
    // function recursion(d) {
    //   return d.map(a => {
    //     let obj = {
    //       title: a.label,
    //       value: a.value,
    //       key: a.value
    //     }
    //     if (a.children && a.children.length) { obj.children = recursion(a.children) }
    //     return obj
    //   })
    // }
    return data.Result.data
  }
}