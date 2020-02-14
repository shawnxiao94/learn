/**
  * description: 中台用户中心数据 卡片
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Row, Col, Spin } from 'antd'
import ThemePercent from '@/components/UI/ChartStatistic/ThemePercent.js'
import color from '@/assets/styles/color/color.js'
import { general } from '@/modules/UserPortrait/data/api/Home/OverviewData'
class OverviewData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: {},
      form: {}
    }
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.getOverviewData()
  }
  /**
   * 获取中台用户中心数据
   */
  getOverviewData() {
    this.setState({ loading: true })
    general(this.state.form).then(res => {
      this.setState({
        data: res
      })
    }).catch(() => {
    }).finally(() => {
      this.setState({ 'loading': false })
    })
  }
  render() {
    let percentData = [
      // 总用户数 - 当月用户 卡片
      {
        options: [
          {
            title: '总用户数',
            value: this.state.data.userTotal && this.state.data.userTotal[0],
            suffix: this.state.data.userTotal && this.state.data.userTotal[1]
          },
          {
            title: '当月用户',
            value: this.state.data.monthUserTotal && this.state.data.monthUserTotal[0],
            suffix: this.state.data.monthUserTotal && this.state.data.monthUserTotal[1]
          }
        ],
        valueStyle: color.c1,
        percent: this.state.data.userRate
      },
      // 用户画像 - 当月画像 卡片
      {
        options: [
          {
            title: '用户画像',
            value: this.state.data.portraitTotal && this.state.data.portraitTotal[0],
            suffix: this.state.data.portraitTotal && this.state.data.portraitTotal[1]
          },
          {
            title: '当月画像',
            value: this.state.data.monthPortraitTotal && this.state.data.monthPortraitTotal[0],
            suffix: this.state.data.monthPortraitTotal && this.state.data.monthPortraitTotal[1]
          }
        ],
        valueStyle: color.c2,
        percent: this.state.data.portraitRate
      },
      // 标签总量 - 当月标签 卡片
      {
        options: [
          {
            title: '标签总量',
            value: this.state.data.tagTotal && this.state.data.tagTotal[0],
            suffix: this.state.data.tagTotal && this.state.data.tagTotal[1]
          },
          {
            title: '当月标签',
            value: this.state.data.monthTagTotal && this.state.data.monthTagTotal[0],
            suffix: this.state.data.monthTagTotal && this.state.data.monthTagTotal[1]
          }
        ],
        valueStyle: color.c3,
        percent: this.state.data.tagRate
      },
      // 用户群共享次数 - 当月共享次数 卡片
      {
        options: [
          {
            title: '用户群共享次数',
            value: this.state.data.userGroupShareTotal && this.state.data.userGroupShareTotal[0],
            suffix: this.state.data.userGroupShareTotal && this.state.data.userGroupShareTotal[1]
          },
          {
            title: '当月共享次数',
            value: this.state.data.monthUserGroupShareTotal && this.state.data.monthUserGroupShareTotal[0],
            suffix: this.state.data.monthUserGroupShareTotal && this.state.data.monthUserGroupShareTotal[1]
          }
        ],
        valueStyle: color.c4,
        percent: this.state.data.baseUserGroupRate
      }
    ]
    return (
      <Row gutter={16}>
        <Spin spinning={this.state.loading}>
          {percentData.map((item, index) => {
            return (
              <Col span={6} key={index}>
                <ThemePercent
                  options={item.options}
                  valueStyle={{ color: item.valueStyle }}
                  percent={item.percent}
                  bodyStyle={{ padding: '24px 15px' }}
                />
              </Col>
            )
          })}
        </Spin>
      </Row>
    )
  }
}
export default OverviewData