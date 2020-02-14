import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Select,
  Spin,
  DatePicker
  , message } from 'antd'
import moment from 'moment'
/**
 * API 获取标签类别
 */
import * as api from '@/modules/UserPortrait/data/api/LabelManage/Add'
import PropTypes from 'prop-types'
const { RangePicker } = DatePicker
const { TextArea } = Input
const { Option } = Select
class LabelForm extends Component {
  static contextTypes = {
    // 是否为编辑
    isEdit: PropTypes.bool
  }
  constructor(props) {
    super(props)
    this.state = {
      /**
       * 下拉选项
       */
      options: {
        // 标签类别
        categroys: []
      },
      /**
       * loadings
       */
      loadings: {
        // 获取标签列表数据loading
        categroys: true
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  /**
   * 获取该页面所需数据
   * api.queryCategory 获取标签类别
   */
  getData() {
    this.setState(({ loadings }) => {
      return {
        loadings: {
          ...loadings,
          categroys: true
        }
      }
    })
    api.queryCategory({ tagCategoryReq: { vagueName: '' } }).then(response => {
      this.setState(
        ({ options }) => (
          {
            options: { ...options, categroys: response.categroys }
          }
        )
      )
    }).catch(() => {
      message.error('获取标签类别失败!')
    })
      .finally(() => {
        this.setState(({ loadings }) => {
          return {
            loadings: {
              ...loadings,
              categroys: false
            }
          }
        })
      })
  }

  /**
   * 提交
   */
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit()
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <React.Fragment>
        <Form
          onSubmit={this.handleSubmit}
          {...this.props.formItemLayout}
          style={{ 'margin': 'auto' }}
          className='c-form'
        >
          <Form.Item label='标签名' colon={false}>
            {getFieldDecorator('tagName', {
              rules: [
                {
                  required: true,
                  message: '请输入标签名称'
                }
              ]
            })(
              <Input
                maxlength='25'
                placeholder='不超过25个字'
                allowClear
                disabled={this.context.isEdit}
                autocomplete='off'
              />
            )}
          </Form.Item>
          <Form.Item label='标签来源' colon={false}>
            <div>
              {this.props.channelCode && this.props.channelCode.label}
            </div>
          </Form.Item>
          <Form.Item label='标签类别' colon={false}>
            <Spin spinning={this.state.loadings.categroys}>
              {getFieldDecorator('tagCategoryId', {
                rules: [
                  {
                    required: true,
                    message: '请选择标签类别'
                  }
                ]
              })(
                <Select
                  placeholder='请选择标签类别'
                  allowClear
                  disabled={this.context.isEdit}
                >
                  {this.state.options.categroys.map(
                    (item, index) => <Option value={item.id} key={item.id}>{item.categoryName}</Option>)}
                </Select>
              )}
            </Spin>
          </Form.Item>
          <Form.Item label='标签有效期' colon={false}>
            {getFieldDecorator('lableBeginEndDate', {
              rules: [
                {
                  required: true,
                  message: '请选择标签有效期'
                }
              ]
            })(
              <RangePicker
                // 新增标签不能选择过去时间
                disabledDate={current => {
                  return current && current < moment().startOf('day')
                }}
                format={'YYYY/MM/DD'}
              />
            )}
          </Form.Item>
          <Form.Item label='标签说明' colon={false}>
            {getFieldDecorator('tagDesc', {
            })(
              <TextArea
                rows={4}
                allowClear
                maxlength='200'
                placeholder='不超过200个字'
              />
            )}
          </Form.Item>
          <Form.Item {...this.props.tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
            保存
            </Button>
            <Button style={{ 'margin-left': '16px' }} onClick={() => {
              window.history.back()
            }}
            >
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
})(LabelForm)