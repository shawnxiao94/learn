/**
 * description 表达式字段子组件
 * author: William
 */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Cascader, Spin } from 'antd'

/**
 * 分隔符
 */
const SEPARATOR = ' / '
@inject('PagesLabelManageStatisticsLabel')
@observer
class PropertyCodeItem extends Component {
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

  componentDidMount() {
    this.getData()
  }

  /**
   * 获取下拉数据
   * 判断mobx仓库里是否加载过下拉数据，如果没有则加载
   */
  getData() {
    const { operationCharacters, getOperationCharacters } = this.props.PagesLabelManageStatisticsLabel
    if (operationCharacters.length < 1) {
      this.setState({ loading: true })
      getOperationCharacters().finally(() => {
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
      onChange([...value], data.map(item => item.label).join(SEPARATOR), data)
    }
  }

  render() {
    const { operationCharacters = [] } = this.props.PagesLabelManageStatisticsLabel
    function filter(inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    }
    return (
      <Spin spinning={this.state.loading}>
        <Cascader
          value={this.state.value}
          options={operationCharacters}
          onChange={this.handleChange}
          showSearch={{ filter }}
          placeholder='请选择表达式字段'
        />
      </Spin>
    )
  }
}

export default PropertyCodeItem
