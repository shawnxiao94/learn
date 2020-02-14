import React, { PureComponent } from 'react'
import SearchBar from '@/components/UI/SearchBar'
import { Form, Input, Button, Checkbox, Row, Col, Select, DatePicker, Icon, Spin } from 'antd'
import PropTypes from 'prop-types'
const { RangePicker } = DatePicker
const { Option } = Select

class Search extends PureComponent {
  static contextTypes = {
    // 设置标签
    setSelectedTags: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      // 全选
      checkAll: {
        // value
        value: false,
        // 半全选状态
        indeterminate: false
      },
      // 下拉数据
      options: {
        // 所属公司渠道
        sources: [],
        // 类别
        category: [],
        // 标签类型
        tagsTypes: [
          { label: '手工型', code: 'manual' },
          { label: '统计型', code: 'statistical' },
          { label: '算法型', code: 'algorithm' }
        ]
      },
      loadings: {
        sources: false,
        category: false
      },
      layout: this.props.layout || {
        span: 8
      }
    }
    /**
     * 解决事件匿名函数不断触发render问题
     */
    this.handleSearch = this.handleSearch.bind(this)
    this.handleCheckAllChange = this.handleCheckAllChange.bind(this)
    this.handleClearAllTags = this.handleClearAllTags.bind(this)
  }

  componentDidMount() {
    // 获取所属公司渠道数据
    this.getSourcesData()
    // 获取标签类别数据
    this.getCategoryData()
  }

  /**
   * 获取所属公司渠道数据
   */
  getSourcesData() {
    this.setState(({ loadings }) => ({ loadings: { ...loadings, sources: true } }))
    this.props.api.selectTagsQuerySources({ tagQuerySourceReq: {} })
      .then(res => {
        this.setState(({ options }) => ({ options: { ...options, sources: res } }))
      })
      .catch(res => {
      })
      .finally(() => {
        this.setState(({ loadings }) => ({ loadings: { ...loadings, sources: false } }))
      })
  }

  /**
   * 获取标签类别数据
   */
  getCategoryData() {
    this.setState(({ loadings }) => ({ loadings: { ...loadings, category: true } }))
    this.props.api.queryCategory({ tagCategoryReq: { vagueName: '' } })
      .then(res => {
        this.setState(({ options }) => ({ options: { ...options, category: res.categroys } }))
      })
      .catch(res => {
      })
      .finally(() => {
        this.setState(({ loadings }) => ({ loadings: { ...loadings, category: false } }))
      })
  }

  /**
   * 表格相应变化
   */
  handleSearch(e) {
    // 解决ant design表单提交刷新问题
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.search(this.props.form.getFieldsValue())
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.checkType !== nextProps.checkType) {
      this.setCheckAllStatus(nextProps.checkType)
    }
  }

  /**
   * @see 全选相关代码
   */
  /**
   * 设置全选状态
   */
  setCheckAllStatus(type) {
    if (type === 'all') {
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: true, indeterminate: false } }))
    } else if (type === 'indeterminate') {
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: false, indeterminate: true } }))
    } else {
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: false, indeterminate: false } }))
    }
  }
  /**
   * 状态改变触发
   */
  handleCheckAllChange(e) {
    /**
     * 判断当前最多选择多少个标签
     */
    if (e.target.checked && !window.isEmpty(this.props.maxLength) && !this.props.SelectionTags.checkMaxTags(true)) {
      e.preventDefault()
      return
    }
    this.props.setCheckAllStatus(e.target.checked ? 'all' : false)
  }
  /**
   * 删除按钮触发
   */
  handleClearAllTags() {
    this.context.setSelectedTags([])
  }
  /**
   * @see End全选相关代码
   */

  /**
   * 重置
   */
  resetForm() {
    this.props.form.resetFields()
    this.handleSearch()
  }
  
  render() {
    let formItemLayout =
    {
      labelCol: {
        xs: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 19 }
      }
    }
    let formNoLabel =
    {
      wrapperCol: {
        xs: { span: 24 }
      }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <SearchBar>
        <div className='search-bar-block' style={{ 'margin-bottom': '5px' }}>
          <Form layout='inline' onSubmit={this.handleSearch} {...formItemLayout}>
            <Row gutter={32}>
              <Col {...this.state.layout}>
                <Form.Item label='所属公司' colon={false} style={{ 'margin-right': 0, 'width': '100%' }}>
                  <Spin spinning={this.state.loadings.sources}>
                    {getFieldDecorator('querychannelCodes')(
                      <Select
                        placeholder='请选择所属公司'
                        allowClear
                        mode='multiple'
                        showArrow='true'
                      >
                        {this.state.options.sources.map(
                          (item, index) => <Option value={item.channelCode} key={item.channelCode}>{item.channelName}</Option>)}
                      </Select>
                    )}
                  </Spin>
                </Form.Item>
              </Col>
              <Col {...this.state.layout}>
                <Form.Item label='标签类型' colon={false} style={{ 'margin-right': 0, 'width': '100%' }}>
                  {getFieldDecorator('tagTypes')(
                    <Select
                      placeholder='请选择标签类型'
                      allowClear
                      mode='multiple'
                      showArrow='true'
                    >
                      {this.state.options.tagsTypes.map(
                        (item, index) => <Option value={item.code} key={item.code}>{item.label}</Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col {...this.state.layout}>
                <Form.Item label='有效期' colon={false} style={{ 'margin-right': 0, 'width': '100%' }}>
                  {getFieldDecorator('date')(
                    <RangePicker />
                  )}
                </Form.Item>
              </Col>
              <Col {...this.state.layout}>
                <Form.Item label='标签类别' colon={false} style={{ 'margin-right': 0, 'width': '100%' }}>
                  <Spin spinning={this.state.loadings.category}>
                    {getFieldDecorator('tagCategoryId')(
                      <Select
                        placeholder='请选择标签类别'
                        allowClear
                      >
                        {this.state.options.category.map(
                          (item, index) => <Option value={item.id} key={item.id}>{item.categoryName}</Option>)}
                      </Select>
                    )}
                  </Spin>
                </Form.Item>
              </Col>
              <Col {...this.state.layout}>
                <Form.Item label='标签名称' colon={false} style={{ 'margin-right': 0, 'width': '100%' }}>
                  {getFieldDecorator('tagName')(
                    <Input autocomplete='off'
                      allowClear
                      placeholder='请输入标签名称' />
                  )}
                </Form.Item>
              </Col>
              <Col {...this.state.layout}>
                <Form.Item
                  {...formNoLabel}
                  style={{
                    'margin-right': 0,
                    'width': '100%'
                  }}
                >
                  <div
                    style={{
                      'display': 'flex',
                      'justify-content': 'space-between',
                      width: '100%'
                    }}>
                    <span>
                      <Button htmlType='submit' type='primary'>
                        查询
                      </Button>
                      <Button onClick={this.resetForm.bind(this)} style={{ 'margin-left': '16px' }}>
                        重置
                      </Button>
                    </span>
                    <span>
                      <Button
                        type='link'
                        onClick={this.handleClearAllTags}
                        style={{ 'padding-left': '5px' }}
                      >
                        <Icon type='delete' />
                        删除
                      </Button>
                      <Checkbox
                        indeterminate={this.state.checkAll.indeterminate}
                        checked={this.state.checkAll.value}
                        onChange={this.handleCheckAllChange}
                      >
                        <span style={{ color: '#1B87ED' }}>全选</span>
                      </Checkbox>
                    </span>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </SearchBar>
    )
  }
}

export default Form.create({})(Search)