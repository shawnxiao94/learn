import React, { Component } from 'react'
import { Spin, Card, Icon, message } from 'antd'
import Search from './components/Search'
import TableList from './components/TableList'
import RouteCrumb from '@/components/RouteCrumb'
import SubRoute from './route'
import routers from './route/config'
import PropTypes from 'prop-types'
import * as api from '@/modules/UserPortrait/data/api/GroupManage'

class GroupManage extends Component {
  static childContextTypes = {
    // 刷新列表
    refreshGroupManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      // 页面加载 loading
      loading: false,
      form: {
        current: 1,
        pageSize: 10
      },
      beforeRoute: undefined,
      data: {}
    }
    /**
     * 解决事件匿名函数不断触发render问题
     */
    this.handleSearch = this.handleSearch.bind(this)
    this.handleTableChange = this.handleTableChange.bind(this)
  }

  /**
   * 兼容缓存写法，不存在缓存的情况可以不写
   */
  componentDidMount() {
    this.props.ensureDidMount && this.props.ensureDidMount()
    this.getCrumbBeforeRoute()
  }

  /**
   * button组件页面刷新
   */
  getChildContext() {
    return {
      refreshGroupManage: this.refreshGroupManage.bind(this)
    }
  }
  
  /**
   * 刷新页面
   */
  refreshGroupManage() {
    const form = { ...this.state.form }
    form.pageNumber = 1
    this.handleSearch(form)
  }

  /**
   * 表格相应变化
   */
  handleTableChange(pagination, filters, sorter) {
    const form = { ...this.state.form }
    form.current = pagination.current
    form.sortField = sorter.field
    form.sortOrder = sorter.order
    this.handleSearch(form)
  }

  /**
   * 点击查询
   */
  handleSearch(form) {
    form.current = form.current || 1
    this.setState({ form: Object.assign({}, this.state.form, form) }, () => {
      this.getData()
    })
  }
  
  /**
   * 调用API接口获取数据
   */
  getData() {
    this.setState({ loading: true })
    api.getGroupList(this.state.form).then(response => {
      const form = { ...this.state.form }
      response.pagination = {
        current: form.current,
        pageSize: form.pageSize,
        total: response.totalElements
      }
      this.setState({
        data: response
      })
    }).catch(() => {
      message.error('获取用户群列表失败!')
    }).finally(() => {
      this.setState({ 'loading': false })
    })
  }
    
  /**
   * 获取默认面包屑
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname && nextProps.location.pathname === '/group-manage') {
      this.getCrumbBeforeRoute(nextProps.location.pathname)
    }
  }
  getCrumbBeforeRoute(pathname) {
    let beforeRoute
    pathname = pathname || this.props.location.pathname
    if (this.props.location.beforeRoute) {
      beforeRoute = this.props.location.beforeRoute
    } else {
      beforeRoute = [
        { key: '/', title: <Icon type='home' /> }
      ]
      switch (pathname) {
        case '/group-manage':
          beforeRoute.push({ key: '/group-manage', title: '用户群管理列表' })
          break
      }
      if (pathname.includes('/group-manage/detail')) {
        beforeRoute.push({ key: pathname, title: '详情' })
      } else if (pathname.includes('/group-manage/add')) {
        beforeRoute.push({ key: pathname, title: '新增用户子群' })
      } else if (pathname.includes('/group-manage/analysis-bi')) {
        beforeRoute.push({ key: pathname, title: 'BI自助分析' })
      } else if (pathname.includes('/group-manage/analysis-history')) {
        beforeRoute.push({ key: pathname, title: 'BI报表分析历史数据' })
      }
    }
    this.setState({ beforeRoute })
  }
  render() {
    return (
      <div>
        <RouteCrumb routes={routers}
          beforeRoute={
            this.state.beforeRoute
          }
        />
        <Card bordered={false} style={{ 'display': (this.props.location.pathname !== '/group-manage') ? 'none' : 'block' }}>
          <Search search={this.handleSearch} />
          <Spin spinning={this.state.loading}>
            <TableList
              data={this.state.data}
              loading={this.state.loading}
              handleTableChange={this.handleTableChange}
            />
          </Spin>
        </Card>
        <SubRoute />
      </div>
    )
  }
}
export default GroupManage