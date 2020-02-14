import React, { Component } from 'react'
import SearchBar from '@/components/UI/SearchBar'
import { Form, Input, Button, Select, Spin } from 'antd'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
const { Option } = Select
/**
 * 注入this.props.form内部类
 * 绑定传入对象 即时更新
 */
@inject('PagesApi')
@observer
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      /**
       * loadings
       */
      loadings: {
        sourceOptions: false
      }
    }
    /**
     * 解决事件匿名函数不断触发render问题
     */
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentDidMount() {
    this.getData()
  }
  /**
   * 表格相应变化
   */
  handleSearch(e) {
    // 解决ant design表单提交刷新问题
    e && e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.search(this.props.form.getFieldsValue())
      }
    })
  }
  
  /**
   * 重置
   */
  resetForm() {
    this.props.form.resetFields()
    this.handleSearch()
  }

  /**
   * 获取下拉数据
   * 判断mobx仓库里是否加载过下拉数据，如果没有则加载
   */
  getData() {
    const { FromSelect, getFromSelect } = this.props.PagesApi
    if (FromSelect.length < 1) {
      this.setState(({ loadings }) => ({ loadings: { ...loadings, sourceOptions: true } }))
      getFromSelect().finally(() => {
        this.setState(({ loadings }) => ({ loadings: { ...loadings, sourceOptions: false } }))
      })
    }
  }
  
  render() {
    const { getFieldDecorator } = this.props.form
    const { FromSelect = [] } = this.props.PagesApi
    return (
      <SearchBar className='search-bar-no-flex'>
        <div className='search-bar-block'>
          <Form layout='inline' onSubmit={this.handleSearch.bind(this)}>
            <Form.Item label='画像来源' colon={false}>
              <Spin spinning={this.state.loadings.sourceOptions} >
                {getFieldDecorator('channelCodes')(
                  <Select
                    style={{ width: '200px' }}
                    mode='multiple'
                    showArrow='true'
                    placeholder='请选择'
                    allowClear
                  >
                    {FromSelect.map(item => (
                      <Option value={item.channelCode} key={item.channelCode}>{item.channelName}</Option>
                    ))}
                  </Select>
                )}
              </Spin>
            </Form.Item>
            <Form.Item label='画像名' colon={false}>
              {getFieldDecorator('portraitName')(
                <Input
                  style={{ width: '240px' }}
                  placeholder='请输入'
                  allowClear
                  autocomplete='off'
                />
              )}
            </Form.Item>
            <Form.Item label='画像状态' colon={false}>
              {getFieldDecorator('statuss')(
                <Select
                  style={{ width: '200px' }}
                  mode='multiple'
                  showArrow='true'
                  placeholder='请选择'
                  allowClear
                >
                  {this.props.options.isOpenOptions.map(item => (
                    <Option value={item.code} key={item.code}>{item.name}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' type='primary'>
                查询
              </Button>
              <Button onClick={this.resetForm.bind(this)} style={{ 'margin-left': '16px' }}>
                重置
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='search-bar-block'>
          <Form layout='inline'>
            <Form.Item>
              <Link to={'/portrait-manage/add'}>
                <Button type='primary'>新增</Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </SearchBar>
    )
  }
}

export default Form.create()(Search)