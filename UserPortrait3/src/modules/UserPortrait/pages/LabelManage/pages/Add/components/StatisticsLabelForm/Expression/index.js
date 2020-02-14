import React, { Component } from 'react'
import { Modal, message, Spin } from 'antd'
import TableForm from './TableForm/index'
import { deepClone } from '@/common/utils'
import { queryTagExpression } from '@/modules/UserPortrait/data/api/LabelManage/Add'
/**
 * 格式化入参
 */
import { formatTagsExpressionParams } from '@/modules/UserPortrait/data/api/LabelManage/Add/StatisticsLabelForm/utils/formatParams'

class Expression extends Component {
  constructor(props) {
    super(props)
    this.state = {
      /**
       * 表达式提交数据
       */
      value: undefined,
      data: undefined,
      loading: false,
      visible: false
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleBindChildData = this.handleBindChildData.bind(this)
  }

  /**
   *  显示弹窗
   */
  show() {
    this.setState({ data: deepClone(this.state.value) })
    this.setState({ visible: true })
  }

  /**
   *  隐藏弹窗
   */
  hide() {
    this.setState({ visible: false })
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
   *  点击确定
   */
  handleOk() {
    this.TableForm.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.getData()
      }
    })
  }
  
  /**
   * 获取预览规则数据
   */
  getData() {
    // 所有值
    let form = this.state.data
    /**
     * 如果还有未保存则提示保存
     */
    if (form.some(item => { return item.edit })) {
      message.warning(`请先保存!`)
      return
    }
    this.setState({ loading: true })
    queryTagExpression(formatTagsExpressionParams(form)).then(res => {
      this.props.onChange(deepClone(this.state.data), res)
      this.hide()
    }).catch(() => {
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  /**
   *  点击取消
   */
  handleCancel() {
    this.setState({ visible: false })
  }

  /**
   * 绑定同步子组件data
   */
  handleBindChildData(data) {
    this.setState({ data: deepClone(data) })
  }

  render() {
    return (
      <Modal
        title='表达式'
        width='1100px'
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        maskClosable={false}
      >
        <Spin spinning={this.state.loading} >
          <TableForm
            value={this.state.value}
            visible={this.state.visible}
            bindChildData={this.handleBindChildData}
            ref={TableForm => {
              this.TableForm = TableForm
            }}
          />
        </Spin>
      </Modal>
    )
  }
}
  
export default Expression