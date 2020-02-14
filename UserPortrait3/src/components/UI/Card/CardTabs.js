/**
  * description: Card组件卡槽
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Card, Tabs } from 'antd'
import './CardTabs.less'
import { $ } from '@/common/utils/dom'
const { TabPane } = Tabs
/**
 * 解决router-live插件再次返回缓存页面，antd tabs下标消失问题
 */
const checkTabsInkBar = $parent => {
  let $tabsInkBar = $('.ant-tabs-ink-bar-animated', $parent)
  if ($tabsInkBar && $tabsInkBar.offsetWidth === 0) {
    let $tabActive = $('.ant-tabs-tab-active', $.closest('.ant-tabs-nav-animated', $tabsInkBar))
    let left = $tabActive.offsetLeft
    let width = $tabActive.offsetWidth
    $.styles($tabsInkBar, {
      width,
      transform: `translate3d(${left}px, 0px, 0px)`,
      transition: 'none'
    })
    setTimeout(() => {
      $.styles($tabsInkBar, {
        transition: '.3s'
      })
    })
  }
}
class CardTabs extends Component {
  componentDidUpdate() {
    let self = this
    setTimeout(() => {
      checkTabsInkBar(self.Element)
    })
  }
  render() {
    let extra = (
      <div ref={Element => { this.Element = Element }} className='w-card-tabs-extra'>
        <Tabs
          hideAdd
          activeKey={this.props.activeKey}
          onChange={this.props.onChange}
          tabList={this.props.tabs}
        >
          { this.props.tabs.map(tab => (
            <TabPane tab={tab.title} key={tab.key} />
          )) }
        </Tabs>
        {this.props.extra}
      </div>
    )
    return (
      <Card className='w-card-tabs' bordered={this.props.bordered} title={this.props.title} extra={extra}>
        {this.props.children}
      </Card>
    )
  }
}
export default CardTabs