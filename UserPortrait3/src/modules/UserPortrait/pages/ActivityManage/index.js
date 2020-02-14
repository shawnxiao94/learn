/**
  * description: 活动管理列表
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { message, Spin, Card, Icon } from 'antd'
import RouteCrumb from '@/components/RouteCrumb'
import SubRoute from './route'
import PropTypes from 'prop-types'
import routers from './route/config'
import Search from './components/Search.js'
import TableList from './components/TableList.js'
import * as api from '@/modules/UserPortrait/data/api/MarketingActivity/ActivityManage'

class ActivityManage extends Component {
  static childContextTypes = {
    // 刷新列表
    refreshActivityManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      form: {
        markName: '',
        statuss: [],
        sortName: '',
        sortType: '',
        current: 1,
        pageSize: 10
      },
      beforeRoute: undefined,
      /**
       * 如果想默认展开,则动态获取展开行的rowKeys
       */
      defaultExpandedRowKeys: [],
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
   * 刷新页面
   */
  refreshActivityManage() {
    const form = { ...this.state.form }
    form.current = 1
    this.handleSearch(form)
  }
  
  /**
   * button组件页面刷新
   */
  getChildContext() {
    return {
      refreshActivityManage: this.refreshActivityManage.bind(this)
    }
  }

  /**
   * 获取展开行的rowKeys，如果有children的则把id取出
   */
  setDefaultExpandedRowKeys(data) {
    let _defaultExpandedRowKeys = []
    if (data.content) {
      data.content.forEach(item => {
        if (item.children) {
          _defaultExpandedRowKeys.push(item.id)
        }
      })
    }
    return _defaultExpandedRowKeys
  }
  
  /**
   * 调用API接口获取数据
   */
  getData() {
    // 校验用户数是否成功执行
    let keys = false
    this.setState({ loading: true })
    api.getFindByMarketPage(this.state.form).then(response => {
      const form = { ...this.state.form }
      response.pagination = {
        current: form.current,
        pageSize: form.pageSize,
        total: response.totalElements
      }
      this.setState({ data: [] })
      this.setState({
        defaultExpandedRowKeys: this.setDefaultExpandedRowKeys(response),
        data: response
      })
      
      // 查询用户数
      if (response.content && response.content.length) {
        // 根据标签列表数据 - 查询对应的用户数
        api
          .findActivityUsers(response)
          .then(clitems => {
            // 赋值对应得用户数值 - 主活动
            response.content.forEach(dataItme => {
              clitems.Result.data.find(clidto => {
                if (dataItme.id === clidto.id) {
                  dataItme.clientTotals = clidto.userCounts
                  // 子活动
                  if (dataItme.children && dataItme.children.length > 0) {
                    dataItme.children.forEach(childrenItme => {
                      clitems.Result.data.find(childrento => {
                        if (childrento.type === 'child' && childrenItme.id === childrento.id) {
                          childrenItme.clientTotals = childrento.userCounts
                        }
                      })
                    })
                  }
                  return true
                }
              })
            })
            // 深拷贝
            this.setState({ data: Object.assign({}, this.state.data, response) })
          })
          .catch(() => {
            message.error('获取用户数失败!')
          }).finally(() => {
            keys = true
            this.setState({ 'loading': false })
          })
      } else {
        response.content = []
        // 深拷贝
        this.setState({ data: Object.assign({}, this.state.data, response) })
        keys = true
      }
    }).catch(() => {
      keys = true
      message.error('获取活动列表失败!')
    }).finally(() => {
      if (keys) {
        this.setState({ 'loading': false })
      }
    })
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
   * 表格相应变化
   */
  handleTableChange(pagination, filters, sorter) {
    const form = { ...this.state.form }
    form.current = pagination.current
    form.sortName = sorter.field
    form.sortType = sorter.order
    this.handleSearch(form)
  }
  
  /**
   * 获取默认面包屑
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname && nextProps.location.pathname === '/activity-manage') {
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
        { key: '/marketing-activity', title: <Icon type='home' /> }
      ]
      switch (pathname) {
        case '/activity-manage':
          beforeRoute.push({ key: pathname, title: '活动管理列表' })
          break
      }
      if (pathname.includes('/activity-manage/detail')) {
        beforeRoute.push({ key: pathname, title: '活动详情' })
      } else if (pathname.includes('/activity-manage/add')) {
        beforeRoute.push({ key: pathname, title: '活动新增' })
      } else if (pathname.includes('/activity-manage/detail-sub-activity')) {
        beforeRoute.push({ key: pathname, title: '子活动详情' })
      } else if (pathname.includes('/activity-manage/add-sub-activity')) {
        beforeRoute.push({ key: pathname, title: '子活动新增' })
      } else if (pathname.includes('/activity-manage/view-data')) {
        beforeRoute.push({ key: pathname, title: '活动数据' })
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
        <Card bordered={false} style={{ 'display': (this.props.location.pathname !== '/activity-manage') ? 'none' : 'block' }}>
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
export default ActivityManage
