/**
  * description: 画像管理列表主体 卡槽
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import Group from './Group'
import CardTabs from '@/components/UI/Card/CardTabs'
class Portrait extends Component {
  state = {
    tabs: [
      {
        key: 'gt',
        title: '个体画像'
      },
      {
        key: 'qt',
        title: '群体画像'
      }
    ],
    activeKey: 'qt'
  }
  render() {
    let _extra = (
      <span>
        <Link to={'/portrait-manage'}>
          <Icon type='menu' />
        </Link>
      </span>
    )
  
    return (
      <div className='portrait-list'>
        <CardTabs
          title='画像管理列表'
          bordered={false}
          extra={_extra}
          tabs={this.state.tabs}
          onChange={activeKey => {
            this.setState({ activeKey })
          }}
          activeKey={this.state.activeKey}
        >
          <div style={{ 'height': '350px' }}>
            {this.state.activeKey === 'gt' && <div>敬请期待</div>}
            {this.state.activeKey === 'qt' && <Group />}
          </div>
        </CardTabs>
      </div>
    )
  }
}
export default Portrait