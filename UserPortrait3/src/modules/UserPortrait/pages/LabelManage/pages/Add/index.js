import React, { Component } from 'react'
import { Row, Col, Card,
  Form,
  Select,
  Spin,
  message
} from 'antd'
import { withRouter } from 'react-router-dom'
/**
 * 统计型
 */
import StatisticsLabelForm from './components/StatisticsLabelForm'
/**
 * 手工型
 */
import ManualLabelForm from './components/ManualLabelForm'
/**
 * 算法型
 */
import AlgorithmLabelForm from './components/AlgorithmLabelForm'
import * as api from '@/modules/UserPortrait/data/api/LabelManage'
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'
const { Option } = Select

@withRouter
@inject('CRouteCrumb')
class Add extends Component {
  static childContextTypes = {
    // 是否为编辑
    isEdit: PropTypes.bool
  }
  getChildContext() {
    return {
      isEdit: this.state.isEdit
    }
  }
  constructor(props) {
    super(props)
    let id = (this.props.location.params && this.props.location.params.id) || this.props.match.params.id
    this.state = {
      // 标签类型
      type: 'statistical',
      // 编辑ID
      id: id,
      // 是否为编辑页面
      isEdit: !!id,
      // 回显数据
      data: undefined,
      // loading
      loading: false
    }
    this.handleTypeChange = this.handleTypeChange.bind(this)
  }

  /**
   * 页面初始化
   */
  componentWillMount() {
    if (this.state.isEdit) {
      this.props.CRouteCrumb.setLabel('标签编辑')
      this.setEditFormData()
    }
  }
  
  /**
   * 当标签类型改变时触发
   */
  handleTypeChange(value) {
    this.setState({ type: value })
  }

  /**
   *  编辑时数据回显
   */
  setEditFormData() {
    this.setState({ loading: true })
    api.queryTagByTagId({ id: this.state.id }).then(response => {
      if (!response.tagDto) {
        return Promise.reject(new Error('获取标签编辑回显数据失败!'))
      }
      this.setState({
        type: response.tagDto.tagType
      }, () => {
        this.setState({
          data: response
        })
      })
    }).catch(() => {
      message.error('获取标签编辑回显数据失败!')
    })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    /**
     * 表单布局
     */
    let formItemLayout =
    {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        xxl: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        xxl: { span: 21 }
      }
    }
    let tailFormItemLayout =
    {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 20,
          offset: 4
        },
        xxl: {
          span: 21,
          offset: 3
        }
      }
    }
    return (
      <Spin spinning={this.state.loading} >
        <Card bordered={false}>
          <Row gutter={16} style={{ 'margin-top': '24px' }}>
            <Col span={24}>
              <Form
                {...formItemLayout}
                style={{ 'margin': 'auto' }}
                className='c-form'
              >
                <Form.Item label='标签类型' colon={false}>
                  <Select
                    disabled={this.state.isEdit}
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                  >
                    <Option value='statistical'>统计型</Option>
                    <Option value='manual'>手工型</Option>
                    <Option value='algorithm'>算法型</Option>
                  </Select>
                </Form.Item>
              </Form>
              {this.state.type === 'statistical' &&
              <StatisticsLabelForm
                isEdit={this.state.isEdit}
                data={this.state.data}
                formItemLayout={formItemLayout}
                tailFormItemLayout = {tailFormItemLayout}
              />
              }
              {this.state.type === 'manual' &&
              <ManualLabelForm
                isEdit={this.state.isEdit}
                data={this.state.data}
                formItemLayout={formItemLayout}
                tailFormItemLayout = {tailFormItemLayout}
              />
              }
              {(this.state.type === 'algorithm') &&
              <AlgorithmLabelForm
                isEdit={this.state.isEdit}
                data={this.state.data}
                formItemLayout={formItemLayout}
                tailFormItemLayout = {tailFormItemLayout}
              />
              }
            </Col>
            <Col span={8} />
          </Row>
        </Card>
      </Spin>
    )
  }
}
export default Add