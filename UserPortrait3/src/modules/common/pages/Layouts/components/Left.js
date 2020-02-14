/**
  * description: 页面左侧布局内容
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { trigger } from '@/common/utils'
import { inject, observer } from 'mobx-react'
import { filterPermissionRouters } from '@/common/permission/check'
import SvgIcon from '@/components/SvgIcon'
const { Sider } = Layout
const { SubMenu } = Menu

@withRouter
@inject('Permission')
@observer
class Left extends Component {
    state = {
      collapsed: false,
      keys: []
    };
    /**
     * 组件生命周期挂载钩子
     */
    componentWillMount() {
      this.selectKey()
    }

    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed
      })
      setTimeout(() => {
        trigger(window, 'resize')
      }, 300)
    };

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
    titleNode = item => {
      return (
        <span>
          <SvgIcon iconClass={item.icon} />
          <span>{item.name}</span>
        </span>
      )
    }
    render() {
      return (
        <Sider
          trigger={null}
          width='200'
          collapsedWidth='80'
          collapsed={!this.state.collapsed}
        >
          <div
            className='layout-left-head'
            onClick={this.toggle}
          >
            <Icon
              className='layout-left-head-trigger'
              type={this.state.collapsed ? 'menu-fold' : 'menu-unfold'}
            />
          </div>
          
          <Menu
            mode='inline'
            theme='dark'
            onSelect={this.onSelect}
            selectedKeys={this.state.keys}
            defaultOpenKeys={['/' + this.state.keys[0].split('/')[1]]}
          >
            {filterPermissionRouters(this.props.router, this.props.Permission.allKeys).filter(item => !item.hidden).map(item =>
              item.subRoute && item.subRoute.filter(subItem => !subItem.hidden).length > 0
                ? (
                  <SubMenu key={item.path} title={this.titleNode(item)}>
                    {item.subRoute.filter(subItem => !subItem.hidden).map(subItem =>
                      <Menu.Item key={item.path + subItem.path}>
                        <span>{subItem.name}</span>
                      </Menu.Item>
                    )}
                  </SubMenu>
                )
                : (
                  <Menu.Item key={item.path}>
                    <SvgIcon iconClass={item.icon} />
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