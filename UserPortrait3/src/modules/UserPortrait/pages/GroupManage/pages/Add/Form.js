import React, { Component } from 'react'
import {
  Form,
  Input,
  DatePicker,
  Button
} from 'antd'
const { RangePicker } = DatePicker
const { TextArea } = Input

class GroupManageAddForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateDisable = this.handleDateDisable.bind(this)
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
  handleDateDisable(current) {
    let arr = []
    let arr2 = []
    this.props.selectedData.forEach(item => {
      arr.push(item.effDate)
      arr2.push(item.expDate)
    })
    let maxN = Math.max.apply(null, arr)
    let minN = Math.min.apply(null, arr2)
    let _effDate = this.props.effDate
    let _expDate = this.props.expDate
    let oneDayTime = 24 * 60 * 60 * 1000
    if (maxN >= minN) {
      this.setState({
        pickerDisabled: true
      })
    } else {
      if (maxN < _effDate && _expDate < minN) {
        return (current && current < _effDate) || (current && (_expDate + oneDayTime) < current)
      } else if (maxN < _effDate && _expDate > minN) {
        return (current && current < _effDate) || (current && (minN + oneDayTime) < current)
      } else if (maxN >= _effDate && _expDate < minN) {
        return (current && current < maxN) || (current && (_expDate + oneDayTime) < current)
      } else if (maxN >= _effDate && _expDate > minN) {
        return (current && current < maxN) || (current && (minN + oneDayTime) < current)
      }
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <React.Fragment>
        <Form
          {...this.props.formItemLayout}
          onSubmit={this.handleSubmit}
          style={{ margin: 'auto' }}
          className='c-form'
        >
          <Form.Item label={
            <span className='ant-form-item-required'>
              选择标签
            </span>
          }>
            <div className='c-ant-tag-theme-a detail-tags-group'>
              {this.props.selectedData.map((item, index) => (
                <div
                  className='w-tags-theme-selected w-tags-theme-selected-active' key={index}
                  style={{ 'display': 'inline-flex', 'margin': '8px 16px 8px 0' }}>
                  <div className='w-tags-theme-selected-label ellipsis' title={item.tagName}>
                    {item.tagName}
                  </div>
                </div>
              ))}
            </div>
          </Form.Item>
          <Form.Item label='用户群名称'>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入用户群名称，不超过20个字', whitespace: true }]
            })(<Input autocomplete='off' placeholder='不超过50个字符' maxlength='50' />)}
          </Form.Item>
          <Form.Item
            colon={false}
            label='用户群有效期'
            extra='注：用户群有效期需要在所有标签和共享用户有效期范围之内'
          >
            {getFieldDecorator('beginEndDate', {
              rules: [
                { type: 'array', required: true, message: '请输入说明, 不超过200字!' }
              ]
            })(<RangePicker disabledDate={this.handleDateDisable} />)}
          </Form.Item>
          <Form.Item
            colon={false}
            label='用户群说明'>
            {getFieldDecorator('desc')(
              <TextArea
                autoSize={{ minRows: 9, maxRows: 9 }}
                placeholder='请输入画像说明'
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
            <Button style={{ 'margin-left': '16px' }} onClick={() => {
              window.history.back()
            }}>
              返回上一步
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
})(GroupManageAddForm)