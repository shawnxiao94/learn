/**
 * description 生日
 * author: William
 */
// import React, { PureComponent } from 'react'
import NumberOrBetweenNumber from '../common/NumberOrBetweenNumber'
/**
 * 分隔符
 */
// 提交后台数组转字符串约定分隔符
const VALUE_SEPARATOR = ';'
class Birthdate extends NumberOrBetweenNumber {
  constructor(props) {
    super(props)
  }
  
  setExpressionValueRules(expressionLogicSymbol) {
    let rules
    const reg = /^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
    const msg = '格式应填写为：07-15'
    const validator = (rule, value, callback) => {
      if (value) {
        if (!reg.test(value)) {
          callback(new Error(msg))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const betweenValidator = (rule, value, callback) => {
      if (value) {
        let startValue = value.split(VALUE_SEPARATOR)[0]
        let endValue = value.split(VALUE_SEPARATOR)[1]
        if (!startValue || !endValue) {
          callback(new Error('不能为空!'))
        } else if (!reg.test(startValue) || !reg.test(endValue)) {
          callback(new Error(msg))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    if (expressionLogicSymbol !== 'BETWEEN') {
      rules = [
        {
          required: true,
          message: '不能为空!'
        },
        {
          validator: validator
        }
      ]
    } else {
      rules = [
        {
          required: true,
          message: '不能为空!'
        },
        {
          validator: betweenValidator
        }
      ]
      
    }
    this.props.setExpressionValueRules(this.props.rowKey, rules, 'onBlur')
  }
}

export default Birthdate
