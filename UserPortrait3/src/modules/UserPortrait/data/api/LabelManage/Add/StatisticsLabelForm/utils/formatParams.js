/**
 * 格式化参数
 */
// 深拷贝
import { deepClone } from '@/common/utils'
import moment from 'moment'
/**
 * 格式化标签表达式入参
 */
export function formatTagsExpressionParams(data) {
  let length = data.length
  let params = deepClone(data).map((item, index) => {
    // 如果字段为行业，则将value转换为字符串，用';'分割
    if (item.propertyCode[1] === 'industry_code') {
      item.expressionValue = item.expressionValue.map(item => item.value).join(';')
    }
    return {
      expressionLogicSymbol: item.expressionLogicSymbol,
      expressionRelationSymbol: (index === length - 1) ? undefined : item.expressionRelationSymbol,
      operatorType: item.propertyCodeData[1] && item.propertyCodeData[1].operatorType,
      operatorCodeType: item.propertyCodeData[1] && item.propertyCodeData[1].operatorCodeType,
      flagStatus: item.propertyCode[1],
      expressionValue: item.expressionValue,
      expressionValueName: item.expressionValueLabel,
      propertyCode: item.propertyCode.join(','),
      propertyName: item.propertyCodeLabel.replace(' / ', ','),
      groupFlag: +item.groupFlag,
      type: item.propertyCodeData[1].type
    }
  })
  return params
}

/**
 * 格式化统计型编辑出参
 */
export function formatStatisticsTagsResponse(data) {
  let form = {
    // id
    id: {
      value: +data.tagDto.id
    },
    // 标签类别
    tagCategoryId: {
      value: data.tagDto.tagCategoryId
    },
    // 标签名称
    tagName: {
      value: data.tagDto.tagName
    },
    // 标签说明
    tagDesc: {
      value: data.tagDto.tagDesc
    },
    // 起止日期
    lableBeginEndDate: {
      value: [moment(data.tagDto.effDate), moment(data.tagDto.expDate)]
    },
    // 表达式
    expression: {
      value: [{}]
    },
    // 编辑表达式不做处理原封返回
    expressionEdit: { value: data.tagRuleDtos },
    // 表达式Label
    expressionLabel: { value: data.tagRuleDtos[0].tagRuleName },
    // 设置标签类型
    tagType: {
      value: data.tagDto.tagType
    },
    // 设置用户名
    // userName: {
    //   value: this.props.Root.userInfo.userName
    // },
    // 设置渠道
    channelCode: {
      value: data.tagDto.channelCode,
      label: data.tagDto.channelName
    },
    // 默认值
    codeStatus: {
      value: data.tagDto.codeStatus
    }
  }
  return {
    form: form,
    data: data
  }
}