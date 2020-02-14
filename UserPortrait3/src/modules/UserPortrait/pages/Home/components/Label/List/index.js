/**
  * description: 标签管理 - 列表
  * author: Emma
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { Component } from 'react'
import { message, List, Tag, Input, Spin, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import * as api from '@/modules/UserPortrait/data/api/Home/Label'
import StateSet from '@/components/UI/StateSet/index'
import SvgIcon from '@/components/SvgIcon'
import filters from '@/common/filters'
import LabelButton from '@/modules/UserPortrait/pages/LabelManage/components/Button/index.js'
import Empty from '@/components/UI/Empty'
const { Search } = Input

class LableTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      // 用户数
      userCounts: [],
      // 页面加载 loading
      loading: false,
      // 表单
      form: {
        // 标签名称
        name: '',
        // 标签状态
        isOpenStatus: [],
        // 当前页 开始页
        pageNumber: 1,
        // 一页展示多少条
        pageSize: 3
      },
      options: {
        /**
         * 状态码配置
         * 1：生效中、2：未生效、3：已失效
         */
        status: filters.STATUS
      },
      shareData: [],
      shareLoading: false
    }
    
    /**
     * 解决事件匿名函数不断触发render问题
     */
    this.getShareDataById = this.getShareDataById.bind(this)
  }
  /**
   * 在第一次渲染后调用
   */
  componentDidMount() {
    this.getData()
    // this.getShareDataById()
  }

  getShareDataById(item) {
    this.setState({ 'shareLoading': true, 'shareData': [] })
    // 获取标签列表数据
    api.queryShareChannelName({ tagId: item.id }).then(_ => {
      let res = _ || {}
      this.setState({ 'shareData': res.Result.data })
    }).catch(_ => {
      message.error('获取共享标签失败!')
    })
      .finally(() => {
        this.setState({ 'shareLoading': false })
      })
  }
  /**
   * 获取点击标签类型
   */
  getStatusByNum(values) {
    let form = this.state.form
    form.isOpenStatus = values
    form.pageNumber = 1
    this.setState({
      form: form
    })
    this.getData()
  }
  /**
   * 获取标签列表数据
   */
  getData() {
    this.setState({ 'loading': true })
    // 获取标签列表数据
    api.getLabelList(this.state.form).then(_ => {
      let res = _ || {}
      this.setState({ 'data': res })
      // 查询用户数
      if (res.content && res.content.length) {
        // 根据标签列表数据 - 查询对应的用户数
        api
          .queryTagUserCounts(res)
          .then(clitems => {
            let userCounts = []
            res.content.forEach(dataItme => {
              clitems.Result.data.find(clidto => {
                if (dataItme.id === clidto.id) {
                  userCounts.push(clidto.userCounts)
                  return true
                }
              })
            })
            this.setState({ 'userCounts': userCounts })
          })
          .catch(() => {
            message.error('获取用户数失败!')
          })
      }
    }).catch(() => {
      message.error('获取标签列表失败!')
    })
      .finally(() => {
        this.setState({ 'loading': false })
      })
  }
  render() {
    return (
      <div>
        <div className='display-flex'>
          <Search
            placeholder='请输入...'
            onSearch={value => {
              let data = this.state.form
              data.name = value
              data.pageNumber = 1
              this.setState({
                form: data
              })
              this.getData()
            }}
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
                onChange: page => {
                  let data = this.state.form
                  data.pageNumber = page
                  this.setState({
                    form: data
                  })
                  this.getData()
                },
                defaultCurrent: this.state.data.number,
                current: this.state.data.number,
                total: this.state.data.totalElements,
                pageSize: this.state.form.pageSize
              }}
              dataSource={this.state.data.content}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <SvgIcon iconClass={filters.channelFiltersIcon(item.channelCode)} />
                    }
                    title={
                      <div className='c-ant-list-theme-title c-ant-tag-theme-a'>
                        <Link to={{ pathname: `/label-manage/detail/${item.id}?clientTotals=${encodeURIComponent(item.clientTotals)}&isOpen=${encodeURIComponent(item.isOpen)}`, state: { data: item }, params: { id: item.id } }}>
                          {item.label}
                        </Link>
                        <Tag color={filters.statusColor(item.isOpen)}>{filters.statusFilters(item.isOpen)}</Tag>
                      </div>
                    }
                    description={
                      <div className='c-ant-list-theme-desc-ellipsis'>
                        <span title={item.channelName} >
                          {item.channelName}
                        </span>
                        <span title={filters.empty(this.state.userCounts[index])}>
                          用户数 <span className='number'>{filters.empty(this.state.userCounts[index])}</span>
                        </span>
                        <span title={filters.empty(item.portraitTotals)}>
                          关联画像 <span className='number'>{filters.empty(item.portraitTotals)}</span>
                        </span>
                        <span title={filters.empty(item.shareChannelTotals)}
                          onMouseEnter={ item.shareChannelTotals > 0 && this.getShareDataById.bind(this, item)}>
                          分享
                          {item.shareChannelTotals === 0
                            ? <span className='number'>
                              {filters.empty(item.shareChannelTotals)}
                            </span>
                            : <Tooltip
                              defaultVisible={this.shareLoading}
                              title={(
                                <div >
                                  {this.state.shareData.length > 0 && this.state.shareData.map((item, index) => {
                                    return (
                                      this.state.shareData.length - 1 === index ? <span key={index}>{item}</span> : <span key={index}>{item}&nbsp;&nbsp;</span>
                                    )
                                  })}
                                </div>
                              )}>
                              <span className='number'>
                                {filters.empty(item.shareChannelTotals)}
                              </span>
                            </Tooltip>
                          }
                        </span>
                      </div>
                    }
                  />
                  <div style={{ 'width': '120px', 'text-align': 'right' }}>
                    <LabelButton data={item} key={Math.random()} />
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
export default LableTable