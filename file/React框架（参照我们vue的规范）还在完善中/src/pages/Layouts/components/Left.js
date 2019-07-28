import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import router from '@/router/config'
const { Sider } = Layout
const { SubMenu } = Menu

@withRouter
class Left extends Component {
    state = {
        collapsed: false,
        keys: []
    };
    onCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    };
    
    componentWillMount() {
        this.selectKey()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.selectKey()
        }
    }

    selectKey = () => {
        let keys = []
        keys.push(this.props.history.location.pathname)
        this.setState({ keys: keys })
    }

    onSelect = ({ key }) => {
        this.props.history.push(key)
    }
    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className='logo' />
                <Menu
                    mode='inline'
                    theme='dark'
                    onSelect={this.onSelect}
                    selectedKeys={this.state.keys}
                    defaultOpenKeys={['/' + this.state.keys[0].split('/')[1]]}
                >
                    {router.map(item =>
                        item.subRoute && item.subRoute.length > 0
                            ? (
                                <SubMenu key={item.path} title={this.titleNode(item)}>
                                    {item.subRoute.map(subItem =>
                                        <Menu.Item key={item.path + subItem.path}>
                                            <span>{subItem.name}</span>
                                        </Menu.Item>
                                    )}
                                </SubMenu>
                            )
                            : (
                                <Menu.Item key={item.path}>
                                    <Icon type={item.icon} />
                                    <span>{item.name}</span>
                                </Menu.Item>
                            )
                    )}
                </Menu>
            </Sider>
        )
    }
}
export default Left