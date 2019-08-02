import React, { Component } from 'react'
import { Layout, Menu, Row, Col, Icon, Dropdown, Divider } from 'antd'
const { Header } = Layout
class Head extends Component {
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Menu
                            mode='horizontal'
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key='1'>nav 1</Menu.Item>
                            <Menu.Item key='2'>nav 2</Menu.Item>
                            <Menu.Item key='3'>nav 3</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={12} className='text-right' style={{ 'padding-right': '24px' }}>
                        Text
                        <Divider type='vertical' />
                        <a href='#'>Link</a>
                        <Divider type='vertical' />
                        <Icon type='wechat' style={{ 'margin-right': '10px', color: '#4187C3' }} />
                        <Dropdown overlay={<Menu>
                            <Menu.Item>
                                <a target='_blank' rel='noopener noreferrer' href='http://www.alipay.com/'>
                                1st menu item
                                </a>
                            </Menu.Item>
                            <Menu.Item>
                                <a target='_blank' rel='noopener noreferrer' href='http://www.taobao.com/'>
                                2nd menu item
                                </a>
                            </Menu.Item>
                            <Menu.Item>
                                <a target='_blank' rel='noopener noreferrer' href='http://www.tmall.com/'>
                                3rd menu item
                                </a>
                            </Menu.Item>
                        </Menu>}
                        >
                            <a className='ant-dropdown-link' href='#'>
                                Hover me <Icon type='down' />
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
        )
    }
}
export default Head