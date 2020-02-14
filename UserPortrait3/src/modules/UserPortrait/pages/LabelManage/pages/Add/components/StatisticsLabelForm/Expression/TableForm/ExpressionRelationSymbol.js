/**
 * description 表达式关系子组件
 * author: William
 */
import React, { PureComponent } from 'react'
import { Select } from 'antd'
const { Option } = Select

class ExpressionRelationSymbol extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      /**
       * 值
       */
      value: undefined,
      /**
       * 下拉数据
       */
      options: [
        { value: '&&', label: '并且' },
        { value: '||', label: '或者' }
      ]
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
    if ('value' in nextProps) {
      return {
        value: nextProps.value
      }
    }
    return null
  }

  /**
   * 值改变触发
   * 触发上层ant design Form Item 插件的onChange事件
   */
  handleChange(value, data) {
    const { onChange } = this.props
    if (onChange) {
      onChange(value, data && data.props.children)
    }
  }
  // componentDidMount() {
  //   // 默认触发一次onChange事件
  //   this.defaultTriggerOnChange()
  // }
  // // 默认触发一次onChange事件
  // defaultTriggerOnChange() {
  //   this.props.onChange(this.state.value, this.state.options.find(item => { return item.value === this.state.value }).label)
  // }

  render() {
    const { options = [] } = this.state
    return (
      <Select
        style={{ width: '100%' }}
        value={this.state.value}
        onChange={this.handleChange}
        placeholder='请选择表达式关系'
      >
        {options.map(
          (item, index) => <Option value={item.value} key={item.value}>{item.label}</Option>)}
      </Select>
    )
  }
}

export default ExpressionRelationSymbol
