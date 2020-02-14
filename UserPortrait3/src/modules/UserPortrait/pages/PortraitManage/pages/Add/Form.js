import React, { Component } from 'react'
import moment from 'moment'
import {
  Form,
  Input,
  Button,
  DatePicker
} from 'antd'
/**
 * 选择标签表达式组件
 */
import SelectTagsModal from '@/modules/UserPortrait/components/Page/SelectionTagsGroup/SelectTagsModal'
const { RangePicker } = DatePicker
const { TextArea } = Input

const labelItemLayout = {
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
class PortraitAddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickerDisabled: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateDisable = this.handleDateDisable.bind(this)
  }
  /**
   * 提交
   */
  handleSubmit(e) {
    e && e.preventDefault()
    // this.handleDateDisable()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmit()
      }
    })
  }
  handleDateDisable(current) {
    let arr = []
    let arr2 = []
    this.props.form.getFieldValue('selectLabel').forEach(item => {
      arr.push(item.effDate)
      arr2.push(item.expDate)
    })
    let maxN = Math.max.apply(null, arr)
    let minN = Math.min.apply(null, arr2)
    // let startDate = moment(this.props.form.getFieldValue('selectLabel')[0]).startOf('day').valueOf()
    let today = moment().startOf('day').valueOf()
    let oneDayTime = 24 * 60 * 60 * 1000
    if (!this.props.isEdit) {
      if (maxN >= minN) {
        this.setState({
          pickerDisabled: true
        })
      } else {
        if (maxN < today && today < minN) {
          return (current && current < today) || (current && (minN + oneDayTime) < current)
        } else if (maxN >= today) {
          return (current && current < maxN) || (current && minN < current)
        }
      }
    }
  }
  render() {
    let selectLabel = this.props.form.getFieldValue('selectLabel') || []
    const { getFieldDecorator } = this.props.form
    return (
      <React.Fragment>
        <Form
          {...this.props.formItemLayout}
          onSubmit={this.handleSubmit}
          style={{ margin: 'auto' }}
          className='c-form'
        >
          <Form.Item
            extra='注：所选标签之间的关系为并且'
            colon={false}
            label='选择标签'
            {...labelItemLayout}
          >
            {getFieldDecorator('selectLabel', {
              rules: [{ required: true, message: '请选择标签!' }]
            })(
              <SelectTagsModal
                ref={SelectTagsModal => {
                  this.SelectTagsModal = SelectTagsModal
                }}
              />
            )}
            <div style={{ 'margin': '-4px 0 -4px 0' }}>
              {selectLabel.map(item => (
                <div
                  className='w-tags-theme-selected w-tags-theme-selected-active' key={item.id}
                  style={{ 'display': 'inline-flex', 'margin': '8px 0 8px 0' }}>
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
                  style={{ display: selectLabel.length ? 'none' : 'block' }}
                  onClick={() => { this.SelectTagsModal.show() }}>
                  添加
                </Button>
                <Button
                  icon='edit'
                  type='primary'
                  disabled={this.props.isEdit}
                  style={{ display: selectLabel.length ? 'block' : 'none' }}
                  onClick={() => { this.SelectTagsModal.show() }} />
              </div>
            </div>
          </Form.Item>
          <Form.Item
            colon={false}
            label='画像名称'
          >
            {getFieldDecorator('portraitName', {
              rules: [{ required: true, message: '请输入画像名称!', whitespace: true }]
            })(<Input autocomplete='off' placeholder='不超过50个字符' maxlength='50' />)}
          </Form.Item>
          <Form.Item
            extra='注：画像有效期需要在所有标签有效期之内，且开始时间不能等于结束时间'
            colon={false}
            label='画像有效期'
          >
            {getFieldDecorator('lableBeginEndDate', {
              rules: [
                { type: 'array', required: true, message: '请输入画像有效期!' }
              ]
            })(<RangePicker disabled={this.state.pickerDisabled} disabledDate={this.handleDateDisable} />)}
          </Form.Item>
          <Form.Item
            colon={false}
            label='画像说明'>
            {getFieldDecorator('description')(
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
})(PortraitAddForm)