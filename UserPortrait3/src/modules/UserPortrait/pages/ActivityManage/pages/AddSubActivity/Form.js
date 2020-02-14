import React, { Component } from 'react'
import { Form, Button, Select, Input, DatePicker, message, Spin } from 'antd'
import * as api from '@/modules/UserPortrait/data/api/ActivityManage/AddSubActivity'
import { inject, observer } from 'mobx-react'
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

@inject('PagesApi')
@inject('Permission')
@observer
class SubActivityAddForm extends Component {
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
      options: {
        markChannelOptions: [
          { name: 'App', code: '10001' },
          { name: 'Web', code: '10002' },
          { name: 'Phone', code: '10003' },
          { name: 'SMS', code: '10004' },
          { name: 'WeChat', code: '10005' }
        ],
        childUserGroupOptions: []
      },
      parentId: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.isEdit && (this.props.parentId !== nextProps.parentId)) {
      this.setState({ parentId: nextProps.parentId }, () => {
        this.queryChildUserGroup()
      })
    }
  }
  /**
   * 组件生命周期挂载钩子
   */
  componentDidMount() {
    this.getSourceData()
    if (!this.props.isEdit) {
      this.setState({ parentId: this.props.parentId }, () => {
        this.queryChildUserGroup()
      })
    }
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
   * 获取子用户群列表
   */
  queryChildUserGroup() {
    this.setState(({ loadings }) => ({ loadings: { ...loadings, getUserGroups: true } }))
    api.queryChildUserGroup({ actId: this.state.parentId }).then(res => {
      this.setState({
        options: Object.assign(this.state.options, { childUserGroupOptions: res })
      })
    }).catch(() => {
      message.error('获取子用户群列表失败!')
    }).finally(() => {
      this.setState(({ loadings }) => ({ loadings: { ...loadings, getUserGroups: false } }))
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { FromSelect = [] } = this.props.PagesApi
    let _FromSelect = FromSelect.filter(item => {
      return item.channelCode !== '00'
    })
    return (
      <React.Fragment>
        <Form
          {...this.props.formItemLayout}
          onSubmit={this.handleSubmit}
          style={{ margin: 'auto' }}
          className='c-form'
        >
          {this.props.isEdit && <Form.Item label='活动发起方' colon={false}>
            <Spin spinning={this.state.loadings.sourceOptions} >
              {getFieldDecorator('activeInitiator')(
                <Select
                  placeholder='请选择'
                  allowClear
                  disabled={true}
                >
                  {_FromSelect.map(item => (
                    <Option value={item.channelCode} key={item.channelCode}>{item.channelName}</Option>
                  ))}
                </Select>
              )}
            </Spin>
          </Form.Item>
          }
          {this.props.isEdit && <Form.Item label='活动响应方' colon={false}>
            <Spin spinning={this.state.loadings.sourceOptions} >
              {getFieldDecorator('activeResponderList')(
                <Select
                  placeholder='请选择'
                  allowClear
                  disabled={true}
                >
                  {_FromSelect.map(item => (
                    <Option value={item.channelCode} key={item.channelCode}>{item.channelName}</Option>
                  ))}
                </Select>
              )}
            </Spin>
          </Form.Item>
          }
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
          <Form.Item label='子活动名称' colon={false}>
            {getFieldDecorator('markName', {
              rules: [{ required: true, message: '请输入活动名称!', whitespace: true }]
            })(<Input autocomplete='off' placeholder='请输入活动名称，不超过50个字' maxlength='50' disabled={this.props.isEdit} />)}
          </Form.Item>
          <Form.Item
            label='关联子用户群'
            colon={false}
            extra='注：已过滤掉失效与未统计出来的子用户群'
          >
            <Spin spinning={this.state.loadings.getUserGroups} >
              {getFieldDecorator('childUserGroupIds', {
                rules: [{ required: true, message: '请选择子用户群!' }]
              })(
                <Select
                  mode='multiple'
                  showArrow='true'
                  placeholder='请选择关联子用户群'
                  allowClear
                  disabled={this.props.isEdit}
                >
                  {this.state.options.childUserGroupOptions.map(item => (
                    <Option value={item.id} key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              )}
            </Spin>
          </Form.Item>
          <Form.Item label='子活动有效期' colon={false}>
            {getFieldDecorator('lableBeginEndDate', {
              rules: [
                { type: 'array', required: true, message: '请输入子活动有效期!' }
              ]
            })(<RangePicker disabled={this.props.isEdit} />)}
          </Form.Item>
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
})(SubActivityAddForm)