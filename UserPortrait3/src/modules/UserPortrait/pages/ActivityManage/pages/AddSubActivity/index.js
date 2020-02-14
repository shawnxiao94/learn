/**
  * description: 子活动管理 - 新增
  * author: Cathy
  */
import React, { Component } from 'react'
import { Card, Row, Col, Spin, notification } from 'antd'
import * as api from '@/modules/UserPortrait/data/api/ActivityManage/AddSubActivity'
import { querySubActivityById } from '@/modules/UserPortrait/data/api/ActivityManage/index'
import { formatSubActivityManageResponse } from '@/modules/UserPortrait/data/api/ActivityManage/AddSubActivity/utils/formatParams'
import Form from './Form'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
    xxl: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
    xxl: { span: 20 }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 19,
      offset: 5
    },
    xxl: {
      span: 20,
      offset: 4
    }
  }
}
@withRouter
@inject('CRouteCrumb')
@inject('Root')
@inject('Permission')
class AddSubActivity extends Component {
  static contextTypes = {
    // 刷新列表
    refreshActivityManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    let parentId = {}
    let id
    if (location.href.indexOf('?') != -1) {
      let _urlParams = location.href.split('?')[1]
      parentId[_urlParams.split('=')[0]] = _urlParams.split('=')[1]
    } else {
      let { params } = window.getRouterParams(this.props.location.pathname, '/activity-manage/add-sub-activity/:id')
      id = params.id
    }
    this.state = {
      form: {
        childUserGroupIds: {
          value: []
        },
        id: {
          value: ''
        },
        markChannelList: {
          value: []
        },
        markEndTime: {
          value: ''
        },
        markName: {
          value: ''
        },
        markStartTime: {
          value: ''
        },
        parentId: {
          value: parentId.parentId || ''
        },
        remark: {
          value: ''
        }
      },
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

  componentDidMount() {
    this.handleSetForm()
  }

  /**
   * 页面初始化
   */
  componentWillMount() {
    if (this.state.isEdit) {
      this.props.CRouteCrumb.setLabel('子活动编辑')
      this.setEditFormData()
    }
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
      api.updateChildActivity(this.state.form).then(response => {
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
      api.createChildActivity(this.state.form).then(response => {
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
    querySubActivityById({ actId: this.state.id }).then(response => {
      this.setState(() => {
        this.handleSetForm(formatSubActivityManageResponse(response).form)
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
                parentId={this.state.form.parentId.value}
              />
            </Col>
          </Row>
        </Card>
      </Spin>
    )
  }
}
export default AddSubActivity