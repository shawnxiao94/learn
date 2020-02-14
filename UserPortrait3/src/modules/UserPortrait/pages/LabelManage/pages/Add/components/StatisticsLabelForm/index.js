import React, { Component } from 'react'
import { notification } from 'antd'
import Form from './Form'
import { withRouter } from 'react-router-dom'
/**
 * API
 * addTagAndTagRule 新增统计型标签
 */
import * as api from '@/modules/UserPortrait/data/api/LabelManage/Add/StatisticsLabelForm'
import { formatStatisticsTagsResponse } from '@/modules/UserPortrait/data/api/LabelManage/Add/StatisticsLabelForm/utils/formatParams'
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'

@withRouter
@inject('Root')
@inject('Permission')
class StatisticsLabelForm extends Component {
  static contextTypes = {
    // 刷新列表
    refreshLabelManage: PropTypes.func,
    // 是否为编辑
    isEdit: PropTypes.bool
  }
  constructor(props) {
    super(props)
    const _dataKeys = this.props.Permission.allKeys.dataKeys
    this.state = {
      loading: false,
      form: {
        // 标签类别
        tagCategoryId: {
          value: undefined
        },
        // 标签名称
        tagName: {
          value: ''
        },
        // 标签说明
        tagDesc: {
          value: ''
        },
        // 起止日期
        lableBeginEndDate: {
          value: []
        },
        // 设置标签类型
        tagType: {
          value: 'statistical'
        },
        // 设置渠道
        channelCode: {
          value: _dataKeys.length > 1 ? '' : _dataKeys[0].code,
          label: _dataKeys.length > 1 ? '集团' : _dataKeys[0].name
        },
        // 默认值
        codeStatus: {
          value: 'PAS0100'
        },
        // 表达式
        expression: {
          value: []
        },
        expressionEdit: {
          value: undefined
        },
        // 表达式说明
        expressionLabel: {
          value: undefined
        },
        // ID
        id: {
          value: undefined
        }
      }
    }
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSetForm = this.handleSetForm.bind(this)
  }

  componentDidMount() {
    this.handleSetForm()
  }

  componentWillReceiveProps(nextProps) {
    // 如果为编辑，并且获取到数据
    if (this.props.data !== nextProps.data && this.props.isEdit) {
      this.handleSetForm(formatStatisticsTagsResponse(nextProps.data).form)
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
    const submitApi = this.context.isEdit ? api.updateTagAndRule : api.addTagAndTagRule
    submitApi(this.state.form).then(response => {
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
      let errMsg = (response.data.Result && response.data.Result.errMsg) || '请联系管理员'
      notification['error']({
        message: '保存失败',
        description: errMsg
      })
    })
      .finally(() => {
        this.setState({ 'loading': false })
      })
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
    )
  }
}
export default StatisticsLabelForm