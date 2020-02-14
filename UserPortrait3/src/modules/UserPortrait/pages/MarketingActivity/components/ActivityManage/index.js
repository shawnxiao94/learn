/**
  * description: 活动管理列表
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { message, Card, Icon } from 'antd'
import Search from './Search.js'
import TableList from './TableList.js'
import { Link } from 'react-router-dom'
import * as api from '@/modules/UserPortrait/data/api/MarketingActivity/ActivityManage'

class ActivityManage extends Component {
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
        pageSize: 5
      },
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

  componentDidMount() {
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
  
  render() {
    // 标签管理列表 导航信息
    let _extra = (
      <React.Fragment>
        <span style={{ 'margin-left': '15px' }}>
          <Link to={'/activity-manage'}><Icon type='menu' /></Link>
        </span>
      </React.Fragment>
    )
    return (
      <Card style={{ 'min-height': '550px' }} title='活动管理' bordered={false} extra={_extra}>
        <Search search={this.handleSearch} />
        <TableList
          data={this.state.data}
          loading={this.state.loading}
          handleTableChange={this.handleTableChange}
        />
      </Card>
    )
  }
}
export default ActivityManage
