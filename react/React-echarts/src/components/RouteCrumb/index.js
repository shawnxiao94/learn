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
    componentWillMount() {
        this.add({
            title: this.props.firstRoute.title,
            key: this.props.firstRoute.key
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
     * 组件生命周期Update
     */
    componentWillReceiveProps(nextProps) {
        const { crumbs } = this.props.CRouteCrumb
        if (this.props.location.pathname !== nextProps.location.pathname) {
            let _activeItem
            if (crumbs.some(item => {
                if (item.key === nextProps.location.pathname) {
                    _activeItem = item
                    return true
                }
            })) {
                this.move(_activeItem)
            } else {
                let nextRoute
                const filterRouters = (_routes, _parentPath = '') => {
                    _routes.forEach(item => {
                        let _subRoute = item.subRoute
                        if (_subRoute && _subRoute.length) {
                            filterRouters(_subRoute, item.path)
                        } else {
                            if (_parentPath + item.path === nextProps.location.pathname) {
                                nextRoute = item
                            }
                        }
                    })
                }
                filterRouters(this.props.routes)
                if (nextRoute) {
                    this.add({
                        title: nextRoute.name,
                        key: nextProps.location.pathname
                    })
                }
            }
        }
    }
    /**
     * 添加路由
     */
    add({ title = '', key }) {
        const { addCrumbs } = this.props.CRouteCrumb
        addCrumbs({ title: title, key: key })
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
                                ? <Link to={item.key}>
                                    {item.title}
                                </Link> : item.title}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
        ) : ''
    }
}

export default RouteCrumb
