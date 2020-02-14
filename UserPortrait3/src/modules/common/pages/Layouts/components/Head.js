/**
  * description: 页面头部布局内容
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Row, Col, Dropdown, Divider, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import { loginOut } from '@/common/permission/auth'
const { Header } = Layout
// <Menu.Item key='index'><a href='/index.html'>用户画像</a></Menu.Item>
// <Menu.Item key='demo'><a href='/demo.html'>DEMO</a></Menu.Item>
@withRouter
@inject('Root')
@inject('Permission')
@observer
class Head extends Component {
  constructor(props) {
    super(props)
    let _defaultSelectedKeys = window.location.pathname.match(/\w{0,}(?=\.html)/)
    this.state = {
      defaultSelectedKeys: _defaultSelectedKeys && _defaultSelectedKeys[0]
    }
  }
  render() {
    const loginedChannel = this.props.Permission.loginedChannel
    return (
      <Header style={{ padding: 0 }}>
        <Row gutter={16}>
          <Col span={12}>
            <h1 className='w-layout-logo'>中台用户中心</h1>
          </Col>
          <Col span={12} className='text-right' style={{ 'padding-right': '24px' }}>
            {this.props.Root.userInfo.userName &&
              <span>{this.props.Root.userInfo.userName}<Divider type='vertical' /></span>
            }
            {this.props.Root.userInfo.role &&
              <span>{this.props.Root.userInfo.role}<Divider type='vertical' /></span>
            }
            <Dropdown overlay={<Menu>
              <Menu.Item onClick={loginOut}>
                退出登录
              </Menu.Item>
            </Menu>}
            >
              <span style={{ 'cursor': 'pointer' }}>
                {loginedChannel.name} <Icon type='down' />
              </span>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    )
  }
}
export default Head