/**
  * description: 用户群管理主体 卡槽
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { Card, Icon, message } from 'antd'
import Search from './Search.js'
import TableList from './TableList.js'
import * as api from '@/modules/UserPortrait/data/api/Home/GroupManage'
import { Link } from 'react-router-dom'
class GroupManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      form: {
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
    this.setState({ loading: true })
    api.getGroupList(this.state.form).then(response => {
      const form = { ...this.state.form }
      response.pagination = {
        current: form.current,
        pageSize: form.pageSize,
        total: response.totalElements
      }
      this.setState({
        defaultExpandedRowKeys: this.setDefaultExpandedRowKeys(response),
        data: response
      })
    }).catch(() => {
      message.error('获取用户群列表失败!')
    }).finally(() => {
      this.setState({ 'loading': false })
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
    form.sortField = sorter.field
    form.sortOrder = sorter.order
    this.handleSearch(form)
  }

  render() {
    // 标签管理列表 导航信息
    let _extra = (
      <React.Fragment>
        {/*
        <span>
          <Link to={{ pathname: '/label-manage/add' }}><Icon type='file-add' /></Link>
        </span>
         */}
        <span style={{ 'margin-left': '15px' }}>
          <Link to={'/group-manage'}><Icon type='menu' /></Link>
        </span>
      </React.Fragment>
    )
    return (
      <Card title='用户群管理' bordered={false} style={{ 'margin-top': '16px' }} extra={_extra}>
        <Search search={this.handleSearch} />
        <TableList
          defaultExpandedRowKeys={this.state.defaultExpandedRowKeys}
          data={this.state.data}
          loading={this.state.loading}
          handleTableChange={this.handleTableChange}
        />
      </Card>
    )
  }
}
export default GroupManage