/**
  * description: Search
  */
import React, { Component } from 'react'
import SearchBar from '@/components/UI/SearchBar'
import { Form, Button, Select, message, Spin } from 'antd'
/**
 * 根据子活动信息查找子群信息
 */
import { queryUserShareGroupByChildActivityId } from '@/modules/UserPortrait/data/api/ActivityManage/ViewData'
import SelectDate from '@/components/Date/SelectDate'
const { Option } = Select
 
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      /**
       * loadings
       */
      loadings: {
        groupOptions: false
      },
      /**
        * 下拉数据
        */
      options: {
        /**
         * 用户群组筛选
         */
        groupOptions: [],
        /**
         * 营销渠道
         */
        markChannelOptions: [
          { name: '全部', code: 'all' },
          { name: 'App', code: '10001' },
          { name: 'Web', code: '10002' },
          { name: 'Phone', code: '10003' },
          { name: 'SMS', code: '10004' },
          { name: 'WeChat', code: '10005' }
        ],
        /**
         * 数据类型
         */
        dataTypeOptions: [
          { code: '01', name: '按人数查询' },
          { code: '02', name: '按次数查询' }
        ]
      }
    }
    /**
      * 解决事件匿名函数不断触发render问题
      */
    this.handleSearch = this.handleSearch.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }
  /**
    * 组件生命周期挂载钩子
    */
  componentDidMount() {
    this.initOptions()
    this.handleSearch()
  }
 
  /**
    * 初始化下拉框
    */
  initOptions() {
    /**
     * 只有子群才有用户群筛选
     */
    !!this.props.parentId && this.queryUserShareGroupByChildActivityId()
  }

  /**
   * 根据子活动信息查找子群信息
   */
  queryUserShareGroupByChildActivityId() {
    this.setState(({ loadings }) => ({ loadings: { ...loadings, groupOptions: true } }))
    queryUserShareGroupByChildActivityId({
      actId: this.props.marketId
    })
      .then(res => {
        this.setState(({ options }) => ({ options: { ...options, groupOptions: res.Result.data } }))
      })
      .catch(() => {
        message.error('获取用户群组数据失败!')
      })
      .finally(() => {
        this.setState(({ loadings }) => ({ loadings: { ...loadings, groupOptions: false } }))
      })
  }

  /**
    * 点击查询
    */
  handleSearch(e) {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.search(this.props.form.getFieldsValue())
      }
    })
    e && e.preventDefault()
  }
 
  /**
    * 重置
    */
  resetForm() {
    this.props.form.resetFields()
    this.handleSearch()
  }
 
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <SearchBar className='search-bar-padding-none'>
        <Form layout='inline' onSubmit={this.handleSearch} className='w-ant-form-padding-none'>
          {
            /**
             * 只有子群才有用户群筛选
             */
            !!this.props.parentId &&
            <Form.Item label='用户群组筛选' colon={false}>
              <Spin spinning={this.state.loadings.groupOptions} >
                {getFieldDecorator('groupSearch', {
                  initialValue: []
                })(
                  <Select
                    style={{ width: '200px' }}
                    mode='multiple'
                    showArrow='true'
                    placeholder='请选择'
                    allowClear
                  >
                    {this.state.options.groupOptions.map(item => (
                      <Option value={item.id + '///' + item.colMapping} key={item.id}>{item.name}</Option>
                    ))}
                  </Select>
                )}
              </Spin>
            </Form.Item>
          }
          <Form.Item label='营销渠道' colon={false}>
            {getFieldDecorator('tagId', {
              initialValue: 'all'
            })(
              <Select
                style={{ width: '200px' }}
                placeholder='请选择'
              >
                {this.state.options.markChannelOptions.map(item => (
                  <Option value={item.code} key={item.code}>{item.name}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label='数据类型' colon={false}>
            {getFieldDecorator('dataType', {
              initialValue: '01'
            })(
              <Select
                style={{ width: '200px' }}
                placeholder='请选择'
              >
                {this.state.options.dataTypeOptions.map(item => (
                  <Option value={item.code} key={item.code}>{item.name}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item colon={false}>
            {getFieldDecorator('date', {
              initialValue: {
                dateType: 'cycle',
                cycle: '7'
              }
            })(
              <SelectDate
                types={
                  ['cycle', 'months', 'dates']
                }
              />
            )}
          </Form.Item>
          <div className='search-btn'>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                 查询
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={this.resetForm}>
                 重置
              </Button>
            </Form.Item>
          </div>
        </Form>
      </SearchBar>
    )
  }
}
 
export default Form.create({})(Search)