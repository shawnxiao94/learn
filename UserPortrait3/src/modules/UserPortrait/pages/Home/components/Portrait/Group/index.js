/**
  * description: 画像管理 - 列表
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { message, List, Tag, Input, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { getPortraitList } from '@/modules/UserPortrait/data/api/Home/Portrait'
import StateSet from '@/components/UI/StateSet/index'
import SvgIcon from '@/components/SvgIcon'
import filters from '@/common/filters'
import GroupButton from '@/modules/UserPortrait/pages/PortraitManage/components/Button.js'
import Empty from '@/components/UI/Empty'

const { Search } = Input
class group extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      form: {
        // 画像名称
        portraitName: '',
        // 渠道code
        channelCodes: [],
        // 画像状态
        statuss: [],
        // 排序Name
        sortName: '',
        // 排序值
        sortType: '',
        pageNumber: 1,
        pageSize: 3
      },
      options: {
        /**
         * 状态码配置
         * 1：生效中、2：未生效、3：已失效
         */
        status: filters.STATUS
      }
    }
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.getPortraitData()
  }
  /**
   * 获取画像管理列表
   */
  getPortraitData() {
    this.setState({ 'loading': true })
    getPortraitList(this.state.form).then(res => {
      this.setState({ 'data': res })
    }).catch(() => {
      message.error('获取画像列表失败!')
    }).finally(() => {
      this.setState({ 'loading': false })
    })
  }
  /**
   * 搜索按钮
   */
  searchbtn(value) {
    let data = this.state.form
    data.portraitName = value
    data.pageNumber = 1
    this.setState({
      form: data
    })
    this.getPortraitData()
  }
  /**
   * 状态按钮搜索
   */
  getStatusByNum(values) {
    let form = this.state.form
    form.statuss = values
    form.pageNumber = 1
    this.setState({
      form: form
    })
    this.getPortraitData()
  }
  /**
   * 搜索分页变化
   * @param {Number} page 分页
   */
  changePage(page) {
    let data = this.state.form
    data.pageNumber = page
    this.setState({
      form: data
    })
    this.getPortraitData()
  }
  render() {
    return (
      <div>
        <div className='display-flex'>
          <Search
            placeholder='请输入...'
            onSearch={this.searchbtn.bind(this)}
            style={{ width: 208 }}
          />
          <StateSet data={this.state.options.status} changes={this.getStatusByNum.bind(this)} />
        </div>
        <Spin spinning={this.state.loading}>
          <div className='c-ant-list-theme' style={{ 'height': '302px' }}>
            <List
              size='large'
              locale={
                {
                  emptyText: <div className='w-public-empty-wrapper' style={{ height: '270px' }}><Empty /></div>
                }
              }
              pagination={this.state.data.content && !!this.state.data.content.length && {
                onChange: this.changePage.bind(this),
                defaultCurrent: this.state.data.number,
                current: this.state.data.number,
                total: this.state.data.totalElements,
                pageSize: this.state.form.pageSize
              }}
              dataSource={this.state.data.content}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <SvgIcon iconClass={filters.channelFiltersIcon(item.channelCode)} />
                    }
                    title={
                      <div className='c-ant-list-theme-title c-ant-tag-theme-a'>
                        <Link style={{ width: '40%' }}
                          to={{
                            pathname: `/portrait-manage/detail/${item.id}`,
                            state: { data: item },
                            params: { id: item.id }
                          }}
                        >
                          {item.portraitName}
                        </Link>
                        <Tag color={filters.statusColor(item.status)}>{filters.statusFilters(item.status)}</Tag>
                      </div>
                    }
                    description={
                      <div className='c-ant-list-theme-desc-ellipsis'>
                        <span title={item.channelName} style={{ width: '40%' }}>
                          {item.channelName}
                        </span>
                        <span title={item.tagSum}>
                          标签数 <span className='number'>{filters.empty(item.tagSum)}</span>
                        </span>
                      </div>
                    }
                  />
                  <div style={{ 'width': '140px', 'text-align': 'right' }}>
                    <GroupButton data={item} key={Math.random()} />
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Spin>
      </div>
    )
  }
}
export default group