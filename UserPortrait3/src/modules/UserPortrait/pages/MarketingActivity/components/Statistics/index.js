/**
  * description: 营销活动统计
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Card, Form, Select, Spin, message } from 'antd'
import StatisticsChart from './StatisticsChart'
import SearchBar from '@/components/UI/SearchBar'
import { inject } from 'mobx-react'
import { queryStatisticsOfMarketingActivities } from '@/modules/UserPortrait/data/api/MarketingActivity/Statistics'
const { Option } = Select
/**
 * 注入this.props.form内部类
 * 绑定传入对象 即时更新
 */
@inject('PagesApi')
@inject('Permission')
class Statistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      form: {
        /**
         * 选择日期
         */
        date: '1',
        /**
         * 渠道
         */
        channelCode: '00'
      },
      data: []
    }
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleChannelChange = this.handleChannelChange.bind(this)
  }
  /**
   * 当时间筛选改变时触发
   */
  handleDateChange(value) {
    this.setState({ form: Object.assign({}, this.state.form, {
      date: value
    }) }, () => {
      this.getData()
    })
  }

  /**
   * 当渠道发生变化
   */
  handleChannelChange(value) {
    this.setState({ form: Object.assign({}, this.state.form, {
      channelCode: value
    }) }, () => {
      this.getData()
    })
  }

  /**
   * 获取下拉数据
   * 判断mobx仓库里是否加载过下拉数据，如果没有则加载
   */
  getFromSelect() {
    const { FromSelect, getFromSelect } = this.props.PagesApi
    if (FromSelect.length < 1) {
      this.setState(({ loadings }) => ({ loadings: { ...loadings, sourceOptions: true } }))
      getFromSelect().finally(() => {
        this.setState(({ loadings }) => ({ loadings: { ...loadings, sourceOptions: false } }))
      })
    }
  }

  /**
   * 获取数据
   */
  getData() {
    this.setState({ loading: true })
    queryStatisticsOfMarketingActivities(this.state.form).then(respones => {
      if (respones && respones.length) {
        let _data = []
        for (let item of respones) {
          _data.push({
            label: item.time,
            value: item.actNum
          })
        }
        if (this.state.form.date === '2') {
          _data = _data.map(item => {
            item.label = item.label.slice(-2) + '月'
            return item
          })
        }
        this.setState({ data: _data })
      }
    }).catch(() => {
      message.error('获取营销活动统计失败!')
    }).finally(() => {
      this.setState({ loading: false })
    })
  }
  /**
   * 初始化
   */
  componentDidMount() {
    this.getData()
    this.getFromSelect()
  }
  render() {
    const { FromSelect = [] } = this.props.PagesApi
    const loginedChannel = this.props.Permission.loginedChannel
    return (
      <Card title='营销活动统计' bordered={false} >
        <SearchBar>
          <div className='search-bar-left'></div>
          <div className='search-bar-right'>
            <Form layout='inline' className='w-ant-form-padding-none'>
              <Form.Item label='时间'
                colon={false}>
                <Select
                  style={{ width: '140px' }}
                  placeholder='请选择'
                  allowClear
                  defaultValue='1'
                  value={this.state.form.date}
                  onChange={this.handleDateChange}
                >
                  <Option value={'1'}>最近一年</Option>
                  <Option value={'2'}>2018</Option>
                  <Option value={'3'}>2017</Option>
                  <Option value={'4'}>2016</Option>
                </Select>
              </Form.Item>
              {loginedChannel.code === '00' &&
                <Form.Item label='渠道来源'
                  colon={false}>
                  <Select
                    style={{ width: '140px' }}
                    placeholder='请选择'
                    onChange={this.handleChannelChange}
                    value={this.state.form.channelCode}
                    allowClear
                  >
                    {FromSelect.map(item => (
                      <Option value={item.channelCode} key={item.channelCode}>{item.channelName}</Option>
                    ))}
                  </Select>
                </Form.Item>
              }
            </Form>
          </div>
        </SearchBar>
        <Spin spinning={this.state.loading}>
          <div style={{ 'height': '348px' }}>
            {!this.state.loading && <StatisticsChart data={this.state.data} />}
          </div>
        </Spin>
      </Card>
    )
  }
}
export default Statistics