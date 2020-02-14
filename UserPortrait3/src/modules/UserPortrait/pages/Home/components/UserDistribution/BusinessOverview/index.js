/**
  * description: 全局图表组件 - 折线图卡槽
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Radio, message, Spin } from 'antd'
import LineChart from './LineChart'
import moment from 'moment'
import CalendarRangePicker from '@/components/UI/Calendar'
import * as api from '@/modules/UserPortrait/data/api/Home/UserDistribution'

class BusinessOverview extends Component {
  constructor(props) {
    super(props)
    let end = moment()
      .startOf('day')
      .subtract(1, 'days')
    let start = moment(end)
      .subtract(30, 'days')
    this.state = {
      type: 'userTotalList',
      data: null,
      targetData: [],
      loading: true,
      pickerValue: [start, end],
      selected: '',
      addYear: '',
      subYear: ''

    }
    this.handleRangePickerChange = this.handleRangePickerChange.bind(this)
    this.disabledDate = this.disabledDate.bind(this)
    this.handPanelChange = this.handPanelChange.bind(this)
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.getData()
  }
  /**
   * 业务概要 - 趋势切换
   * @param {*} value 切换值
   */
  handleRangePickerChange(value) {
    this.setState({ pickerValue: value }, () => {
      this.getData()
    })
  }
  /**
   * 用户、标签、画像
   */
  handleRadioChange(e) {
    this.setState({ type: e.target.value })
    this.setState({ 'loading': true }, () => {
      this.formatTargetData()
      this.setState({ 'loading': false })
    })
  }
  /**
   * 重新加载数据展示
   */
  formatTargetData() {
    this.resetData()
    if (this.state.data) {
      let _targetData
      _targetData = this.state.data[this.state.type]
      this.setState({ targetData: _targetData })
    }
  }
  /**
   * 获取业务趋势数据失败
   */
  getData() {
    this.setState({ 'loading': true })
    this.resetData()
    api.businessTrend({ 'startTime': moment(this.state.pickerValue[0]).format('YYYY-MM-DD'), 'endTime': moment(this.state.pickerValue[1]).format('YYYY-MM-DD') }).then(data => {
      this.setState({ data: data })
      this.formatTargetData()
    }).catch(() => {
      message.error('获取业务趋势数据失败!')
    })
      .finally(() => {
        this.setState({ 'loading': false })
      })
  }
  /**
   * 初始化数据
   */
  resetData() {
    let _reset = [
      {
        'date': moment(new Date()).format('M月DD'),
        'value': 0
      }
    ]
    this.setState({ targetData: _reset })
  }
  disabledDate(current) {
    if (this.state.selected) {
      return (current && current < this.state.subYear) || (current && this.state.addYear < current)
    }
  }
  handPanelChange(value) {
    let selected = moment(value[0]).valueOf()
    let addYear = moment(value[0]).add('1', 'years').valueOf()
    let subYear = moment(value[0]).add('-1', 'years').valueOf()
    this.setState({
      addYear: addYear,
      subYear: subYear,
      selected: selected
    }, () => {
      this.disabledDate()
    })
  }
  render() {
    return (
      <div>
        <div style={{ display: 'flex', 'justify-content': 'space-between', 'margin-bottom': '16px' }}>
          <CalendarRangePicker
            disabledDate={this.disabledDate}
            handPanelChange={this.handPanelChange}
            handleRangePickerChange={this.handleRangePickerChange} />
          <Radio.Group
            value={this.state.type}
            onChange={this.handleRadioChange.bind(this)}
          >
            <Radio.Button value='userTotalList'>用户数</Radio.Button>
            <Radio.Button value='tagTotalList'>标签数</Radio.Button>
            <Radio.Button value='portraitTotalList'>画像数</Radio.Button>
          </Radio.Group>
        </div>
        <Spin spinning={this.state.loading}>
          <div style={{ height: '292px' }}>
            {!this.state.loading && <LineChart data={this.state.targetData} />}
          </div>
        </Spin>
      </div>
    )
  }
}
export default BusinessOverview
