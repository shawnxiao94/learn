/**
 * description 输入项 通用插件
 * author: William
 */
import React, { PureComponent } from 'react'
import { Input } from 'antd'
import { checkUpperCaseNumber } from '@/common/validate'

class InputType extends PureComponent {
  constructor(props) {
    super(props)
    let value = this.props.value ? this.props.value : undefined
    this.state = {
      /**
       * 值
       */
      value: value,
      validatorInputType: (rule, value, callback) => {
        callback()
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * 页面级逻辑，此处注意经常清理，查看是否有些页面去掉了对应代码要删掉
   */
  pagesLogic() {
    return new Promise(resolve => {
      // 如果为姓名，则校验特殊字符
      if (this.props.propertyCode === 'full_name') {
        const validatorInputType = (rule, value, callback) => {
          var reg = /^[\u4e00-\u9fa5a-z0-9]+$/
          if (!reg.test(value)) {
            callback(new Error('不能为特殊字符!'))
          } else {
            callback()
          }
        }
        this.setState({ validatorInputType: validatorInputType }, () => {
          resolve()
        })
      } else if (this.props.propertyCode === 'saic_id') {
        // 如果为SaicId
        this.setState({ validatorInputType: checkUpperCaseNumber }, () => {
          resolve()
        })
      } else {
        resolve()
      }
    })
  }

  componentDidMount() {
    this.pagesLogic().then(() => {
      this.setExpressionValueRules()
    })
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
    rules = [
      {
        required: true,
        message: '不能为空!'
      },
      {
        validator: this.state.validatorInputType
      }
    ]
    this.props.setExpressionValueRules(this.props.rowKey, rules)
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
          placeholder='请输入值/范围' />
      </React.Fragment>
    )
  }
}

export default InputType
