import React, { Component } from 'react'
import { Row, Col } from 'antd'
import OverviewData from './components/OverviewData/index'
import Statistics from './components/Statistics/index'
import Ranking from './components/Ranking/index'
import ActivityManage from './components/ActivityManage/index'
import UserSource from './components/UserSource/index'

class MarketingActivity extends Component {

  /**
   * 缓存页面
   */
  componentDidMount() {
    this.props.ensureDidMount && this.props.ensureDidMount()
  }
  /**
   * 临时解决缓存回来图表错位问题
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname && nextProps.location.pathname === '/marketing-activity') {
      setTimeout(() => {
        window.trigger(window, 'resize')
      })
    }
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span='24'>
            <OverviewData />
          </Col>
        </Row>
        <Row gutter={16} style={{ 'margin-top': '16px' }}>
          <Col span='18'>
            <Statistics />
          </Col>
          <Col span='6'>
            <Ranking />
          </Col>
        </Row>
        <Row gutter={16} style={{ 'margin-top': '16px' }}>
          <Col span='18'>
            <ActivityManage />
          </Col>
          <Col span='6'>
            <UserSource />
          </Col>
        </Row>
      </div>
    )
  }
}
export default MarketingActivity