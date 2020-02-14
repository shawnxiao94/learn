/**
  * description: 新增 用户子群
  * author: William
  */
import React, { Component } from 'react'
import { Card, Row, Col, message, notification, Spin } from 'antd'
import Form from './Form'
import * as api from '@/modules/UserPortrait/data/api/GroupManage/Add'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
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
class Add extends Component {
  static contextTypes = {
    // 刷新列表
    refreshGroupManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      // 用户群ID
      userGroupId: (this.props.location.params && this.props.location.params.userGroupId) || this.props.match.params.userGroupId,
      // 历史记录ID
      historyId: (this.props.location.params && this.props.location.params.historyId) || this.props.match.params.historyId,
      // 选择标签
      selectedData: [],
      // 共享用户开始日期
      effDate: '',
      // 共享用户结束日期
      expDate: '',
      form: {
        beginEndDate: {
          value: []
        },
        desc: {
          value: ''
        },
        effDate: {
          value: ''
        },
        expDate: {
          value: ''
        },
        historyId: {
          value: ''
        },
        name: {
          value: ''
        },
        parentId: {
          value: ''
        },
        selectLabel: {
          value: []
        },
        tagIds: {
          value: []
        }
      },
      SelectedTag: {
        pageNumber: 1,
        pageSize: 50,
        userGroupId: '',
        historyId: ''
      }
    }
    this.getSelectedTag = this.getSelectedTag.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.getSelectedTag()
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
  getSelectedTag() {
    this.setState({ 'loading': true })
    this.setState({
      SelectedTag: Object.assign(this.state.SelectedTag,
        { userGroupId: this.state.userGroupId,
          historyId: this.state.historyId
        })
    })
    api.getSelectedTag(this.state.SelectedTag).then(res => {
      this.setState({
        'selectedData': res.Result.data.pageResult.content,
        'effDate': res.Result.data.effDate,
        'expDate': res.Result.data.expDate
      })
    }).catch(() => {
      message.error('获取选择标签失败!')
    }).finally(() => {
      this.setState({ 'loading': false })
    })
  }
  handleSubmit() {
    this.setState({
      'loading': true,
      'form': Object.assign(this.state.form, {
        parentId: { value: this.state.userGroupId },
        historyId: { value: this.state.historyId },
        selectLabel: { value: this.state.selectedData }
      })
    })
    /**
     * 新增
     */
    api.addSubGroup(this.state.form).then(response => {
      const self = this
      notification['success']({
        message: '保存成功',
        description:
            '请到用户群管理列表查看',
        onClose() {
          self.props.history.push({ pathname: '/group-manage' })
          self.context.refreshGroupManage()
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
  };
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
                selectedData={this.state.selectedData}
                effDate={this.state.effDate}
                expDate={this.state.expDate}
              />
            </Col>
          </Row>
        </Card>
      </Spin>
    )
  }
}
export default Add