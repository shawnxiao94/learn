/**
 * description 行业
 * author: William
 */
import React, { Component } from 'react'
import { TreeSelect, Spin } from 'antd'
import { inject, observer } from 'mobx-react'

const { SHOW_ALL } = TreeSelect
/**
 * 分隔符
 */
// 界面显示分隔符
const SEPARATOR = ' , '
@inject('PagesLabelManageStatisticsLabel')
@observer
class IndustryCode extends Component {
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
    this.props.setExpressionValueRules(this.props.rowKey, [
      {
        required: true,
        message: '请选择内容'
      }
    ])
    this.getData()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.expressionLogicSymbol !== nextProps.expressionLogicSymbol) {
      this.setState({
        value: undefined
      })
    }
  }

  /**
   * 获取数据
   */
  getData() {
    const { industryList, getFindIndustryList } = this.props.PagesLabelManageStatisticsLabel
    if (!industryList) {
      this.setState({ loading: true })
      getFindIndustryList().finally(() => {
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
   * change
   */
  handleChange(value) {
    this.setState({ value })
    this.props.onChange(value, value && value.map(item => item.label).join(SEPARATOR))
  }

  render() {
    const { industryList } = this.props.PagesLabelManageStatisticsLabel
    const tProps = {
      treeData: industryList,
      value: this.state.value,
      onChange: this.handleChange,
      treeCheckable: true,
      treeCheckStrictly: true,
      showCheckedStrategy: SHOW_ALL,
      placeholder: '请选择行业',
      searchPlaceholder: '请搜索',
      treeNodeFilterProp: 'title',
      allowClear: true,
      style: {
        width: '100%'
      },
      // multiple: true,
      dropdownStyle: {
        maxHeight: 200,
        overflow: 'auto'
      }
    }
    return (
      <Spin spinning={this.state.loading} >
        <TreeSelect
          {...tProps}
        />
      </Spin>
    )
  }
}

export default IndustryCode
