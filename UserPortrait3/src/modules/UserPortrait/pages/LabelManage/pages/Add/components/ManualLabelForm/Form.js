import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Select,
  Icon,
  Spin,
  Upload,
  Dropdown,
  Menu,
  DatePicker
  , message } from 'antd'
import moment from 'moment'
/**
 * API 获取标签类别
 */
import * as api from '@/modules/UserPortrait/data/api/LabelManage/Add'
/*
 *获取登陆信息
 */
import { getToken } from '@/common/permission/auth'
const { RangePicker } = DatePicker
const { TextArea } = Input

const { Option } = Select

class LabelForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      /**
       * 下拉选项
       */
      options: {
        // 标签类别
        categroys: []
      },
      /**
       * loadings
       */
      loadings: {
        // 获取标签列表数据loading
        categroys: true
      },
      /**
       * 需要传给后端数据
       */
      fileListData: {
        batchNo: '',
        fileName: '',
        type: ''
      },
      /**
       * 上传文件list
       */
      fileList: [],
      /**
       * 是否上传文件
       */
      uploadError: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getData()
  }
  /**
   * 限制上传文件格式以及文件大小
   */
  handleBeforeUpload = file => {
    // const isCSV = file.type === 'text/csv'
    const isCSV = file.name.split('.')[file.name.split('.').length - 1] === 'csv'
    if (!isCSV) {
      message.error('请上传csv格式文件!')
    }
    const isLt1M = file.size / 1024 / 1024 < 1
    if (!isLt1M) {
      message.error('上传文件大小不能超过1MB!')
    }
    return isCSV && isLt1M
  }
  /**
   * 判断是否上传文件
   */
  uploadStatus() {
    if (this.state.fileList.length > 0) {
      this.setState({
        uploadError: false
      })
    } else {
      this.setState({
        uploadError: true
      })
    }
  }
  /**
   * 上传文件改变时调用方法
   */
  handleChange = info => {
    const isLt1M = info.file.size / 1024 / 1024
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList)
    }
    if (info.fileList.length > 1) {
      info.fileList = info.fileList.pop()
      message.error('当前限制最多上传1个文件!')
    } else if (isLt1M > 1) {
      info.fileList = info.fileList.pop()
    } else {
      if (info.file.status === 'done') {
        let res = info.file.response
        if (res.ErrorCode === 0 && res.Result.errCode === 0 && res.Result.data) {
          let _fileListData = res.Result.data
          let _fileList = info.fileList
          this.setState({
            fileListData: Object.assign(this.state.fileListData, _fileListData),
            fileList: Object.assign(this.state.fileList, _fileList)
          })
          message.success(`${info.file.name} 文件上传成功`)
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`)
      }
    }
    this.uploadStatus()
  }
  /**
   * 删除上传文件
   * 根据uid来判断删除相对应文件
   */
  handleRemove = file => {
    this.state.fileList.forEach((item, index) => {
      let _batchNo = item.response.Result.data.batchNo
      let _fileList = this.state.fileList.splice(index, 1)
      this.setState({
        fileList: Array.from(Object.assign({}, _fileList))
      })
      if (file.uid === item.uid) {
        api.deleteUploadFile({ batchNo: _batchNo }).then(res => {
          if (res.ErrorCode === 0 && res.Result.errCode === 0) {
            message.success('删除上传文件远程路径成功！')
          } else {
            message.error('删除上传文件远程路径失败！')
          }
        }).catch(() => {
          message.info('删除上传文件远程路径失败！')
        })
      }
    })
    this.uploadStatus()
  }
  /**
   * 获取该页面所需数据
   * api.queryCategory 获取标签类别
   */
  getData() {
    this.setState(({ loadings }) => {
      return {
        loadings: {
          ...loadings,
          categroys: true
        }
      }
    })
    api.queryCategory({ tagCategoryReq: { vagueName: '' } }).then(response => {
      this.setState(
        ({ options }) => (
          {
            options: { ...options, categroys: response.categroys }
          }
        )
      )
    }).catch(() => {
      message.error('获取标签类别失败!')
    })
      .finally(() => {
        this.setState(({ loadings }) => {
          return {
            loadings: {
              ...loadings,
              categroys: false
            }
          }
        })
      })
  }
  /**
   * 提交
   */
  handleSubmit(e) {
    e.preventDefault()
    this.uploadStatus()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && !!this.state.fileListData.fileName) {
        this.props.handleSubmit(this.state.fileListData)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const menu = (
      <Menu>
        <Menu.Item>
          <a href='./static/files/mobile.csv'>手机号模版</a>
        </Menu.Item>
        <Menu.Item>
          <a href='./static/files/email.csv'>邮箱模版</a>
        </Menu.Item>
        <Menu.Item>
          <a href='./static/files/idcard.csv'>证件号码模版</a>
        </Menu.Item>
      </Menu>
    )
    const uploadFile = {
      // 发到后台的文件参数名
      name: 'file',
      // 上传地址
      action: process.env.UPLOAD_FILE + '/fileUpload/FileUploadOpenService/upload',
      // 设置上传的请求头部
      headers: {
        Authorization: 'Bearer ' + getToken(),
        version: 1
      },
      // 后端所需参数
      data: {
        fileType: '01'
      },
      // 接受上传的文件类型
      accept: '.csv',
      onChange: this.handleChange,
      onRemove: this.handleRemove,
      beforeUpload: this.handleBeforeUpload
    }
    return (
      <React.Fragment>
        <Form
          onSubmit={this.handleSubmit}
          {...this.props.formItemLayout}
          style={{ 'margin': 'auto' }}
          className='c-form'
        >
          <Form.Item label='标签名' colon={false}>
            {getFieldDecorator('tagName', {
              rules: [
                {
                  required: true,
                  message: '请输入标签名称'
                }
              ]
            })(
              <Input
                maxlength='25'
                placeholder='不超过25个字'
                allowClear
                autocomplete='off'
              />
            )}
          </Form.Item>
          <Form.Item label='标签来源' colon={false}>
            <div>
              {this.props.channelCode && this.props.channelCode.label}
            </div>
          </Form.Item>
          <Form.Item label='标签类别' colon={false}>
            <Spin spinning={this.state.loadings.categroys}>
              {getFieldDecorator('tagCategoryId', {
                rules: [
                  {
                    required: true,
                    message: '请选择标签类别'
                  }
                ]
              })(
                <Select
                  placeholder='请选择标签类别'
                  allowClear
                >
                  {this.state.options.categroys.map(
                    (item, index) => <Option value={item.id} key={item.id}>{item.categoryName}</Option>)}
                </Select>
              )}
            </Spin>
          </Form.Item>
          {!this.props.isEdit &&
            <Form.Item label={<span><span className='mi'>*</span>导入用户</span>}>
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Upload {...uploadFile} style={{ margin: '0 15px 0 0' }}>
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
                  </Upload>
                  <Dropdown overlay={menu}>
                    <a className='ant-dropdown-link'>
                        标签模板下载
                      <Icon type='down' />
                    </a>
                  </Dropdown>
                </div>
                <p className='upload-tips' style={{ margin: '0' }}>请上传csv格式文件, 不能超过1M</p>
                {this.state.uploadError && <p style={{ color: 'red', margin: '0' }}>请上传文件!</p>}
              </div>
            </Form.Item>
          }
          <Form.Item label='标签有效期' colon={false}>
            {getFieldDecorator('lableBeginEndDate', {
              rules: [
                {
                  required: true,
                  message: '请选择标签有效期'
                }
              ]
            })(
              <RangePicker
                // 新增标签不能选择过去时间
                disabledDate={current => {
                  return current && current < moment().startOf('day')
                }}
                format={'YYYY/MM/DD'}
              />
            )}
          </Form.Item>
          <Form.Item label='标签说明' colon={false}>
            {getFieldDecorator('tagDesc', {
            })(
              <TextArea
                rows={4}
                allowClear
                maxlength='200'
                placeholder='不超过200个字'
              />
            )}
          </Form.Item>
          <Form.Item {...this.props.tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
            保存
            </Button>
            <Button style={{ 'margin-left': '16px' }} onClick={() => {
              window.history.back()
            }}
            >
            取消
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    )
  }
}
  
export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    let fields = {}
    props.fields.forEach(key => {
      fields[key] = Form.createFormField({
        ...props[key],
        value: props[key].value
      })
    })
    return fields
  }
})(LabelForm)