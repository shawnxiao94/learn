import React, { Component } from 'react'
import { Button, Form, Checkbox, Card, Spin, notification } from 'antd'
import * as api from '@/modules/UserPortrait/data/api/Home/Label'
import { getQueryString } from '@/common/utils/index'
import PropTypes from 'prop-types'
import { deepClone } from '@/common/utils'
const CheckboxGroup = Checkbox.Group
class Enjoy extends Component {
  static contextTypes = {
    // 刷新列表
    refreshLabelManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    let id = (this.props.location.params && this.props.location.params.id) || this.props.match.params.id
    let tagName = decodeURIComponent(getQueryString('tagName'))
    this.state = {
      id: id,
      loadings: {
        // 获取数据loading
        getData: false,
        // 表单提交loading
        submit: false
      },
      // 全选
      checkAll: {
        // value
        value: false,
        // 半全选状态
        indeterminate: false,
        disabled: false
      },
      // 选择状态
      checkeds: {
        // 选择列表
        options: []
      },
      form: {
        // 标签ID
        tagId: undefined,
        tagName: tagName
      }
    }
    // 提交
    this.handleSaveLableEnjoy = this.handleSaveLableEnjoy.bind(this)
    // 全选
    this.handleCheckAllChange = this.handleCheckAllChange.bind(this)
    // 选中
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * 组件生命周期挂载钩子
   */
  componentWillMount() {
    this.getData()
  }
  /**
   * 获取标签共享数据
   */
  getData() {
    this.setState(({ loadings }) => ({ loadings: { ...loadings, getData: true } }))
    api
      .queryTagAndChannel({ id: this.state.id })
      .then(response => {
        // 设置选项数据
        this.setState(({ checkeds }) => ({ checkeds: { ...checkeds, options: response.sourceDtos } }))
        // 默认赋值
        this.setState({ form: {
          // 标签ID
          tagId: response.tagId,
          tagName: response.tagName || this.state.form.tagName
        } })
        // 设置选中项
        this.props.form.setFieldsValue({ 'checkValues': response.checkValues })
        if (response.checkValues.length === response.sourceDtos.length) {
          this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, disabled: true } }))
        }
        /**
         * 更新全选状态
         */
        this.setCheckAllStatus()
      })
      .catch(res => {
        let errMsg = (res.data.Result && res.data.Result.errMsg) || '请联系管理员'
        notification['error']({
          message: '获取共享数据失败',
          description: errMsg
        })
      })
      .finally(() => {
        this.setState(({ loadings }) => ({ loadings: { ...loadings, getData: false } }))
      })
  }

  // 更新全选状态
  setCheckAllStatus(value) {
    // 选中数组
    let checkValues = value || this.props.form.getFieldValue('checkValues')
    // 全部数据
    let options = this.state.checkeds.options
    if (options.length === checkValues.length) {
      // 全部选中
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: true, indeterminate: false } }))
    } else if (checkValues.length) {
      // 选中部分
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: false, indeterminate: true } }))
    } else {
      // 一个也没有选中
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: false, indeterminate: false } }))
    }
  }

  /**
   * 新增编辑
   */
  handleSaveLableEnjoy(e) {
    // 解决ant design表单提交刷新问题
    e && e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let form = {
          ...this.state.form,
          sourceDtos: deepClone(this.state.checkeds.options).map(a => {
            if (this.props.form.getFieldValue('checkValues').some(b => {
              return b === a.value
            })) {
              a.ifSelect = 1
            } else {
              a.ifSelect = 0
            }
            return {
              ifSelect: a.ifSelect,
              flag: a.flag,
              channelName: a.label,
              ifPortrait: a.ifPortrait,
              channelCode: a.value
            }
          })
        }
        this.setState(({ loadings }) => ({ loadings: { ...loadings, submit: true } }))
        api.addShareChannel(form)
          .then(response => {
            const self = this
            notification['success']({
              message: '保存成功',
              description:
                '请到标签管理列表查看',
              onClose() {
                self.props.history.push({ pathname: '/label-manage' })
                self.context.refreshLabelManage()
              }
            })
          })
          .catch(response => {
            let errMsg = (response.data.Result && response.data.Result.errMsg) || '请联系管理员'
            notification['error']({
              message: '保存失败',
              description: errMsg
            })
          })
          .finally(() => {
            this.setState(({ loadings }) => ({ loadings: { ...loadings, submit: false } }))
          })
      }
    })
  }

  /**
   * 选中事件
   */
  handleChange(value) {
    this.setCheckAllStatus(value)
  };

  /**
   * 全选事件
   */
  handleCheckAllChange(e) {
    let value = e.target.checked
    if (value) {
      // 全选
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: true, indeterminate: false } }))
      this.props.form.setFieldsValue({ 'checkValues': this.state.checkeds.options.map(item => item.value) })
    } else {
      // 全部取消
      let checkValues = this.selectedCanntEdit()
      this.setState(({ checkAll }) => ({ checkAll: { ...checkAll, value: false, indeterminate: checkValues.length } }))
      this.props.form.setFieldsValue({ 'checkValues': checkValues })
    }
  };

  /**
   * 选中过了就不能变更了
   */
  selectedCanntEdit() {
    return this.state.checkeds.options.filter(item => item.disabled).map(item => item.value)
  }
  
  render() {
    /**
     * 表单布局
     */
    let formItemLayout =
    {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        xxl: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
        xxl: { span: 19 }
      }
    }
    let fillItemLayout =
    {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 17,
          offset: 7
        },
        xxl: {
          span: 19,
          offset: 5
        }
      }
    }
    const { getFieldDecorator } = this.props.form
    let checkValues = this.props.form.getFieldValue('checkValues') || []
    return (
      <Spin spinning={this.state.loadings.getData} >
        <Card bordered={false}>
          <Form
            {...formItemLayout}
            onSubmit={this.handleSaveLableEnjoy}
            style={{ 'min-height': '480px', 'margin': '24px auto 0' }}
            className='c-form'>
            <Form.Item label='共享标签名' colon={false}>
              <div>
                {this.state.form.tagName}
              </div>
            </Form.Item>
            <Form.Item label='请选择需要共享的渠道' colon={false}>
              <div>
                <Checkbox
                  onChange={this.handleCheckAllChange}
                  indeterminate={this.state.checkAll.indeterminate}
                  checked={this.state.checkAll.value}
                  disabled={this.state.checkAll.disabled}
                >
                全选
                </Checkbox>
              </div>
              {getFieldDecorator('checkValues')(
                <CheckboxGroup
                  onChange={this.handleChange}
                  options={this.state.checkeds.options}
                />
              )}
              {checkValues.length > 0 && <div style={{ 'line-height': '1.2', 'margin-top': '10px' }}>
                您将把 <span className='primary-color'>
                  {this.state.form.tagName}
                </span> 标签共享给 {
                  checkValues.map(item => {
                    return this.state.checkeds.options.find(a => a.value === item).label
                  }).join('，')
                }
              </div>}
              
            </Form.Item>
            <Form.Item {...fillItemLayout}>
              <Button type='primary' htmlType='submit' loading={this.state.loadings.submit}>
                保存
              </Button>
              <Button style={{ 'margin-left': '16px' }} onClick={() => {
                window.history.back()
              }}>
                取消
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    )
  }
}
export default Form.create({})(Enjoy)