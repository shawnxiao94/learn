/**
  * description: 附带页脚的时间组件统一
  * author: ykk
  */
import React, { Component } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import './index.less'
 
const { RangePicker } = DatePicker
class CalendarRangePicker extends Component {
  constructor(props) {
    super(props)
    let end = moment()
      .startOf('day')
      .subtract(1, 'days')
    let start = moment(end)
      .subtract(30, 'days')
    this.state = {
      data: null,
      pickerValue: [start, end],
      selected: '',
      addYear: '',
      subYear: ''
    }
    this.handleRangePickerChange = this.handleRangePickerChange.bind(this)
    this.handPanelChange = this.handPanelChange.bind(this)
    this.disabledDate = this.disabledDate.bind(this)
  }
  componentDidUpdate() {
  }
 
  componentWillReceiveProps() {
  }
  /**
   * 时间范围控制
   */
  disabledDate = current => {
    return this.props.disabledDate(current)
  }
  handleRangePickerChange(value) {
    this.setState({ pickerValue: value }, () => {
      this.props.handleRangePickerChange(value)
    })
  }
  handPanelChange(value) {
    this.props.handPanelChange(value)
  }
  render() {
    return (
      <RangePicker
        value={this.state.pickerValue}
        onChange={ value => this.handleRangePickerChange(value) }
        disabledDate={ this.disabledDate}
        onCalendarChange={ value => this.handPanelChange(value)}
        format={'YYYY-MM-DD'}
        ranges={{
          '最近一周': [moment().add(-7, 'day'), moment().endOf('day')],
          '最近14天': [moment().add(-14, 'day'), moment().endOf('day')],
          '最近1月': [moment().add(-1, 'months'), moment().endOf('day')],
          '最近三个月': [moment().add(-3, 'months'), moment().endOf('day')],
          '最近半年': [moment().add(-6, 'months'), moment().endOf('day')],
          '最近一年': [moment().add(-1, 'years'), moment().endOf('day')]
        }}
      />
    )
  }
}
 
export default CalendarRangePicker
 