/**
  * description: 活动管理 - 活动图表数据查看
  */
import React, { Component } from 'react'
import { Card, Row, Col, message } from 'antd'
/**
 * 搜索组件
 */
import Search from './components/Search'
/**
 * 活动渠道详情
 */
import ActivityChannelDetails from './components/ActivityChannelDetails'
/**
 * 营销活动趋势
 */
import ActivityConversionAnalysis from './components/ActivityConversionAnalysis'
/**
 * 活动转化率分析
 */
import ActivityTrend from './components/ActivityTrend'
/**
 * 获取数据
 */
import { queryActivityChartById } from '@/modules/UserPortrait/data/api/ActivityManage/ViewData'
import moment from 'moment'
class ViewData extends Component {
  constructor(props) {
    super(props)
    let { params } = window.getRouterParams(this.props.location.pathname, '/activity-manage/view-data/:marketId/:parentId?')
    this.state = {
      /**
       * 活动ID
       */
      marketId: +params.marketId,
      /**
       * 父群ID
       */
      parentId: +params.parentId,
      /**
       * 数据
       */
      data: {
        // 营销活动趋势数据
        lineChart: [],
        // 活动转化率分析
        funnelChart: [],
        // 活动渠道详情
        activitiyList: [],
        // 活动总人数
        marketTargetNumber: 0
      },
      // loading
      loading: false
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  /**
   * 获取数据
   */
  getData(form) {
    this.setState({ loading: true })
    queryActivityChartById(form)
      .then(response => {
        this.setState(({ data }) => {
          return {
            data: {
              ...data,
              lineChart: response.lineChart,
              funnelChart: response.funnelChart,
              activitiyList: response.activitiyList,
              marketTargetNumber: response.marketTargetNumber
            }
          }
        })
      })
      .catch(() => {
        message.error('获取活动数据失败!')
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  /**
   * 搜索
   */
  handleSearch(form) {
    this.getData(this.getParams(form))
  }

  /**
   * 获取参数
   */
  getParams(form) {
    form = {
      ...form,
      childActiveReqList: [],
      childUserGroupReqList: form.groupSearch && form.groupSearch.map(item => {
        return {
          childUserGroupId: item.split('///')[0],
          colMapping: item.split('///')[1]
        }
      }),
      marketId: this.state.marketId,
      parentId: this.state.parentId,
      startTime: moment(form.date.dates[0]).format('YYYY-MM-DD'),
      endTime: moment(form.date.dates[1]).format('YYYY-MM-DD')
    }
    delete form.groupSearch
    this.state.parentId === 0 && delete form.childUserGroupReqList
    return form
  }

  render() {
    return (
      <div>
        <Card bordered={false}>
          <Search
            search={this.handleSearch}
            marketId={this.state.marketId}
            parentId={this.state.parentId}
          />
        </Card>
        <Row gutter={16} style={{ 'margin-top': '16px' }}>
          <Col span='17'>
            <ActivityConversionAnalysis
              loading={this.state.loading}
              data={this.state.data.lineChart}
            />
          </Col>
          <Col span='7'>
            <ActivityTrend
              loading={this.state.loading}
              data={this.state.data.funnelChart}
            />
          </Col>
        </Row>
        <div style={{ 'margin-top': '16px' }}>
          <ActivityChannelDetails
            loading={this.state.loading}
            data={this.state.data.activitiyList}
          />
        </div>
      </div>
    )
  }
}
export default ViewData