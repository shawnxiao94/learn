import React, { Component } from 'react'
import { notification } from 'antd'
import Form from './Form'
import PropTypes from 'prop-types'
/**
 * 此组件防止this.props不为空
 */
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
/**
 * API
 * addTagAndTagRule 新增算法型标签
 */
import * as api from '@/modules/UserPortrait/data/api/LabelManage/Add/AlgorithmLabelForm'
import { formatAlgorithmTagsResponse } from '@/modules/UserPortrait/data/api/LabelManage/Add/AlgorithmLabelForm/utils/formatParams'

@withRouter
@inject('Root')
@inject('Permission')
class AlgorithmLabelForm extends Component {
  static contextTypes = {
    // 刷新列表
    refreshLabelManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    const _dataKeys = this.props.Permission.allKeys.dataKeys
    const algorithmId = (this.props.location.params && this.props.location.params.id) || this.props.match.params.id
    this.state = {
      loading: false,
      algorithmId: algorithmId,
      form: {
        // 设置标签类型
        tagType: {
          value: 'algorithm'
        },
        // 标签类型
        tagCategoryId: {
          value: undefined
        },
        // 标签名称
        tagName: {
          value: ''
        },
        // 标签备注
        tagDesc: {
          value: ''
        },
        // 设置渠道
        channelCode: {
          value: _dataKeys.length > 1 ? '' : _dataKeys[0].code,
          label: _dataKeys.length > 1 ? '集团' : _dataKeys[0].name
        },
        // 日期区间
        lableBeginEndDate: {
          value: []
        },
        // 默认值
        codeStatus: {
          value: 'PAS0100'
        }
      }
    }
    this.handleSetForm = this.handleSetForm.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.handleSetForm()
  }

  componentWillReceiveProps(nextProps) {
    // 如果为编辑，并且获取到数据
    if (this.props.data !== nextProps.data && this.props.isEdit) {
      this.handleSetForm(formatAlgorithmTagsResponse(nextProps.data).form)
    }
  }

  /**
   * 初始化Form值，配置额外参数
   */
  handleSetForm(params) {
    if (params) {
      // 如果有入参，则只设置入参
      this.setState(({ form }) => ({ form: { ...form, ...params } }))
      return
    }
    this.setState(({ form }) => {
      return {
        form: {
          ...form,
          // 设置用户名
          userName: {
            value: this.props.Root.userInfo.userName
          }
        }
      }
    })
  }

  /**
   * 该组件state form 与 内部表单域 双向绑定
   * 当内部表单域值改变触发覆盖state form数据
   * 会触发两次
   */
  handleFormChange(changedFields) {
    this.setState(({ form }) => ({
      form: { ...form, ...changedFields }
    }))
  }

  /**
   * 表单提交
   */
  handleSubmit() {
    this.setState({ 'loading': true })
    if (this.state.algorithmId) {
      /**
       *  编辑
       */
      api.updateAlgorithmLabel(this.state.form).then(response => {
        const self = this
        notification['success']({
          message: '编辑成功',
          description:
            '请到标签管理列表查看',
          onClose() {
            self.props.history.push({ pathname: '/label-manage' })
            self.context.refreshLabelManage()
          }
        })
      }).catch(response => {
        let errMsg = (response.data && response.data.Result.errMsg) || '请联系管理员'
        notification['error']({
          message: '编辑失败',
          description: errMsg
        })
      })
        .finally(() => {
          this.setState({ 'loading': false })
        })
    } else {
      /**
       * 新增
       */
      api.addAlgorithmLabel(this.state.form).then(response => {
        const self = this
        notification['success']({
          message: '保存成功',
          description:
            '请到标签管理列表查看',
          onClose() {
            self.props.history.push({ pathname: '/label-manage' })
            self.context.refreshLabelManage()
          }
        })
      }).catch(response => {
        let errMsg = (response.data && response.data.Result.errMsg) || '请联系管理员'
        notification['error']({
          message: '保存失败',
          description: errMsg
        })
      })
        .finally(() => {
          this.setState({ 'loading': false })
        })
    }
    
  }

  /**
   * {...this.state.form}
   * fields={Object.keys(this.state.form)}
   * 以上两种为固定样板写法,除form命名可更改其余不可写法变更
   *
   * formItemLayout 与 tailFormItemLayout 为表单布局
   */
  render() {
    return (
      <div>
        <Form
          onChange={this.handleFormChange}
          loading={this.state.loading}
          formItemLayout={this.props.formItemLayout}
          tailFormItemLayout={this.props.tailFormItemLayout}
          {...this.state.form}
          fields={Object.keys(this.state.form)}
          handleSubmit={this.handleSubmit}
          ref={Form => { this.Form = Form }}
          handleSetForm={this.handleSetForm}
        />
      </div>
    )
  }
}
export default AlgorithmLabelForm