/**
  * description: BI报表分析历史数据
  * author: William
  */
import React, { PureComponent } from 'react'
import { message, Card, Table, Input } from 'antd'
import TableGroup from '@/components/UI/TableGroup'
import filters from '@/common/filters'
import { Link } from 'react-router-dom'
import * as api from '@/modules/UserPortrait/data/api/GroupManage'
import SearchBar from '@/components/UI/SearchBar'
import SvgIcon from '@/components/SvgIcon'
const { Column } = Table
const { Search } = Input
class AnalysisHistory extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      pagination: {},
      form: {
        historyName: '',
        pageNumber: 1,
        pageSize: 10,
        userGroupId: (this.props.location.params && this.props.location.params.id) || this.props.match.params.id
      }
    }
    // 获取列表数据
    this.handleTableChange = this.handleTableChange.bind(this)
  }
  
  /**
   * 表格相应变化
   */
  handleTableChange(pagination, filters, sorter) {
    const form = { ...this.state.form }
    form.pageNumber = pagination.current
    this.handleSearch(form)
  }

  /**
   * 点击查询
   */
  handleSearch(form) {
    form.pageNumber = form.pageNumber || 1
    this.setState({ form: Object.assign({}, this.state.form, form) }, () => {
      this.getAnalysisHistoryList()
    })
  }
  
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.getAnalysisHistoryList()
    /**
     * 缓存页面
     */
    this.props.ensureDidMount && this.props.ensureDidMount()
  }
  
  /**
   * 获取BI分析列表数据
   */
  getAnalysisHistoryList() {
    let self = this
    self.setState({ 'loading': true })
    api
      .queryBiHistory(this.state.form)
      .then(res => {
        self.state.pagination = {
          current: res.Result.data.number,
          pageSize: res.Result.data.size,
          total: res.Result.data.totalElements
        }
        self.setState({ 'data': res.Result.data.content })
      })
      .catch(() => {
        message.error('获取BI分析列表失败!')
      })
      .finally(() => {
        self.setState({ 'loading': false })
      })
  }
  
  render() {
    return (
      <Card bordered={false}>
        <SearchBar>
          <div className='search-bar-left'></div>
          <div className='search-bar-right'>
            <Search
              placeholder='请输入...'
              onSearch={value => {
                let data = this.state.form
                data.historyName = value
                data.pageNumber = 1
                this.setState({
                  form: data
                })
                this.getAnalysisHistoryList()
              }}
              style={{ width: 208 }}
            />
          </div>
        </SearchBar>
        <TableGroup>
          <Table
            dataSource={this.state.data}
            rowKey={record => record.id}
            loading={this.state.loading}
            pagination={this.state.pagination}
            onChange={this.handleTableChange}
          >
            <Column
              title='BI名称'
              dataIndex='historyName'
              key='historyName'
            />
            <Column
              title='BI来源'
              dataIndex='analysisName'
              key='analysisName'
            />
            <Column
              title='创建日期'
              dataIndex='analysisDate'
              key='analysisDate'
              render={values => (
                filters.parseDate(values, 'YYYY-MM-DD')
              )}
            />
            <Column
              fixed='right'
              title='操作'
              width='150px'
              key='action'
              render={tags => (
                <Link
                  className='tooltip-link'
                  to={{
                    pathname: `/group-manage/analysis-bi/${this.state.form.userGroupId}/${tags.id}?historyName=${encodeURIComponent(encodeURIComponent(tags.historyName))}`,
                    params: {
                      userGroupId: this.state.form.userGroupId,
                      historyId: tags.id
                    }
                  }}>
                  <SvgIcon iconClass='ope-edit' />
                </Link>
              )}
            />
          </Table>
        </TableGroup>
      </Card>
    )
  }
}
    
export default AnalysisHistory