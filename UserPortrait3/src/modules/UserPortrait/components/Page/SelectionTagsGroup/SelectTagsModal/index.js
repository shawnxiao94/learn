/**
 * 选择标签
 */
import React, { Component } from 'react'
import { Modal, Spin } from 'antd'
import SelectionTagsGroup from '@/modules/UserPortrait/components/Page/SelectionTagsGroup'
/**
 *  获取数据
 *  selectTags 获取标签数据
 *  selectTagsQuerySources 选择标签 - 所属公司部门 - 下拉框数据
 *  queryCategory 选择标签 - 标签分类 - 下拉框数据
 */
import { selectTags, selectTagsQuerySources, queryCategory } from '@/modules/UserPortrait/data/api/PortraitManage/Add/SelectTagsModal'
// import { deeclone } from '@/common/utils'

class SelectTagsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTags: undefined,
      visible: false,
      loading: false
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOnchange = this.handleOnchange.bind(this)
  }

  /**
   *  显示弹窗
   */
  show() {
    this.setState({ visible: true })
  }

  /**
   *  隐藏弹窗
   */
  hide() {
    this.setState({ visible: false })
  }

  /**
   * 监听数据变化
   */
  handleOnchange(selectedTags) {
    this.setState({ selectedTags })
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
    this.props.onChange(this.state.selectedTags)
    this.hide()
  }

  /**
   *  点击取消
   */
  handleCancel() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <Modal
        title='选择标签'
        width='1100px'
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        maskClosable={false}
      >
        <Spin spinning={this.state.loading} >
          <SelectionTagsGroup
            value={this.state.value}
            visible={this.state.visible}
            api={{ selectTags, selectTagsQuerySources, queryCategory }}
            onChange={this.handleOnchange}
          />
        </Spin>
      </Modal>
    )
  }
}
  
export default SelectTagsModal