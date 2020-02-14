import React, { Component } from 'react'
import moment from 'moment'
import {
  Form,
  Input,
  DatePicker,
  Checkbox,
  Button
} from 'antd'
/**
 * 选择标签表达式组件
 */
import SelectTagsModal from '@/modules/UserPortrait/components/Page/SelectionTagsGroup/SelectTagsModal'
const { RangePicker } = DatePicker
const CheckboxGroup = Checkbox.Group

class EnjoyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 全选
      checkAll: {
        // value
        value: false,
        // 半全选状态
        indeterminate: false,
        disabled: false
      }
    }
    // 提交
    this.handleSubmit = this.handleSubmit.bind(this)
    // 全选
    this.handleCheckAllChange = this.handleCheckAllChange.bind(this)
    // 选中
    this.handleChange = this.handleChange.bind(this)
    // 有效期
    this.handleDateDisable = this.handleDateDisable.bind(this)
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

  /**
   * 选中事件
   */
  handleChange(value) {
    this.setCheckAllStatus(value)
  };

  // 更新全选状态
  setCheckAllStatus(value) {
    // 选中数组
    let channelCodes = value || this.props.form.getFieldValue('channelCodes')
    // 全部数据
    let options = this.props.channelOptions
    if (options.length === channelCodes.length) {
      // 全部选中
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: true, indeterminate: false } }))
    } else if (channelCodes.length) {
      // 选中部分
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: false, indeterminate: true } }))
    } else {
      // 一个也没有选中
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: false, indeterminate: false } }))
    }
  }
    
  /**
   * 全选事件
   */
  handleCheckAllChange(e) {
    let value = e.target.checked
    if (value) {
      // 全选
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: true, indeterminate: false } }))
      this.props.form.setFieldsValue({ 'channelCodes': this.props.channelOptions.map(item => item.value) })
    } else {
      // 全部取消
      let channelCodes = this.selectedCanntEdit()
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: false, indeterminate: channelCodes.length } }))
      this.props.form.setFieldsValue({ 'channelCodes': channelCodes })
    }
  };

  /**
   * 选中过了就不能变更了
   */
  selectedCanntEdit() {
    return this.props.channelOptions.filter(item => item.disabled).map(item => item.value)
  }

  handleDateDisable(current) {
    let _startDate = Number(this.props.startDate)
    let _endDate = Number(this.props.endDate)
    let today = moment().startOf('day').valueOf()
    let oneDayTime = 24 * 60 * 60 * 1000
    if (_startDate < today && today < _endDate) {
      return (current && current < today) || (current && (_endDate + oneDayTime) < current)
    } else if (_startDate >= today) {
      return (current && current < _startDate) || (current && (_endDate + oneDayTime) < current)
    }
  }

  render() {
    // 选择标签
    let tagIds = this.props.form.getFieldValue('tagIds') || []
    // 选择渠道
    let channelCodes = this.props.form.getFieldValue('channelCodes') || []
    const { getFieldDecorator } = this.props.form
    return (
      <React.Fragment>
        <Form
          {...this.props.formItemLayout}
          onSubmit={this.handleSubmit.bind(this)}
          style={{ margin: 'auto' }}
          className='c-form'
        >
          <Form.Item
            colon={false}
            {...this.props.formItemLayout}
            label='共享画像名'
          >{this.props.portraitName}
          </Form.Item>
          <Form.Item
            colon={false}
            {...this.props.formItemLayout}
            label='用户群名称'
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入画像名称!', whitespace: true }]
            })(<Input
              placeholder='不超过25个字符'
              allowClear
              autocomplete='off'
              maxlength='25' />)}
          </Form.Item>
          <Form.Item
            extra='注：用户群有效期需要在画像有效期之内，且开始时间不能等于结束时间'
            colon={false}
            {...this.props.formItemLayout}
            label='用户群有效期'
          >
            {getFieldDecorator('lableBeginEndDate', {
              rules: [{ type: 'array', required: true, message: '请输入共享用户有效期!' }]
            })(<RangePicker disabledDate={this.handleDateDisable} />)}
          </Form.Item>
          <Form.Item
            colon={false}
            label='继续共享标签'
            {...this.props.formItemLayout}
          >
            {getFieldDecorator('tagIds')(
              <SelectTagsModal
                ref={SelectTagsModal => {
                  this.SelectTagsModal = SelectTagsModal
                }}
              />
            )}
            <div style={{ 'margin': '-4px 0' }}>
              {tagIds.map(item => (
                <div
                  className='w-tags-theme-selected w-tags-theme-selected-active' key={item.id}
                  style={{ 'display': 'inline-flex', 'margin': '8px 16px 8px 0' }}>
                  <div className='w-tags-theme-selected-label ellipsis' title={item.tagName}>
                    {item.tagName}
                  </div>
                </div>
              ))}
              <div
                style={{ 'margin': '8px 16px 8px 0' }}>
                <Button
                  icon='plus'
                  type='primary'
                  style={{ display: tagIds.length ? 'none' : 'block' }}
                  onClick={() => { this.SelectTagsModal.show() }}>
                  添加
                </Button>
                <Button
                  icon='edit'
                  type='primary'
                  disabled={this.props.isEdit}
                  style={{ display: tagIds.length ? 'block' : 'none' }}
                  onClick={() => { this.SelectTagsModal.show() }} />
              </div>
            </div>
          </Form.Item>
          <Form.Item
            colon={false} label='请选择共享的渠道'
            {...this.props.formItemLayout}>
            <div>
              <Checkbox
                onChange={this.handleCheckAllChange}
                indeterminate={this.state.checkAll.indeterminate}
                checked={this.state.checkAll.value}
              >
                全选
              </Checkbox>
            </div>
            {getFieldDecorator('channelCodes', {
              rules: [{ required: true, message: '请勾选渠道!' }]
            })(
              <CheckboxGroup
                onChange={this.handleChange}
                options={this.props.channelOptions}
              />
            )}
            {channelCodes.length > 0 && <div style={{ 'line-height': '1.2', 'margin-top': '10px' }}>
                您将把 <span className='primary-color'>
                {this.props.portraitName}
              </span> 所覆盖的用户数共享给 {
                channelCodes.map(item => {
                  return this.props.channelOptions.find(a => a.value === item).label
                }).join('，')
              }
            </div>}
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
})(EnjoyForm)