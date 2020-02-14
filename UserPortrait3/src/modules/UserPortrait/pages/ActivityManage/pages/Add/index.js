/**
  * description: 活动管理 - 新增
  * author: Cathy
  */
import React, { Component } from 'react'
import { Card, Row, Col, Spin, notification } from 'antd'
import Form from './Form'
import * as api from '@/modules/UserPortrait/data/api/ActivityManage/Add'
import { queryParentActivityById } from '@/modules/UserPortrait/data/api/ActivityManage/index'
import { formatActivityManageResponse } from '@/modules/UserPortrait/data/api/ActivityManage/Add/utils/formatParams'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
    xxl: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
    xxl: { span: 21 }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 20,
      offset: 4
    },
    xxl: {
      span: 21,
      offset: 3
    }
  }
}
@withRouter
@inject('CRouteCrumb')
@inject('Root')
@inject('Permission')
class Add extends Component {
  static contextTypes = {
    // 刷新列表
    refreshActivityManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    let id = (this.props.location.params && this.props.location.params.id) || this.props.match.params.id
    this.state = {
      form: {
        // 活动发起方
        activeInitiator: {
          value: undefined
        },
        // 活动响应方
        activeResponderList: {
          value: undefined
        },
        // 关联用户群ID
        baseUserGroupIds: {
          value: [],
          oldValue: []
        },
        // ID
        id: {
          value: ''
        },
        // 营销渠道
        markChannelList: {
          value: undefined
        },
        // 活动开始时间
        markStartTime: {
          value: ''
        },
        // 活动结束时间
        markEndTime: {
          value: ''
        },
        // 活动name
        markName: {
          value: ''
        },
        // 备注
        remark: {
          value: ''
        },
        // 活动有效期
        lableBeginEndDate: {
          value: [],
          oldValue: []
        }
      },
      data: undefined,
      // 编辑ID
      id: id,
      // 是否为编辑页面
      isEdit: !!id,
      // loading
      loading: false
    }
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSetForm = this.handleSetForm.bind(this)
  }

  /**
   * 页面初始化
   */
  componentWillMount() {
    if (this.state.isEdit) {
      this.props.CRouteCrumb.setLabel('活动编辑')
      this.setEditFormData()
    }
  }
  /**
   * 组件生命周期挂载钩子
   */
  componentDidMount() {
    this.handleSetForm()
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

  handleSubmit() {
    this.setState({
      'loading': true
    })
    if (this.state.form.id && this.state.form.id.value) {
      /**
       *  编辑
       */
      api.updateActivity(this.state.form).then(response => {
        const self = this
        notification['success']({
          message: '编辑成功',
          description:
            '请到活动管理列表查看',
          onClose() {
            self.props.history.push({ pathname: '/activity-manage' })
            self.context.refreshActivityManage()
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
      api.addActivity(this.state.form).then(response => {
        const self = this
        notification['success']({
          message: '保存成功',
          description:
            '请到活动管理列表查看',
          onClose() {
            self.props.history.push({ pathname: '/activity-manage' })
            self.context.refreshActivityManage()
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
   *  编辑时数据回显
   */
  setEditFormData() {
    this.setState({ loading: true })
    queryParentActivityById({ actId: this.state.id }).then(response => {
      this.setState(() => {
        this.handleSetForm(formatActivityManageResponse(response).form)
      })
    }).catch()
      .finally(() => {
        this.setState({ loading: false })
      })
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
          ...form
        }
      }
    })
  }

  render() {
    return (
      <Spin spinning={this.state.loading} >
        <Card bordered={false}>
          <Row gutter={16} style={{ 'margin-top': '24px' }}>
            <Col span={24}>
              <Form
                onChange={this.handleFormChange}
                loading={this.state.loading}
                formItemLayout={formItemLayout}
                tailFormItemLayout={tailFormItemLayout}
                {...this.state.form}
                ref={Form => { this.Form = Form }}
                handleSubmit={this.handleSubmit}
                handleSetForm={this.handleSetForm}
                fields={Object.keys(this.state.form)}
                isEdit={this.state.isEdit}
              />
            </Col>
          </Row>
        </Card>
      </Spin>
    )
  }
}
export default Add