import React, { Component } from 'react'
import { Card, Row, Col, notification, Spin } from 'antd'
import * as api from '@/modules/UserPortrait/data/api/PortraitManage/Add'
import { findByPortraitId } from '@/modules/UserPortrait/data/api/PortraitManage/Detail'
import { formatPortraitManageResponse } from '@/modules/UserPortrait/data/api/PortraitManage/Add/utils/formatParams'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'

import PropTypes from 'prop-types'
import Form from './Form'

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
    refreshPortraitManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    let id = (this.props.location.params && this.props.location.params.id) || this.props.match.params.id
    this.state = {
      form: {
        // 说明
        description: {
          value: ''
        },
        // 日期
        lableBeginEndDate: {
          value: [],
          oldValue: []
        },
        // 画像名称
        portraitName: {
          value: ''
        },
        // 标签集合
        selectLabel: {
          value: []
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
    this.handleSetForm = this.handleSetForm.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.handleSetForm()
  }
  /**
   * 页面初始化
   */
  componentWillMount() {
    if (this.state.isEdit) {
      this.props.CRouteCrumb.setLabel('画像编辑')
      this.setEditFormData()
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
          ...form
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

  handleSubmit() {
    this.setState({
      'loading': true
    })
    if (this.state.form.id && this.state.form.id.value) {
      /**
       *  编辑
       */
      api.submitUpdata(this.state.form).then(response => {
        const self = this
        notification['success']({
          message: '编辑成功',
          description:
            '请到画像管理列表查看',
          onClose() {
            self.props.history.push({ pathname: '/portrait-manage' })
            self.context.refreshPortraitManage()
          }
        })
      }).catch(response => {
        let errMsg = (response.data.Result && response.data.Result.errMsg) || '请联系管理员'
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
      api.submitData(this.state.form).then(response => {
        const self = this
        notification['success']({
          message: '保存成功',
          description:
            '请到画像管理列表查看',
          onClose() {
            self.props.history.push({ pathname: '/portrait-manage' })
            self.context.refreshPortraitManage()
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
  };
  /**
   *  编辑时数据回显
   */
  setEditFormData() {
    this.setState({ loading: true })
    findByPortraitId({ id: this.state.id }).then(response => {
      this.setState(() => {
        this.handleSetForm(formatPortraitManageResponse(response).form)
      })
    }).catch()
      .finally(() => {
        this.setState({ loading: false })
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