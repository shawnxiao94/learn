/**
 * description 正整数，或者区间正整数值 插件
 * author: William
 */
import { checkInteger } from '@/common/validate'
import NumberOrBetweenNumber from './NumberOrBetweenNumber'
import { validateInteger } from '@/common/validate/validate'
/**
 * 分隔符
 */
// 提交后台数组转字符串约定分隔符
const VALUE_SEPARATOR = ';'
class IntegerOrBetweenInteger extends NumberOrBetweenNumber {
  setExpressionValueRules(expressionLogicSymbol) {
    let rules, validateTrigger
    const betweenValidator = (rule, value, callback) => {
      if (value) {
        let startValue = value.split(VALUE_SEPARATOR)[0]
        let endValue = value.split(VALUE_SEPARATOR)[1]
        if (!startValue || !endValue) {
          callback(new Error('不能为空!'))
        } else if (!validateInteger(startValue).status || !validateInteger(endValue).status) {
          callback(new Error('必须为正整数!'))
        } else if (Number(startValue) > Number(endValue)) {
          callback(new Error('起始值不能大于结束值!'))
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
          validator: checkInteger
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
      validateTrigger = 'onBlur'
    }
    this.props.setExpressionValueRules(this.props.rowKey, rules, validateTrigger)
  }
}

export default IntegerOrBetweenInteger
