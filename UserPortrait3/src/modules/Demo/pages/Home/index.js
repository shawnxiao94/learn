import React, { Component } from 'react'
import CardItem from './components/CardItem'
import PieCharts from './components/PieCharts'
import LineCharts from './components/LineCharts'
import CardCalendar from './components/CardCalendar'
import CardStatistic from './components/CardStatistic'
import { Row, Col, Icon } from 'antd'
import colors from '@/assets/styles/color/color.js'
class Home extends Component {
  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <LineCharts />
          </Col>
          <Col span={12}>
            <PieCharts />
          </Col>
        </Row>
        <Row gutter={16} style={{ 'margin-top': '16px' }}>
          <Col span={8}>
            <CardStatistic
              prefix={<Icon type='arrow-up' />}
              text={(<span>日销售额 <b>￥53,653</b></span>)}
              title='统计A' value='2121221'
            />
          </Col>
          <Col span={8}>
            <CardStatistic
              valueStyle={{ color: colors.c4 }}
              title='统计B'
              chartsType='bar'
              text={(<span>日销售额 <b>￥2,322</b></span>)}
              value='323232'
            />
          </Col>
          <Col span={8}>
            <CardStatistic
              prefix={<Icon type='like' />}
              title='统计C'
              chartsColor={colors.c5}
              text={(<div>日销售额 <b>￥58</b></div>)}
              value='12152152'
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ 'margin-top': '16px' }}>
          <Col span={12}>
            <CardItem />
          </Col>
          <Col span={12}>
            <CardItem />
          </Col>
        </Row>
        <Row gutter={16} style={{ 'margin-top': '16px' }}>
          <Col span={24}>
            <CardCalendar />
          </Col>
        </Row>
      </div>
    )
  }
}
export default Home