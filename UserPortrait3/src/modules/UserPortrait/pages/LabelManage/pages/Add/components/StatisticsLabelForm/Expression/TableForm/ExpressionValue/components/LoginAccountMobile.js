/**
 * description 注册手机号
 * author: William
 */
import React, { PureComponent } from 'react'
import { Input } from 'antd'

class LoginAccountMobile extends PureComponent {
  constructor(props) {
    super(props)
    let value = this.props.value ? this.props.value : undefined
    this.state = {
      /**
       * 值
       */
      value: value
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setExpressionValueRules()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.expressionLogicSymbol !== nextProps.expressionLogicSymbol) {
      this.setState({
        value: undefined
      })
    }
  }

  setExpressionValueRules() {
    let rules
    const validatorLoginAccountMobile = (rule, value, callback) => {
      var reg = /^\*\d{1,11}$|^\d{1,11}\*$/
      if (!reg.test(value)) {
        callback(new Error('开头或结尾必须为星号“*”，必须为纯数字，数字最长为11位！'))
      } else {
        callback()
      }
    }
    rules = [
      {
        required: true,
        message: '不能为空!'
      },
      {
        validator: validatorLoginAccountMobile
      }
    ]
    this.props.setExpressionValueRules(this.props.rowKey, rules, 'onBlur')
  }

  /**
   * change
   */
  handleChange(e) {
    let value = e.target.value
    this.setState({ value })
    this.props.onChange(value)
  }

  render() {
    return (
      <React.Fragment>
        <Input
          style={{ width: '100%' }}
          value={this.state.value}
          onChange={this.handleChange}
          placeholder='请输入手机号' />
      </React.Fragment>
    )
  }
}

export default LoginAccountMobile
