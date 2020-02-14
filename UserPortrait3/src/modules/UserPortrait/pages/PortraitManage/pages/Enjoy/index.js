import React, { Component } from 'react'
import { Card, Row, Col, notification, Spin } from 'antd'
import { inject } from 'mobx-react'
import { addEnjoyData, queryChannel } from '@/modules/UserPortrait/data/api/PortraitManage/Enjoy'
import { getQueryString } from '@/common/utils/index'
import Form from './Form'
/**
 * 表单布局
 */
let formItemLayout =
    {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        xxl: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
        xxl: { span: 19 }
      }
    }
let tailFormItemLayout =
    {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 17,
          offset: 7
        },
        xxl: {
          span: 19,
          offset: 5
        }
      }
    }
    
@inject('Permission')
class Enjoy extends Component {
  constructor(props) {
    super(props)
    let id = (this.props.location.params && this.props.location.params.id) || this.props.match.params.id
    let portraitName = decodeURIComponent(getQueryString('portraitName'))
    this.state = {
      portraitName: portraitName,
      startDate: decodeURIComponent(getQueryString('startDate')),
      endDate: decodeURIComponent(getQueryString('endDate')),
      loading: false,
      options: {
        channelOptions: []
      },
      form: {
        // 共享值
        channelCodes: {
          value: []
        },
        desc: {
          value: ''
        },
        lableBeginEndDate: {
          value: ''
        },
        name: {
          value: ''
        },
        protraitId: {
          value: id
        },
        // 分享渠道
        shareChannelCode: {
          value: this.props.Permission.loginedChannel.code
        },
        tagIds: {
          value: []
        }
      }
    }
    // 双向绑定数据
    this.handleFormChange = this.handleFormChange.bind(this)
    // 提交
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.queryChannel()
  }

  /**
   * 渠道来源
   */
  queryChannel() {
    this.setState({ 'loading': true })
    queryChannel({})
      .then(res => {
        // 设置渠道数据
        this.setState(({ options }) => ({ options: { ...options, channelOptions: res.Result.data } }))
      })
      .catch()
      .finally(() => {
        this.setState({ 'loading': false })
      })
  };
  
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
   * 画像提交
   */
  handleSubmit() {
    let self = this
    addEnjoyData(self.state.form)
      .then(() => {
        // 成功
        notification['success']({
          message: '提示',
          description:
            '保存成功',
          onClose() {
            self.props.history.push({ pathname: '/portrait-manage' })
          }
        })
      })
      .catch(res => {
        let errMsg = (res.data.Result && res.data.Result.errMsg) || '请联系管理员'
        notification['error']({
          message: '保存失败',
          description: errMsg
        })
      })
      .finally(() => {})
  };

  render() {
    return (
      <Spin spinning={this.state.loading}>
        <Card bordered={false}>
          <Row gutter={16} style={{ 'margin-top': '24px' }}>
            <Col span={24}>
              <Form
                {...this.state.form}
                fields={Object.keys(this.state.form)}
                handleSubmit={this.handleSubmit}
                onChange={this.handleFormChange}
                formItemLayout={formItemLayout}
                tailFormItemLayout={tailFormItemLayout}
                portraitName={this.state.portraitName}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                channelOptions={this.state.options.channelOptions}
              />
            </Col>
          </Row>
        </Card>
      </Spin>
    )
  }
}
export default Enjoy