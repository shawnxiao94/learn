/**
 * 按钮组
 */
import React, { Component } from 'react'
import { Modal, Form, Input, notification, Button } from 'antd'
import PropTypes from 'prop-types'
/**
 *  保存分析历史记录
 */
import { saveBiAnalysisHistory } from '@/modules/UserPortrait/data/api/GroupManage/AnalysisBi'
import { withRouter } from 'react-router-dom'
import { getQueryString } from '@/common/utils/index'
@withRouter
class AnalysisBiButton extends Component {
  static contextTypes = {
    // 刷新列表
    refreshGroupManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      // 显示隐藏
      loading: false
    }
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible && nextProps.visible) {
      this.show()
    }
  }
  
  /**
   * 显示
   */
  show() {
    /**
     * 如果编辑设置分析记录名称
     * 这里有个问题，应该把中文记录名称一起存到数据库里的，然后回显再赋值
     * 暂时先从列表带过来的URL参数中取值
     * */
    if (this.props.historyId) {
      this.props.form.setFieldsValue({ 'historyName': decodeURIComponent(getQueryString('historyName')) })
    }
    this.setState({ visible: true })
  }
  
  /**
   * 隐藏
   */
  hide() {
    this.setState({ visible: false })
    this.props.form.setFields({
      historyName: {
        value: ''
      }
    })
    this.props.handleHideModal()
  }

  /**
   * 获取参数
   */
  getParams() {
    let form = this.props.AntOrNot.getParams()
    form.biAnalysisHistoryReq = {
      // 用户群ID
      userGroupId: this.props.userGroupId,
      // 分析历史记录ID，如果有历史记录ID，则说明是编辑
      historyId: this.props.historyId,
      // 分析历史记录名称
      historyName: this.props.form.getFieldValue('historyName')
    }
    return form
  }

  /**
   * 点击确定
   */
  handleOk() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        saveBiAnalysisHistory(this.getParams()).then(response => {
          let message = ''
          if (this.props.historyId) {
            message = `名为“${response.historyName}”的分析历史记录已更新`
          } else {
            message = `已生成一条名为“${response.historyName}”的分析历史记录，可到BI报表分析历史数据中查看`
          }
          notification['success']({
            message: '提交成功',
            description: message
              
          })
          if (this.props.type === 'createAndAddSubgroup') {
            /**
             * 这里有一个逻辑需要注意
             * 当跳转到下一页，该条历史记录已经在数据库中生成，这时在下一个表单页面点击返回上一步返回这一页，在进行编辑保存时则会报错，会报“记录重复不能重复创建”
             * 所以要在跳转下一页之前将当前页面变成历史编辑页面状态，这样在下一页返回来时，该页面变成编辑状态，则可再次编辑提交进入下一创建子用户群表单页面
             */
            this.props.history.replace({
              pathname: `/group-manage/analysis-bi/${response.userGroupId}/${response.historyId}?historyName=${encodeURIComponent(encodeURIComponent(this.props.form.getFieldValue('historyName')))}`,
              params: {
                userGroupId: response.userGroupId,
                historyId: response.historyId
              }
            })
            /**
             * 保存并创建逻辑
             * 跳转新增子群表单页面
             */
            this.props.history.push({
              pathname: `/group-manage/add/${response.userGroupId}/${response.historyId}`,
              params: {
                userGroupId: response.userGroupId,
                historyId: response.historyId
              }
            })
            this.handleCancel()
          } else if (this.props.type === 'create') {
            /**
             * 保存分析记录逻辑
             * 关闭弹窗
             */
            this.handleCancel()
          }
        }).catch(response => {
          let errMsg = (response.data && response.data.Result.errMsg) || '请联系管理员'
          notification['error']({
            message: '提交失败',
            description: errMsg
          })
        })
          .finally(() => {
            this.setState({ 'loading': false })
          })
      }
    })
  }

  /**
   * 点击取消
   */
  handleCancel() {
    this.hide()
  }
  
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title='创建分析结果'
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key='back' onClick={this.handleCancel}>
            取消
          </Button>,
          <Button key='submit' type='primary' loading={this.state.loading} onClick={this.handleOk}>
            确定
          </Button>
        ]}
      >
        <Form>
          <Form.Item label='分析名称'>
            {getFieldDecorator('historyName', {
              rules: [{ required: true, message: '请输入分析记录名称', whitespace: true }]
            })(<Input autocomplete='off' placeholder='不超过20个字符' maxlength='20' />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default Form.create()(AnalysisBiButton)