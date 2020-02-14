/**
  * description: 组件生命周期
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { inject, observer } from 'mobx-react'
import './index.less'

@withRouter
@inject('CRouteCrumb')
@observer
class RouteCrumb extends Component {
  /**
   * 组件生命周期挂载钩子
   */
  componentDidMount() {
    this.setBeforeRoute()
  }
  /**
   * 设置前置Route
   */
  setBeforeRoute(beforeRoute) {
    beforeRoute = beforeRoute || this.props.beforeRoute
    beforeRoute && beforeRoute.forEach(item => {
      this.add({
        title: item.title,
        key: item.key,
        search: ''
      })
    })
  }
  /**
     * 组件生命周期注销钩子
     */
  componentWillUnmount() {
    /**
     * 清除面包屑
     */
    this.props.CRouteCrumb.clearCrumbs()
  }

  /**
   * 格式化location.pathname
   * 去除/:id/ 以及?search=.*
   */
  formatLocationPath(pathname) {
    pathname = /\?/.test(pathname) ? pathname.match(/(.*)(?=\?)/)[0] : pathname
    return pathname.replace(/(?:\/\d+)+(?:\/?)/, '')
  }
    
  /**
   * 组件生命周期Update
   */
  componentWillReceiveProps(nextProps) {
    const { crumbs, replaceCrumb } = this.props.CRouteCrumb
    let pathname = this.props.location.pathname
    let nextPathname = nextProps.location.pathname
    pathname = this.formatLocationPath(pathname)
    nextPathname = this.formatLocationPath(nextPathname)
    const filterRouters = (_routes, _parentPath = '') => {
      let nextRoute
      _routes.forEach(item => {
        let _subRoute = item.subRoute
        if (_subRoute && _subRoute.length) {
          filterRouters(_subRoute, item.path)
        } else {
          let _path = item.path.replace(/(\/:.*(\/?))+$/, '')
          if (nextProps.location.pathname.includes(_parentPath + _path)) {
            nextRoute = item
          }
        }
      })
      return nextRoute
    }
    let nextRoute = filterRouters(this.props.routes)
    if (this.props.history.action === 'REPLACE') {
      replaceCrumb({
        title: nextRoute.name,
        key: nextProps.location.pathname,
        search: nextProps.location.search
      })
    }
    if (pathname !== nextPathname) {
      let _activeItem
      if (crumbs.some(item => {
        if (item.key.includes(nextPathname)) {
          _activeItem = item
          return true
        }
      })) {
        this.move(_activeItem)
      } else {
        if (nextRoute) {
          this.add({
            title: nextRoute.name,
            key: nextProps.location.pathname,
            search: nextProps.location.search
          })
        }
      }
    }
    if (JSON.stringify(this.props.beforeRoute) !== JSON.stringify(nextProps.beforeRoute)) {
      this.props.CRouteCrumb.clearCrumbs()
      this.setBeforeRoute(nextProps.beforeRoute)
    }
  }
  /**
     * 添加路由
     */
  add({ title = '', key, search = '' }) {
    const { addCrumbs } = this.props.CRouteCrumb
    addCrumbs({ title, key, search })
  }
  /**
     * 移动路由
     */
  move(item) {
    const { moveToCrumb } = this.props.CRouteCrumb
    moveToCrumb(item)
  }
  render() {
    const { crumbs } = this.props.CRouteCrumb
    return crumbs.length ? (
      <div className='c-route-crumb'>
        <Breadcrumb>
          {crumbs.map((item, index) => (
            <Breadcrumb.Item key={item.key}>
              {(crumbs.length !== index + 1)
                ? <Link to={item.key + item.search}>
                  {item.title}
                </Link> : <span className='primary-color'>{item.title}</span>}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    ) : ''
  }
}

export default RouteCrumb
