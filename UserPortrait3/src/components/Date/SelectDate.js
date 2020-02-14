/**
 * 选择日期插件，支持按最近天数选择，按月份区间选择，按日期区间选择
 * @props {Object} value 插件值
 * @props {Function} onChange 变更事件
 */
import React, { Component } from 'react'
import { Select, DatePicker } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker
const { Option } = Select
class SelectDate extends Component {
  /**
   * 子组建state绑定父组件props的生命钩子
   */
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps && nextProps.value) {
      return {
        form: {
          ...(nextProps.value || {})
        }
      }
    }
    return null
  }
  constructor(props) {
    super(props)
    this.state = {
      form: {
        /**
         * 选择日期类型
         * @value cycle 按最近时间查询
         * @value months 按月份查询
         * @value dates 按日期区间查询
         * @value times 按时间区间查询
         */
        dateType: 'cycle',
        /**
         * 按最近时间查询值
         */
        cycle: '',
        /**
         * 日期区间
         */
        dates: []
      },
      options: {
        /**
         * 日期类型列表
         */
        dateTypeOptions: [
          {
            code: 'cycle',
            value: '按最近时间查询'
          },
          {
            code: 'months',
            value: '按月份查询'
          },
          {
            code: 'dates',
            value: '按日期区间查询'
          },
          {
            code: 'times',
            value: '按时间区间查询'
          }
        ].filter(item => {
          if (this.props.types) {
            return this.props.types.some(a => (item.code === a))
          } else {
            return true
          }
        }),
        /**
         * 最近时间列表
         */
        cycleOptions: [
          {
            code: '1',
            value: '昨天'
          },
          {
            code: '3',
            value: '近3天(不包含当天)'
          },
          {
            code: '7',
            value: '近7天(不包含当天)'
          },
          {
            code: '14',
            value: '近14天(不包含当天)'
          },
          {
            code: '30',
            value: '当月'
          },
          {
            code: '60',
            value: '上月'
          }
        ]
      },
      /**
       * 月分面板的显示
       */
      openPanel: false,
      panelSelectTime: 0
    }
    this.handOpenChange = this.handOpenChange.bind(this)
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    if (this.state.form.dateType === 'cycle') {
      this.triggerChange(this.dateCycleFormat(this.state.form.cycle || '1'))
    } else {
      this.triggerChange({ dates: this.state.form.dates || [] })
    }
  }
  /**
   * 当日期类型改变时触发
   */
  handleDateTypeChange(value, option) {
    this.triggerChange({
      dateType: value,
      cycle: value === 'cycle' ? '1' : '',
      dates: value === 'cycle' ? this.dateCycleFormat('1').dates : []
    })
  }

  /**
   * 按最近日期查询下拉改变触发
   */
  handleCycleChange(cycle, option) {
    this.triggerChange(this.dateCycleFormat(cycle))
  }

  /**
   * 按最近日期type换算实际日期
   */
  dateCycleFormat(cycle) {
    let start, end
    if (cycle === '1') {
      // 当天
      end = moment()
        .startOf('day')
        .subtract(1, 'days')
      start = moment(end)
    } else if (cycle === '3') {
      // 前三天
      end = moment()
        .startOf('day')
        .subtract(1, 'days')
                
      start = moment(end)
        .subtract(2, 'days')
                
    } else if (cycle === '7') {
      // 前一周
      end = moment()
        .startOf('day')
        .subtract(1, 'days')
                
      start = moment(end)
        .subtract(6, 'days')
                
    } else if (cycle === '14') {
      // 前14天
      end = moment()
        .startOf('day')
        .subtract(1, 'days')
                
      start = moment(end)
        .subtract(13, 'days')
                
    } else if (cycle === '30') {
      // 前一个月
      end = moment()
        .startOf('day')
                
      start = moment()
        .month(moment().month())
        .startOf('month')
                
    } else if (cycle === '60') {
      // 前两个月
      end = moment()
        .month(moment().month() - 1)
        .endOf('month')
                
      start = moment()
        .month(moment().month() - 1)
        .startOf('month')
                
    }
    return { dates: [start.startOf('day'), end.endOf('day')], cycle }
  }

  /**
   * 格式化年月日
   * 如按月，则start取当月1日，end取当月最后一天日
   */
  formatTypeDate(value, type) {
    if (value && value.length) {
      value = [value[0].startOf(type), value[1].endOf(type)]
    }
    return value
  }
  /**
   * 按月份区间值改变触发
   */
  handleMonthsChange(value) {
    this.triggerChange({ dates: this.formatTypeDate(value, 'month') })
  }
  handleMonthsPanelChange(value) {
    const _this = this
    this.setState({ panelSelectTime: _this.state.panelSelectTime + 1 })
    this.triggerChange({ dates: this.formatTypeDate(value, 'month') })
    if (this.state.form.dates.length === 2 && this.state.panelSelectTime === 1) {
      this.setState({ openPanel: false })
      this.setState({ panelSelectTime: 0 })
    }
  }
  handOpenChange = open => {
    this.setState({ panelSelectTime: 0 })
  }
  
  /**
   * 按日期区间值改变触发
   */
  handleDatesChange(value) {
    this.triggerChange({ dates: this.formatTypeDate(value, 'day') })
  }

  /**
   * 按时间区间值改变触发
   */
  handleTimesChange(value) {
    this.triggerChange({ dates: value })
  }

  triggerChange(changedValue) {
    const { onChange } = this.props
    if (onChange) {
      onChange(Object.assign({}, this.state.form, changedValue))
    }
  };

  render() {
    return (
      <React.Fragment>
        <Select
          style={{ width: 145, 'margin-right': '16px' }}
          onChange={this.handleDateTypeChange.bind(this)}
          value={this.state.form.dateType}
          defaultValue={this.state.form.dateType}
        >
          {this.state.options.dateTypeOptions.map(item => {
            return (
              <Option value={item.code} key={item}>{item.value}</Option>
            )
          })}
        </Select>
        {(this.state.form.dateType === 'cycle') && (
          <Select
            style={{ width: 165 }}
            onChange={this.handleCycleChange.bind(this)}
            value={this.state.form.cycle}
            defaultValue={this.state.form.cycle}
          >
            {this.state.options.cycleOptions.map(item => {
              return (
                <Option value={item.code} key={item}>{item.value}</Option>
              )
            })}
          </Select>
        )}
        {(this.state.form.dateType === 'months') && (
          <RangePicker
            placeholder={['开始月份', '结束月份']}
            format='YYYY-MM'
            mode={['month', 'month']}
            open={this.state.openPanel}
            onFocus={() => { this.setState({ openPanel: true }) }}
            onBlur={() => { this.setState({ openPanel: false }) }}
            onOpenChange={ this.handOpenChange }
            onChange={this.handleMonthsChange.bind(this)}
            onPanelChange={this.handleMonthsPanelChange.bind(this)}
            value={this.state.form.dates}
            defaultValue={this.state.form.dates}
          />
        )}
        {(this.state.form.dateType === 'dates') && (
          <RangePicker
            onChange={this.handleDatesChange.bind(this)}
            value={this.state.form.dates}
            defaultValue={this.state.form.dates}
          />
        )}
        {(this.state.form.dateType === 'times') && (
          <RangePicker
            showTime
            onChange={this.handleTimesChange.bind(this)}
            value={this.state.form.dates}
            defaultValue={this.state.form.dates}
          />
        )}
      </React.Fragment>
    )
  }
}

export default SelectDate
