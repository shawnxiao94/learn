/**
 * description 日期，或者日期区间 插件
 * author: William
 */
import React, { PureComponent } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker
/**
 * 分隔符
 */
const SEPARATOR = ';'
class DateOrBetweenDate extends PureComponent {
  constructor(props) {
    super(props)
    let value
    if (this.props.value) {
      if (this.props.expressionLogicSymbol !== 'BETWEEN') {
        value = moment(this.props.value)
      } else {
        value = this.props.value.split(SEPARATOR).map(item => {
          return moment(item)
        })
      }
    }
    this.state = {
      /**
       * 值
       */
      value: value,
      disabledDate: undefined
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRangePickerChange = this.handleRangePickerChange.bind(this)
  }

  componentDidMount() {
    this.setExpressionValueRules()
    this.pagesLogic()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.expressionLogicSymbol !== nextProps.expressionLogicSymbol) {
      this.setState({
        value: undefined
      })
    }
  }

  setExpressionValueRules() {
    let rules = [
      {
        required: true,
        message: '不能为空!'
      }
    ]
    this.props.setExpressionValueRules(this.props.rowKey, rules)
  }

  /**
   * change
   */
  handleChange(value) {
    this.setState({ value })
    this.props.onChange(moment(value).format('YYYY-MM-DD'))
  }
  handleRangePickerChange(value) {
    this.setState({ value })
    this.props.onChange(value && value.map(item => {
      return moment(item).format('YYYY-MM-DD')
    }).join(SEPARATOR))
  }

  /**
   * 页面级逻辑，此处注意经常清理，查看是否有些页面去掉了对应代码要删掉
   */
  pagesLogic() {
    // 如果为出生日期则不能选择未来时间
    if (this.props.propertyCode === 'birthday') {
      let disabledDate = current => {
        return current && current > moment().endOf('day')
      }
      this.setState({ disabledDate: disabledDate })
    }
  }

  render() {
    let { expressionLogicSymbol } = this.props
    return (
      <React.Fragment>
        {
          expressionLogicSymbol !== 'BETWEEN' &&
          <DatePicker
            style={{ width: '100%' }}
            value={this.state.value}
            disabledDate={this.state.disabledDate}
            onChange={this.handleChange} />
        }
        {
          expressionLogicSymbol === 'BETWEEN' &&
        <div>
          <RangePicker
            style={{ width: '100%' }}
            value={this.state.value}
            disabledDate={this.state.disabledDate}
            onChange={this.handleRangePickerChange} />
        </div>
        }
      </React.Fragment>
    )
  }
}

export default DateOrBetweenDate
