/**
  * description: 用户群管理
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { PureComponent } from 'react'
import SearchBar from '@/components/UI/SearchBar'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button, Select } from 'antd'
const { Option } = Select

@inject('PagesApi')
@observer
class Search extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      /**
       * 下拉数据
       */
      options: {
        /**
         * 状态
         */
        statuss: [
          { name: '生效中', code: 1 },
          { name: '未生效', code: 2 },
          { name: '已失效', code: 0 }
        ]
      },
      loading: false
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
    const { FromSelect, getFromSelect } = this.props.PagesApi
    /**
     * 获取下拉数据
     * 判断mobx仓库里是否加载过下拉数据，如果没有则加载
     */
    if (FromSelect.length < 1) {
      this.setState({ loading: true })
      getFromSelect().finally(() => {
        this.setState({ 'loading': false })
      })
    }
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
    const { FromSelect = [] } = this.props.PagesApi
    let _FromSelect = FromSelect.filter(item => {
      return item.channelCode !== '00'
    })
    return (
      <SearchBar>
        <Form layout='inline' onSubmit={this.handleSearch} className='w-ant-form-padding-none'>
          <Form.Item label='用户群名' colon={false}>
            {getFieldDecorator('name')(
              <Input
                style={{ width: '240px' }}
                placeholder='请输入'
                allowClear
                autocomplete='off'
              />
            )}
          </Form.Item>
          <Form.Item label='所属部门' colon={false}>
            {getFieldDecorator('channelCodes')(
              <Select
                style={{ width: '200px' }}
                mode='multiple'
                showArrow='true'
                placeholder='请选择'
                allowClear
              >
                {_FromSelect.map(item => (
                  <Option value={item.channelCode} key={item.channelCode}>{item.channelName}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label='状态' colon={false}>
            {getFieldDecorator('statuss')(
              <Select
                style={{ width: '200px' }}
                mode='multiple'
                showArrow='true'
                placeholder='请选择'
                allowClear
              >
                {this.state.options.statuss.map(item => (
                  <Option value={item.code} key={item.code}>{item.name}</Option>
                ))}
              </Select>
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