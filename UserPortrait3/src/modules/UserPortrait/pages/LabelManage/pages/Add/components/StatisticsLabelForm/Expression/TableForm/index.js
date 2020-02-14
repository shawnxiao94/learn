import React, { Component } from 'react'
import { Form, Table, Divider, Button, message } from 'antd'
/**
 *  表达式字段子组件
 */
import PropertyCodeItem from './PropertyCodeItem'
/**
 *  规则关系子组件
 */
import ExpressionLogicSymbol from './ExpressionLogicSymbol'
/**
 *  表达式关系子组件
 */
import ExpressionRelationSymbol from './ExpressionRelationSymbol'
/**
 *  选择是否分组
 */
import GroupFlag from './GroupFlag'
/**
 *  值/范围子组件
 */
import ExpressionValue from './ExpressionValue'
/**
 *  预览规则
 */
import PreviewRule from './PreviewRule'
import { deepClone } from '@/common/utils'
const { Column } = Table
class TableForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
      // 校验规则
      expressionValueRules: {},
      // 最多选择几条
      maxLength: 5
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelect = this.handleDelect.bind(this)
    this.handlePropertyCodeChange = this.handlePropertyCodeChange.bind(this)
    this.setExpressionValueRules = this.setExpressionValueRules.bind(this)
  }

  /**
   * 监听data
   */
  watchData() {
    this.props.bindChildData(this.state.data)
  }

  /**
   * 设置校验规则
   */
  setExpressionValueRules(key, rules, validateTrigger) {
    this.setState(({ expressionValueRules }) => ({
      expressionValueRules: { ...expressionValueRules,
        [key]: {
          rules: rules,
          validateTrigger: validateTrigger || 'onChange'
        }
      }
    }))
  }

  /**
   * 保存/编辑单行
   */
  handleEditRow(item, data, index) {
    let _data = [...this.state.data]
    if (_data[index].edit) {
      let fieldsValue = this.props.form.getFieldsValue()
      let keys = Object.keys(fieldsValue).filter(key => {
        return key.includes(`__${item.key}`)
      })
      this.props.form.validateFieldsAndScroll(keys, (err, values) => {
        if (!err) {
          keys.forEach(key => {
            _data[index][key.replace(`__${item.key}`, '')] = fieldsValue[key]
          })
          _data[index].edit = false
          this.setState({ data: _data }, this.watchData)
        }
      })
    } else {
      _data[index].edit = true
      this.setState({
        data: _data
      }, this.watchData)
    }
  }
  /**
   * 添加行
   */
  handleAdd() {
    // 最多选择N条
    if (this.state.maxLength && this.state.data.length === this.state.maxLength) {
      message.warning(`最多选择${this.state.maxLength}条!`)
      return
    }
    let data = [...this.state.data]
    data.push({
      // 表达式字段
      propertyCode: undefined,
      // 规则关系
      expressionLogicSymbol: undefined,
      // 字段/值
      expressionValue: undefined,
      // 表达式关系
      expressionRelationSymbol: '&&',
      expressionRelationSymbolLabel: '并且',
      // 是否分组
      groupFlag: '0',
      groupFlagLabel: '否',
      key: 'rowkeys_' + String(Math.random()).slice(2),
      edit: true
    })
    this.setState({ data: data }, this.watchData)
  }

  /**
   * 删除行
   */
  handleDelect(item, data, index) {
    this.setState(({ data }) => {
      let _data = [...data]
      _data.splice(index, 1)
      return { data: _data }
    }, this.watchData)
  }

  /**
   * 当表达式字段发生变化
   */
  handlePropertyCodeChange(data, item) {
    this.props.form.setFieldsValue({ [`expressionLogicSymbol__${item.key}`]: undefined })
    this.props.form.setFieldsValue({ [`expressionValue__${item.key}`]: undefined })
    if (data.length) {
      item.expressionLogicSymbolOptions = [...data[data.length - 1].characters]
      item.propertyCodeData = [...data]
    } else {
      item.expressionLogicSymbolOptions = []
    }
  }

  /**
   * 当表达式规则关系发生变化
   */
  handleExpressionLogicSymbolChange(data, item) {
    this.props.form.setFieldsValue({ [`expressionValue__${item.key}`]: undefined })
  }

  /**
   * 监听变化
   */
  componentDidMount() {
    this.resetData()
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible && nextProps.visible) {
      this.resetData()
    }
  }

  /**
   * 重置&初始化data
   */
  resetData() {
    this.setState({
      data: (this.props.value && this.props.value.length) ? deepClone(this.props.value) : [
        {
          // 表达式字段
          propertyCode: undefined,
          // 规则关系
          expressionLogicSymbol: undefined,
          // 字段/值
          expressionValue: undefined,
          // 表达式关系
          expressionRelationSymbol: '&&',
          expressionRelationSymbolLabel: '并且',
          // 是否分组
          groupFlag: '0',
          groupFlagLabel: '否',
          key: 'rowkeys_' + String(Math.random()).slice(2),
          edit: true
        }
      ]
    })
  }

  render() {
    let { getFieldDecorator } = this.props.form
    return (
      <div className='w-table-hover-none w-table-form'>
        <Form>
          <Table
            rowKey='key'
            dataSource={this.state.data}
            pagination={false}
          >
            <Column title='字段'
              render={item => {
                if (item.edit) {
                  return (
                    <Form.Item
                      style={{
                        width: '180px'
                      }}
                    >
                      {getFieldDecorator(`propertyCode__${item.key}`, {
                        rules: [
                          {
                            required: true,
                            message: '请选择表达式字段'
                          }
                        ],
                        initialValue: item.propertyCode
                      })(
                        <PropertyCodeItem onChange={(value, label, data) => {
                          this.handlePropertyCodeChange(data, item)
                          item.propertyCodeLabel = label
                        }} />
                      )}
                    </Form.Item>
                  )
                } else {
                  return (
                    <div
                      className='break-all'
                      style={{
                        width: '180px'
                      }}>
                      {item.propertyCodeLabel || item.propertyCode}
                    </div>
                  )
                }
              }}
            />
          
            <Column title='规则关系'
              render={(item, data, index) => {
                if (item.edit) {
                  return (
                    <Form.Item
                      style={{
                        width: '140px'
                      }}
                    >
                      {getFieldDecorator(`expressionLogicSymbol__${item.key}`, {
                        rules: [
                          {
                            required: true,
                            message: '请输入规则关系'
                          }
                        ],
                        initialValue: item.expressionLogicSymbol
                      })(
                        <ExpressionLogicSymbol
                          options={item.expressionLogicSymbolOptions}
                          onChange={(data, label) => {
                            this.handleExpressionLogicSymbolChange(data, item)
                            item.expressionLogicSymbolLabel = label
                          }}
                        />
                      )}
                    </Form.Item>
                  )
                } else {
                  return (
                    <div
                      className='break-all'
                      style={{
                        width: '140px'
                      }}>{item.expressionLogicSymbolLabel || item.expressionLogicSymbol}
                    </div>
                  )
                }
              }}
            />
          
            <Column title='值/范围'
              render={item => {
                if (item.edit) {
                  let expressionValueRules = this.state.expressionValueRules[item.key] || {}
                  return (
                    <Form.Item
                      style={{
                        width: '280px'
                      }}
                    >
                      {getFieldDecorator(`expressionValue__${item.key}`, {
                        rules: expressionValueRules.rules,
                        validateTrigger: expressionValueRules.validateTrigger,
                        initialValue: item.expressionValue
                      })(
                        <ExpressionValue
                          form={this.props.form}
                          data={item}
                          onChange={(value, label) => {
                            item.expressionValueLabel = label
                          }}
                          setExpressionValueRules={this.setExpressionValueRules}
                        />
                      )}
                    </Form.Item>
                  )
                } else {
                  return (
                    <div
                      className='break-all'
                      style={{
                        width: '280px'
                      }}>{item.expressionValueLabel || item.expressionValue}
                    </div>
                  )
                }
              }}
            />
          
            <Column title='表达式关系'
              render={(item, data, index) => {
                // 最后一行没有表达式关系
                if (index === (this.state.data.length - 1)) {
                  return (
                    <div
                      style={{
                        width: '70px'
                      }}>
                      -
                    </div>
                  )
                } else if (item.edit) {
                  return (
                    <Form.Item
                      style={{
                        width: '70px'
                      }}
                    >
                      {getFieldDecorator(`expressionRelationSymbol__${item.key}`, {
                        rules: [
                          {
                            required: true,
                            message: '请选择表达式关系'
                          }
                        ],
                        initialValue: item.expressionRelationSymbol
                      })(
                        <ExpressionRelationSymbol
                          onChange={(value, label) => {
                            item.expressionRelationSymbolLabel = label
                          }}
                        />
                      )}
                    </Form.Item>
                  )
                } else {
                  return (
                    <div
                      className='break-all'
                      style={{
                        width: '70px'
                      }}>{item.expressionRelationSymbolLabel || item.expressionRelationSymbol}
                    </div>
                  )
                }
              }}
            />
          
            <Column title='是否分组'
              render={item => {
                
                if (item.edit) {
                  return (
                    <Form.Item
                      style={{
                        width: '70px'
                      }}
                    >
                      {getFieldDecorator(`groupFlag__${item.key}`, {
                        rules: [
                          {
                            required: true,
                            message: '请选择表达式关系'
                          }
                        ],
                        initialValue: item.groupFlag
                      })(
                        <GroupFlag
                          onChange={(value, label) => {
                            item.groupFlagLabel = label
                          }}
                        />
                      )}
                    </Form.Item>
                  )
                } else {
                  return (
                    <div
                      className='break-all'
                      style={{
                        width: '70px'
                      }}>{item.groupFlagLabel || item.groupFlag}
                    </div>
                  )
                }
              }}
            />

            <Column
              title='操作'
              key='action'
              render={(item, data, index) => (
                <div
                  className='break-all'
                  style={{
                    width: '90px'
                  }}>
                  <a onClick={() => { this.handleEditRow(item, data, index) }}>
                    {item.edit ? '保存' : '编辑'}
                  </a>
                  {this.state.data.length > 1 &&
                    <React.Fragment>
                      <Divider type='vertical' />
                      <a onClick={() => { this.handleDelect(item, data, index) }}>
                      删除
                      </a>
                    </React.Fragment>
                  }
                </div>
              )}
            />
          </Table>
        </Form>
        <div style={{ 'margin-top': '16px' }}>
          <Button
            icon='plus'
            type='dashed'
            className='w-ant-btn-dashed-blue'
            onClick={this.handleAdd}
            style={{ width: '100%' }}
          >
            新增表达式
          </Button>
        </div>
        {
          // 预览规则
          <PreviewRule form={this.props.form} data={this.state.data} />
        }
      </div>
    )
  }
}
  
export default Form.create({
  name: 'TableForm'
})(TableForm)