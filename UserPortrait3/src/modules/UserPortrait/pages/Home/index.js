/**
  * description: 中台用户中心首页布局
  * author: Cathy
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import OverviewData from './components/OverviewData/index'
import UserDistribution from './components/UserDistribution/index'
import TagDistribution from './components/TagDistribution/index'
import GroupManage from './components/GroupManage/index'
import Label from './components/Label/index'
import Portrait from './components/Portrait/index'
import { Row, Col } from 'antd'
class Home extends Component {
  /**
   * 搜索
   */
  search(form) {
    // console.log(form.selectDate.dates)
  }

  /**
   * 缓存页面
   */
  componentDidMount() {
    this.props.ensureDidMount && this.props.ensureDidMount()
  }
  
  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span='18'>
            <OverviewData />
            <UserDistribution />
          </Col>
          <Col span='6'>
            <TagDistribution />
          </Col>
        </Row>
        <Row gutter={16} style={{ 'margin-top': '16px' }}>
          <Col span='12'>
            <Label />
          </Col>
          <Col span='12'>
            <Portrait />
          </Col>
        </Row>
        <GroupManage />
      </div>
    )
  }
}
export default Home
