/**
 * description 注册邮箱
 * author: William
 */
import React, { PureComponent } from 'react'
import { Input } from 'antd'

class LoginAccountEmail extends PureComponent {
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
      var reg = String(value).indexOf('*')
      if (reg === -1) {
        callback(new Error('必须包含*符号!'))
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
          placeholder='请输入匹配邮箱,必须包含*符号' />
      </React.Fragment>
    )
  }
}

export default LoginAccountEmail
