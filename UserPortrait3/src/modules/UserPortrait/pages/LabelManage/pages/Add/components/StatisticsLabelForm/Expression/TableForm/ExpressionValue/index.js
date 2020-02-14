/**
 * description 表达式值/范围子组件
 * author: William
 */
import React, { PureComponent } from 'react'
/**
 * 插件配置
 */
import Config from './config'
import { Input } from 'antd'

class ExpressionValue extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      /**
       * 值
       */
      value: undefined,
      /**
       * loading
       */
      loading: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * 子组建state绑定父组件props的生命钩子
   * ant design Form getFieldDecorator组件会在绑定子组件添加value属性，和onChange事件，onChange事件参数即value的值
   * getDerivedStateFromProps 这个生命周期钩子会将父组件传入的props属性与子组件state进行绑定，进而实现初始化赋值功能
   * getDerivedStateFromProps 与 this.props.onChange(:value)为ant design Form插件的固定搭配写法，形成子组件value值与外层Form的双向绑定
   */
  static getDerivedStateFromProps(nextProps) {
    let _value = nextProps.value
    if ('value' in nextProps) {
      return {
        value: _value
      }
    }
    return null
  }

  /**
   * 值改变触发
   * 触发上层ant design Form Item 插件的onChange事件
   */
  handleChange(value, label) {
    const { onChange } = this.props
    label = label || value
    if (onChange) {
      onChange(value, label)
    }
  }

  render() {
    // 所有值
    let fieldsValue = this.props.form.getFieldsValue()
    // key
    let { key } = this.props.data
    // 规则关系值
    let expressionLogicSymbol = fieldsValue[`expressionLogicSymbol__${key}`]
    // 表达式字段值
    let propertyCodeArr = fieldsValue[`propertyCode__${key}`]
    let propertyCode
    if (propertyCodeArr && propertyCodeArr.length) {
      propertyCode = propertyCodeArr[propertyCodeArr.length - 1]
    }
    const Component = Config[propertyCode]
    return (
      <React.Fragment>
        {propertyCode && Component && expressionLogicSymbol
          ? <Component
            onChange={this.handleChange}
            setExpressionValueRules={this.props.setExpressionValueRules}
            rowKey={key}
            fieldsValue={fieldsValue}
            propertyCode={propertyCode}
            value={this.state.value}
            expressionLogicSymbol={expressionLogicSymbol}
          />
          : <Input
            placeholder='请先选择前两项'
            style={{ width: '100%' }}
          />
        }
      </React.Fragment>
    )
  }
}

export default ExpressionValue
