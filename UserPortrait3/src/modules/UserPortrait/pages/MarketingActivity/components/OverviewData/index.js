/**
  * description: 营销首页卡片
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import color from '@/assets/styles/color/color.js'
import { message, Spin } from 'antd'
import ThemeIcon from '@/components/UI/ChartStatistic/ThemeIcon.js'
import { marketingGeneral } from '@/modules/UserPortrait/data/api/MarketingActivity/OverviewData'
import filters from '@/common/filters'
import './index.less'

class OverviewData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: {},
      form: {}
    }
  }
  componentDidMount() {
    this.getOverviewData()
  }
  /**
   * 营销首页卡片 数据获取
   */
  getOverviewData() {
    this.setState({ loading: true })
    marketingGeneral(this.state.form).then(response => {
      this.setState({
        data: response
      })
    }).catch(() => {
      message.error('获取活动面板数据失败!')
    }).finally(() => {
      this.setState({ 'loading': false })
    })
  }
  render() {
    let percentData = [
      {
        title: '总活动数',
        value: this.state.data.baseMarketingCounts,
        subTitle: '当月活动',
        subValue: this.state.data.monthBaseMarketingCounts,
        iconName: 'active-totalnum',
        valueStyle: color.c1,
        percent: this.state.data.baseMarketingPercent
      },
      {
        title: '活动触达数',
        value: this.state.data.baseTouchCounts,
        subTitle: '当月触达',
        subValue: this.state.data.monthTouchCounts,
        iconName: 'active-touchnum',
        valueStyle: color.c3,
        percent: this.state.data.baseTouchPercent
      },
      {
        title: '活动到店数',
        value: this.state.data.baseEnterShopCounts,
        subTitle: '当月到店',
        subValue: this.state.data.monthEnterShopCounts,
        iconName: 'active-stopnum',
        valueStyle: color.c8,
        percent: this.state.data.baseEnterShopPercent
      },
      {
        title: '活动成交数',
        value: this.state.data.baseTurnoverCounts,
        subTitle: '当月成交',
        subValue: this.state.data.monthTurnoverCounts,
        iconName: 'active-fixturenum',
        valueStyle: color.c9,
        percent: this.state.data.baseTurnoverPercent
      },
      {
        title: '成交转化率',
        value: this.state.data.averageConversion,
        iconName: 'active-convertrate',
        valueStyle: color.c4
      }
    ]
    return (
      <Spin spinning={this.state.loading}>
        <div className={'overview-data'}>
          {percentData.map((item, index) => {
            return (
              <div key={index}>
                <ThemeIcon
                  title={item.title}
                  value={item.value}
                  subTitle={item.subTitle}
                  subValue={filters.empty(item.subValue)}
                  iconName={item.iconName}
                  valueStyle={{ color: item.valueStyle }}
                  percent={filters.empty(item.percent)}
                  bodyStyle={{ padding: '24px 15px' }}
                />
              </div>
            )
          })}
        </div>
      </Spin>
    )
  }
}
export default OverviewData