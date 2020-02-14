/**
  * description: 画像管理列表页面
  * author: Cathy
  * update: 注释 by Cathy 2019-09-09
  */
import React, { Component } from 'react'
import { Icon, message, Spin, Card } from 'antd'
import RouteCrumb from '@/components/RouteCrumb'
import routers from './route/config'
import TableList from './components/TableList'
import Search from './components/Search'
import PropTypes from 'prop-types'
import SubRoute from './route'
import { getPortraitList, findPortraitUsers } from '@/modules/UserPortrait/data/api/Home/Portrait'

class PortraitManage extends Component {
  static childContextTypes = {
    // 刷新列表
    refreshPortraitManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      // 初始化data数据
      data: {},
      // 页面加载 loading
      loading: false,
      // 表单
      form: {
        // 渠道来源
        channelCodes: [],
        // 画像名称
        portraitName: '',
        // 排序字段名
        sortName: '',
        // 排序方式
        sortType: '',
        // 状态
        statuss: [],
        // 当前页
        pageNumber: 1,
        // 一页展示条数
        pageSize: 10
      },
      options: {
        /**
         * 画像状态
         */
        isOpenOptions: [
          { name: '生效中', code: 1 },
          { name: '未生效', code: 2 },
          { name: '已失效', code: 0 }
        ]
      }
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleTableChange = this.handleTableChange.bind(this)
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.getPortraitData()
    this.getCrumbBeforeRoute()
  }
  /**
   * button组件页面刷新
   */
  getChildContext() {
    return {
      refreshPortraitManage: this.refreshPortraitManage.bind(this)
    }
  }
  refreshPortraitManage() {
    const form = { ...this.state.form }
    form.pageNumber = 1
    this.handleSearch(form)
  }
  /**
   * 获取画像管理列表
   */
  getPortraitData() {
    this.setState({ 'loading': true })
    getPortraitList(this.state.form).then(res => {
      const form = { ...this.state.form }
      res.pagination = {
        current: form.pageNumber,
        pageSize: form.pageSize,
        total: res.totalElements
      }
      this.setState({
        data: res
      })
      this.setState({ 'data': res })
      // 获取用户数
      if (res.content && res.content.length) {
        findPortraitUsers(res).then(_usersList => {
          res.content.forEach(_item => {
            _usersList.find(_userItem => {
              _item.userTotals = _userItem.portraitUsers
              return _userItem.portraitId === _item.id
            })
          })
          this.setState({ data: Object.assign({}, this.state.data, res) })
        })
      }
    }).catch(() => {
      message.error('获取画像列表失败!')
    }).finally(() => {
      this.setState({ 'loading': false })
    })
  }
  /**
   * 点击查询
   */
  handleSearch(form) {
    form.pageNumber = form.pageNumber || 1
    this.setState({ form: Object.assign({}, this.state.form, form) }, () => {
      this.getPortraitData()
    })
  }
  /**
   * 表格相应变化
   */
  handleTableChange(pagination, filters, sorter) {
    const form = { ...this.state.form }
    form.pageNumber = pagination.current
    form.sortField = sorter.field
    form.sortOrder = sorter.order
    this.handleSearch(form)
  }
  /**
   * 获取默认面包屑
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname && nextProps.location.pathname === '/portrait-manage') {
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
        case '/portrait-manage':
          beforeRoute.push({ key: '/portrait-manage', title: '画像管理列表' })
          break
      }
      if (pathname.includes('/portrait-manage/add')) {
        beforeRoute.push({ key: pathname, title: '画像新增' })
      }
      if (pathname.includes('/portrait-manage/detail')) {
        beforeRoute.push({ key: pathname, title: '画像详情' })
      }
      if (pathname.includes('/portrait-manage/enjoy')) {
        beforeRoute.push({ key: pathname, title: '画像共享' })
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
        <Card bordered={false} style={{ 'display': (this.props.location.pathname !== '/portrait-manage') ? 'none' : 'block' }}>
          <Search search={this.handleSearch} options={this.state.options} />
          <Spin spinning={this.state.loading}>
            <TableList
              data={this.state.data}
              handleTableChange={this.handleTableChange}
              loading={this.state.loading}
            />
          </Spin>
        </Card>
        <SubRoute />
      </div>
    )
  }
}
export default PortraitManage