/**
 * description 多选 通用插件
 * author: William
 */
import React, { Component } from 'react'
import { Select, Spin } from 'antd'
import { inject, observer } from 'mobx-react'
const { Option } = Select
/**
 * 分隔符
 */
// 界面显示分隔符
const SEPARATOR = ','
// 提交后台数组转字符串约定分隔符
const VALUE_SEPARATOR = ';'
@inject('PagesLabelManageStatisticsLabel')
@observer
class MultipleSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      /**
       * 值
       */
      value: undefined,
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.expressionLogicSymbol !== nextProps.expressionLogicSymbol) {
      this.setState({
        value: undefined
      })
    }
  }

  componentDidMount() {
    this.props.setExpressionValueRules(this.props.rowKey, [
      {
        required: true,
        message: '请选择内容'
      }
    ])
    this.getData()
  }

  /**
   * 获取数据
   */
  getData() {
    const { codeTablesByPropertyCodes, getCodeTablesByPropertyCode } = this.props.PagesLabelManageStatisticsLabel
    if (!codeTablesByPropertyCodes[this.props.propertyCode]) {
      this.setState({ loading: true })
      getCodeTablesByPropertyCode(this.props.propertyCode).finally(() => {
        this.setState({ 'loading': false })
      })
    }
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
        value: nextProps.value ? nextProps.value.split(VALUE_SEPARATOR) : []
      }
    }
    return null
  }

  /**
   * change
   */
  handleChange(value, data) {
    this.setState({ value })
    this.props.onChange(value.join(VALUE_SEPARATOR), data && data.map(item => item.props.children).join(SEPARATOR))
  }

  render() {
    const { codeTablesByPropertyCodes = {} } = this.props.PagesLabelManageStatisticsLabel
    let options = codeTablesByPropertyCodes[this.props.propertyCode] || []
    return (
      <Spin spinning={this.state.loading} >
        <Select
          placeholder='请选择'
          allowClear
          value={this.state.value}
          onChange={this.handleChange}
          optionFilterProp='label'
          mode='multiple'
          showArrow='true'
          style={{ width: '100%' }}
        >
          {options.map(
            (item, index) => <Option value={item.value} key={item.value} label={item.label}>{item.label}</Option>)}
        </Select>
      </Spin>
    )
  }
}

export default MultipleSelection
