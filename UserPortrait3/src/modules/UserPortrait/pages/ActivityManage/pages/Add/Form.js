import React, { Component } from 'react'
import { Form, Button, Select, Input, DatePicker, message, Spin } from 'antd'
import { inject, observer } from 'mobx-react'
import * as api from '@/modules/UserPortrait/data/api/ActivityManage/Add'
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

@inject('PagesApi')
@inject('Permission')
@observer
class ActivityAddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      /**
       * loadings
       */
      loadings: {
        sourceOptions: false,
        getUserGroups: false
      },
      // 当前渠道code
      currentChannel: this.props.Permission.loginedChannel.code,
      options: {
        sourceOptions: [
          { channelCode: '01', channelName: '车享家' },
          { channelCode: '02', channelName: '享道' },
          { channelCode: '03', channelName: '环球车享' },
          { channelCode: '04', channelName: '大通' },
          { channelCode: '05', channelName: '乘用车' }
        ],
        markChannelOptions: [
          { name: 'App', code: '10001' },
          { name: 'Web', code: '10002' },
          { name: 'Phone', code: '10003' },
          { name: 'SMS', code: '10004' },
          { name: 'WeChat', code: '10005' }
        ],
        baseUserGroupOptions: []
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getNewSource = this.getNewSource.bind(this)
    this.isDisabled = this.isDisabled.bind(this)
  }
  /**
   * 组件生命周期挂载钩子
   */
  componentDidMount() {
    this.getSourceData()
    this.queryBaseUserGroup()
    this.getNewSource()
    this.isDisabled()
    if (this.state.currentChannel !== '00') {
      this.props.form.setFieldsValue({ 'activeInitiator': this.state.currentChannel })
    } else {
      this.props.form.resetFields(['activeResponderList'])
    }
  }
  /**
   * 提交
   */
  handleSubmit(e) {
    e && e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit()
      }
    })
  }
  /**
   * 获取用户群列表
   */
  queryBaseUserGroup() {
    this.setState(({ loadings }) => ({ loadings: { ...loadings, getUserGroups: true } }))
    api.queryBaseUserGroup({}).then(res => {
      this.setState({
        options: Object.assign(this.state.options, { baseUserGroupOptions: res })
      })
    }).catch(() => {
      message.error('获取用户群列表失败!')
    }).finally(() => {
      this.setState(({ loadings }) => ({ loadings: { ...loadings, getUserGroups: false } }))
    })
  }
  getSourceData() {
    const { FromSelect, getFromSelect } = this.props.PagesApi
    /**
     * 获取下拉数据
     * 判断mobx仓库里是否加载过下拉数据，如果没有则加载
     */
    if (FromSelect.length < 1) {
      this.setState(({ loadings }) => ({ loadings: { ...loadings, sourceOptions: true } }))
      getFromSelect().finally(() => {
        this.setState(({ loadings }) => ({ loadings: { ...loadings, sourceOptions: false } }))
      })
    }
  }
  getNewSource() {
    const { FromSelect = [] } = this.props.PagesApi
    let _FromSelect = FromSelect.filter(item => {
      return item.channelCode !== '00'
    })
    let _newSource = _FromSelect.map(item => {
      item = Object.assign({}, item, { disabled: false })
      return item
    })
    return _newSource
  }
  /**
   * 登录渠道为非集团时，活动发起方为本渠道且不能选择其他渠道，则活动响应方本渠道禁用
   */
  isDisabled() {
    let newSource = this.state.options.sourceOptions.map(item => {
      item = Object.assign({}, item, { disabled: false })
      return item
    })
    let _newSource = newSource.map(item => {
      if (this.state.currentChannel === item.channelCode) {
        item.disabled = true
      } else {
        item.disabled = false
      }
      return item
    })
    this.setState({
      options: Object.assign(this.state.options, {
        sourceOptions: _newSource
      })
    })
  }
  /**
   * 活动发起方选择渠道触发onchange事件
   */
  handleInitiatorChange(val) {
    let newSource = this.getNewSource()
    if (val) {
      let _newSource = newSource.map(item => {
        if (val === item.channelCode) {
          item.disabled = true
        } else {
          item.disabled = false
        }
        return item
      })
      this.setState({
        options: Object.assign(this.state.options, {
          sourceOptions: _newSource
        })
      })
    }
    let resValue = this.props.form.getFieldValue('activeResponderList')
    if (val === resValue) {
      this.props.form.resetFields(['activeResponderList'])
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let _newSource = this.getNewSource()
    let baseUserGroupIds = this.props.form.getFieldValue('baseUserGroupIds')
    let oldUserGroupIds = this.props.baseUserGroupIds.oldValue
    let oldBeginEndDate = this.props.lableBeginEndDate.oldValue
    return (
      <React.Fragment>
        <Form
          {...this.props.formItemLayout}
          onSubmit={this.handleSubmit}
          style={{ margin: 'auto' }}
          className='c-form'
        >
          <Form.Item label='活动发起方' colon={false}>
            <Spin spinning={this.state.loadings.sourceOptions} >
              {getFieldDecorator('activeInitiator', {
                rules: [{ required: true, message: '请选择活动发起方!' }]
              })(
                <Select
                  placeholder='请选择'
                  allowClear
                  disabled={this.props.isEdit || (this.state.currentChannel !== '00')}
                  onChange={this.handleInitiatorChange.bind(this)}
                >
                  {_newSource.map(item => (
                    <Option value={item.channelCode} disabled={item.disabled} key={item.channelCode}>{item.channelName}</Option>
                  ))}
                </Select>
              )}
            </Spin>
          </Form.Item>
          <Form.Item label='活动响应方' colon={false}>
            <Spin spinning={this.state.loadings.sourceOptions} >
              {getFieldDecorator('activeResponderList', {
                rules: [{ required: true, message: '请选择活动响应方!' }]
              })(
                <Select
                  placeholder='请选择'
                  allowClear
                  disabled={this.props.isEdit}
                >
                  {this.state.options.sourceOptions.map(item => (
                    <Option value={item.channelCode} disabled={item.disabled} key={item.channelCode}>{item.channelName}</Option>
                  ))}
                </Select>
              )}
            </Spin>
          </Form.Item>
          <Form.Item label='营销渠道' colon={false}>
            {getFieldDecorator('markChannelList', {
              rules: [{ required: true, message: '请选择营销渠道!' }]
            })(
              <Select
                mode='multiple'
                showArrow='true'
                placeholder='请选择'
                allowClear
                disabled={this.props.isEdit}
              >
                {this.state.options.markChannelOptions && this.state.options.markChannelOptions.map(item => (
                  <Option value={item.code} key={item.code}>{item.name}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label='活动名称' colon={false}>
            {getFieldDecorator('markName', {
              rules: [{ required: true, message: '请输入活动名称!', whitespace: true }]
            })(<Input autocomplete='off' placeholder='不超过50个字符' maxlength='50' disabled={this.props.isEdit} />)}
          </Form.Item>
          <Form.Item
            label='关联用户群'
            colon={false}
            extra='注：已过滤掉失效与未统计出来的用户群'
          >
            <Spin spinning={this.state.loadings.getUserGroups} >
              {getFieldDecorator('baseUserGroupIds')(
                <Select
                  mode='multiple'
                  showArrow='true'
                  placeholder='请选择关联用户群'
                  allowClear
                  disabled={(oldUserGroupIds && oldUserGroupIds.length > 0) && this.props.isEdit}
                >
                  {this.state.options.baseUserGroupOptions.map(item => (
                    <Option value={item.id} key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              )}
            </Spin>
          </Form.Item>
          {(baseUserGroupIds && baseUserGroupIds.length > 0) && <Form.Item label='活动有效期' colon={false}>
            {getFieldDecorator('lableBeginEndDate', {
              rules: [
                { type: 'array', required: true, message: '请输入活动有效期!' }
              ]
            })(<RangePicker disabled={(oldBeginEndDate && oldBeginEndDate.length > 0) && this.props.isEdit} />)}
          </Form.Item>}
          <Form.Item
            colon={false}
            label='备注'>
            {getFieldDecorator('remark')(
              <TextArea
                autoSize={{ minRows: 9, maxRows: 9 }}
                placeholder='不超过200个字符'
                maxLength='200'
              />)
            }
          </Form.Item>
          <Form.Item {...this.props.tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
                  保存
            </Button>
            <Button style={{ 'margin-left': '16px' }} onClick={() => {
              window.history.back()
            }}>
                  取消
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    )
  }
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    let fields = {}
    props.fields.forEach(key => {
      fields[key] = Form.createFormField({
        ...props[key],
        value: props[key].value
      })
    })
    return fields
  }
})(ActivityAddForm)