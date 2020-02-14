/**
  * description: 活动管理列表搜索组件
  * author: William
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { PureComponent } from 'react'
import { Form, Input, Button, Select } from 'antd'
import SearchBar from '@/components/UI/SearchBar'
import { Link } from 'react-router-dom'
const { Option } = Select

/**
 * 注入this.props.form内部类
 * 绑定传入对象 即时更新
 */
@Form.create()
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
          {
            code: 1,
            name: '进行中'
          },
          {
            code: 2,
            name: '未开始'
          },
          {
            code: 0,
            name: '已结束'
          },
          {
            code: 3,
            name: '满期'
          },
          {
            code: 4,
            name: '无用户群'
          }
        ]
      }
    }
    /**
     * 解决事件匿名函数不断触发render问题
     */
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentDidMount() {
    this.handleSearch()
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
    // <Form.Item>
    //   <Button onClick={this.resetForm.bind(this)}>
    //     重置
    //   </Button>
    // </Form.Item>
    this.props.form.resetFields()
    this.handleSearch()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <SearchBar>
        <div className='search-bar-left'>
          <Form layout='inline' onSubmit={this.handleSearch} className='w-ant-form-padding-none'>
            <Form.Item label='状态'
              colon={false}>
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
            <Form.Item label='活动名称'
              colon={false}>
              {getFieldDecorator('markName')(
                <Input
                  style={{ width: '240px' }}
                  placeholder='请输入'
                  allowClear
                  autocomplete='off'
                />
              )}
            </Form.Item>
            <Form.Item style={{ 'right': '0px' }}>
              <Button type='primary' htmlType='submit'>
          查询
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='search-bar-right'>
          <Form layout='inline' className='w-ant-form-padding-none'>
            <Form.Item>
              <Link to={'/activity-manage/add'}>
                <Button type='primary' icon='plus'>
              新增
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </SearchBar>
    )
  }
}

export default Search