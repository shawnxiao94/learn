/**
  * description: 全局标签选项卡
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Tabs } from 'antd'
import './TabsView.less'
const { TabPane } = Tabs
@withRouter
class TabsView extends Component {
  constructor(props) {
    super(props)
    this.newTabIndex = 0
    const panes = []
    this.state = {
      activeKey: '',
      panes
    }
  }

    onChange = activeKey => {
      this.setState({ activeKey })
      this.props.history.push(activeKey)
    };
    
    onEdit = (targetKey, action) => {
      this[action](targetKey)
    };

    componentWillReceiveProps(nextProps) {
      if (this.props.location.pathname !== nextProps.location.pathname) {
        if (this.state.panes.some(item => item.key === nextProps.location.pathname)) {
          this.setState({ activeKey: nextProps.location.pathname })
        } else {
          let nextRoute
          const filterRouters = (_router, _parentPath = '') => {
            _router.forEach(item => {
              if (item.hidden) {
                return
              }
              let _subRoute = item.subRoute && item.subRoute.filter(subItem => !subItem.hidden)
              if (_subRoute && _subRoute.length) {
                filterRouters(_subRoute, item.path)
              } else {
                if (_parentPath + item.path === nextProps.location.pathname) {
                  nextRoute = item
                }
              }
            })
          }
          filterRouters(this.props.router)
          if (nextRoute) {
            this.add({
              title: nextRoute.name,
              key: nextProps.location.pathname
            })
          }
        }
      }
    };
    
    onEdit = (targetKey, action) => {
      this[action](targetKey)
    };
    
    add = ({ title = 'New Tab', content = '', key }) => {
      const { panes } = this.state
      const activeKey = key || `newTab${this.newTabIndex++}`
      panes.push({ title: title, content: content, key: activeKey })
      if (panes.length === 1) {
        panes[0].closable = false
      } else if (panes.length > 1) {
        panes[0].closable = true
      }
      this.setState({ panes, activeKey })
    };

    remove = targetKey => {
      let { activeKey } = this.state
      let lastIndex
      this.state.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.state.panes.filter(pane => pane.key !== targetKey)
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key
        } else {
          activeKey = panes[0].key
        }
      }
      if (panes.length === 1) {
        panes[0].closable = false
      }
      this.setState({ panes, activeKey })
      if (this.props.location.pathname.includes(targetKey)) {
        this.props.history.push(activeKey)
      }
    };

    render() {
      return (
        <div className='tabs-view'>
          <Tabs
            hideAdd
            onChange={this.onChange.bind(this)}
            activeKey={this.state.activeKey}
            type='editable-card'
            onEdit={this.onEdit}
            style={{ display: (this.state.panes.length) ? 'block' : 'none' }}
          >
            {this.state.panes.map(pane => (
              <TabPane tab={pane.title} key={pane.key} closable={pane.closable} />
            ))}
          </Tabs>
        </div>
      )
    }
}
export default TabsView