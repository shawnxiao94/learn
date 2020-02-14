/**
 * description 单选 通用插件
 * author: William
 */
import React, { Component } from 'react'
import { Select, Spin } from 'antd'
import { inject, observer } from 'mobx-react'
const { Option } = Select

@inject('PagesLabelManageStatisticsLabel')
@observer
class SelectType extends Component {
  constructor(props) {
    super(props)
    let value = this.props.value ? this.props.value : undefined
    this.state = {
      /**
       * 值
       */
      value: value,
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
   * change
   */
  handleChange(value, data) {
    this.setState({ value })
    this.props.onChange(value, data && data.props.children)
  }

  render() {
    const { codeTablesByPropertyCodes = {} } = this.props.PagesLabelManageStatisticsLabel
    let options = codeTablesByPropertyCodes[this.props.propertyCode] || []
    return (
      <Spin spinning={this.state.loading} >
        <Select
          placeholder='请选择'
          allowClear
          style={{ width: '100%' }}
          optionFilterProp='label'
          value={this.state.value}
          onChange={this.handleChange}
        >
          {options.map(
            (item, index) => <Option value={item.value} key={item.value} label={item.label}>{item.label}</Option>)}
        </Select>
      </Spin>
    )
  }
}

export default SelectType
