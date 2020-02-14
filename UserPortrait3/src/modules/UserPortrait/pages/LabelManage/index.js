import React, { Component } from 'react'
import { message, Spin, Card, Icon } from 'antd'
import Search from './components/Search'
import TableList from './components/TableList'
import RouteCrumb from '@/components/RouteCrumb'
import SubRoute from './route'
import routers from './route/config'
import PropTypes from 'prop-types'
import * as api from '@/modules/UserPortrait/data/api/Home/Label'

class LabelManage extends Component {
  static childContextTypes = {
    // 刷新列表
    refreshLabelManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      // 页面加载 loading
      loading: false,
      // 表单
      form: {
        // 标签名称
        name: '',
        // 标签状态
        isOpenStatus: [],
        // 标签来源
        selectChannelCodes: [],
        // 标签类型
        tagTypes: [],
        // 当前页 开始页
        pageNumber: 1,
        // 一页展示多少条
        pageSize: 10
      },
      options: {
        // 标签类型
        labelTypes: [
          // 手工型
          { name: '手工型', code: 'manual' },
          // 统计型
          { name: '统计型', code: 'statistical' },
          // 算法型
          { name: '算法型', code: 'algorithm' }
        ],
        /**
         * 标签状态
         */
        isOpenOptions: [
          { name: '生效中', code: 1 },
          { name: '未生效', code: 2 },
          { name: '已失效', code: 0 }
        ]
      },
      beforeRoute: undefined
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
      refreshLabelManage: this.refreshLabelManage.bind(this)
    }
  }
  /**
   * 刷新页面
   */
  refreshLabelManage() {
    const form = { ...this.state.form }
    form.pageNumber = 1
    this.handleSearch(form)
  }
  /**
   * 组件生命周期挂载钩子
   */
  componentWillMount() {
    this.getData()
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
   * 点击查询
   */
  handleSearch(form) {
    form.pageNumber = form.pageNumber || 1
    this.setState({ form: Object.assign({}, this.state.form, form) }, () => {
      this.getData()
    })
  }
  /**
   * 调用API接口获取数据
   */
  getData() {
    // 校验用户数是否成功执行
    let keys = false
    this.setState({ 'loading': true })
    // 获取标签列表数据
    api.getLabelList(this.state.form).then(_ => {
      const form = { ...this.state.form }
      let res = _ || {}
      res.pagination = {
        current: form.pageNumber,
        pageSize: form.pageSize,
        total: res.totalElements
      }
      // 查询用户数
      if (res.content && res.content.length) {
        // 根据标签列表数据 - 查询对应的用户数
        api
          .queryTagUserCounts(res)
          .then(clitems => {
            // 赋值对应得用户数值
            res.content.forEach(dataItme => {
              clitems.Result.data.find(clidto => {
                if (dataItme.id === clidto.id) {
                  dataItme.clientTotals = clidto.userCounts
                  return true
                }
              })
            })
            // 深拷贝
            this.setState({ data: Object.assign({}, this.state.data, res) })
          })
          .catch(() => {
            message.error('获取用户数失败!')
          }).finally(() => {
            keys = true
            this.setState({ 'loading': false })
          })
      } else {
        res.content = []
        // 深拷贝
        this.setState({ data: Object.assign({}, this.state.data, res) })
        keys = true
      }
    }).catch(() => {
      keys = true
      message.error('获取标签列表失败!')
    })
      .finally(() => {
        if (keys) {
          this.setState({ 'loading': false })
        }
      })
  }
    
  /**
   * 获取默认面包屑
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname && nextProps.location.pathname === '/label-manage') {
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
        case '/label-manage':
          beforeRoute.push({ key: pathname, title: '标签管理列表' })
          break
      }
      if (pathname.includes('/label-manage/add')) {
        beforeRoute.push({ key: pathname, title: '标签新增' })
      }
      if (pathname.includes('/label-manage/detail')) {
        beforeRoute.push({ key: pathname, title: '标签详情' })
      }
      if (pathname.includes('/label-manage/enjoy')) {
        beforeRoute.push({ key: pathname, title: '标签共享' })
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
        <Card bordered={false} style={{ 'display': (this.props.location.pathname !== '/label-manage') ? 'none' : 'block' }}>
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
export default LabelManage