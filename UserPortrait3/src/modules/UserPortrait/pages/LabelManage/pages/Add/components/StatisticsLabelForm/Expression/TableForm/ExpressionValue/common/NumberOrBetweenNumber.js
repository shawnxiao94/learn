/**
 * description 数值，或者区间数值 插件
 * author: William
 */
import React, { PureComponent } from 'react'
import { Input } from 'antd'
import { checkNumber } from '@/common/validate'
/**
 * 分隔符
 */
// 界面显示分隔符
const SEPARATOR = ' ; '
// 提交后台数组转字符串约定分隔符
const VALUE_SEPARATOR = ';'
class NumberOrBetweenNumber extends PureComponent {
  constructor(props) {
    super(props)
    let value, startValue, endValue
    if (this.props.expressionLogicSymbol !== 'BETWEEN') {
      value = this.props.value ? this.props.value : undefined
    } else {
      startValue = this.props.value ? this.props.value.split(VALUE_SEPARATOR)[0] : undefined
      endValue = this.props.value ? this.props.value.split(VALUE_SEPARATOR)[1] : undefined
    }
    this.state = {
      /**
       * 值
       */
      value: value,
      /**
       * 当为BETWEEN时
       */
      startValue: startValue,
      endValue: endValue
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleStartChange = this.handleStartChange.bind(this)
    this.handleEndChange = this.handleEndChange.bind(this)
  }

  componentDidMount() {
    this.setExpressionValueRules(this.props.expressionLogicSymbol)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.expressionLogicSymbol !== nextProps.expressionLogicSymbol) {
      this.setState({
        value: undefined,
        startValue: undefined,
        endValue: undefined
      })
      this.setExpressionValueRules(nextProps.expressionLogicSymbol)
    }
  }

  setExpressionValueRules(expressionLogicSymbol) {
    let rules, validateTrigger
    const betweenValidator = (rule, value, callback) => {
      if (value) {
        let startValue = value.split(VALUE_SEPARATOR)[0]
        let endValue = value.split(VALUE_SEPARATOR)[1]
        if (!startValue || !endValue) {
          callback(new Error('不能为空!'))
        } else if (isNaN(Number(startValue)) || isNaN(Number(endValue))) {
          callback(new Error('必须为数字!'))
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
          validator: checkNumber
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

  /**
   * change
   */
  handleChange(e) {
    let value = e.target.value
    this.setState({ value })
    this.props.onChange(value)
  }

  /**
   * change
   */
  handleStartChange(e) {
    let startValue = e.target.value
    this.setState({ startValue }, () => {
      this.propsChange()
    })
  }
  handleEndChange(e) {
    let endValue = e.target.value
    this.setState({ endValue }, () => {
      this.propsChange()
    })
  }
  propsChange() {
    let value, label
    if (this.state.startValue || this.state.endValue) {
      value = (this.state.startValue || '') + VALUE_SEPARATOR + (this.state.endValue || '')
      label = (this.state.startValue || '') + SEPARATOR + (this.state.endValue || '')
    }
    this.props.onChange(value, label)
  }

  render() {
    let { expressionLogicSymbol } = this.props
    return (
      <React.Fragment>
        {
          expressionLogicSymbol !== 'BETWEEN' &&
          <Input
            style={{ width: '100%' }}
            value={this.state.value}
            onChange={this.handleChange}
            placeholder='请输入值/范围' />
        }
        {
          expressionLogicSymbol === 'BETWEEN' &&
        <div>
          <Input
            value={this.state.startValue}
            onChange={this.handleStartChange}
            style={{ width: '40%' }}
            placeholder='起始值' />
          <span> - </span>
          <Input
            value={this.state.endValue}
            onChange={this.handleEndChange}
            style={{ width: '40%' }}
            placeholder='结束值' />
        </div>
        }
      </React.Fragment>
    )
  }
}

export default NumberOrBetweenNumber
