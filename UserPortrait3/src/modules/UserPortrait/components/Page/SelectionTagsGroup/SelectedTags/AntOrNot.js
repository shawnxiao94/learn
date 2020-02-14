/**
 * 选中的标签
 * 包含与或非关系
 * @prop gutter 间距
 */
import React, { Component } from 'react'
import { Row, Col, Icon, Checkbox, Radio } from 'antd'
import './index.less'
import PropTypes from 'prop-types'
export default class SelectedTags extends Component {
  static contextTypes = {
    // 设置标签
    setSelectedTags: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      layouts: {
        gutter: this.props.gutter || 80,
        col: this.props.col || { span: 12 },
        minHeight: this.props.minHeight || '144px'
      },
      // 并且 或者 值
      selectType: 'and',
      // 选中非的标签
      checks: []
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
  }

  /**
   * 关闭某一项
   */
  handleClose(item) {
    let selectedTags = this.props.selectedData.filter(a => a.tagCode !== item.tagCode)
    this.context.setSelectedTags(selectedTags)
  }

  /**
   * 逻辑或者、并且radio值change事件
   */
  handleRadioChange(e) {
    this.setState({ selectType: e.target.value })
  }

  /**
   * 当选中标签减少时，同步删除选择非的逻辑队列
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.selectedData !== nextProps.selectedData) {
      this.updataChecks([...nextProps.selectedData])
    }
  }

  /**
   * 父组件跟新状态
   */
  // setState(state) {
  //   this.setState(state)
  // }

  /**
   * 当选中标签减少时，同步删除选择非的逻辑队列
   */
  updataChecks(selectedData) {
    let checks = [...this.state.checks]
    checks = checks.filter(tagCode => {
      return selectedData.some(a => {
        return a.tagCode === tagCode
      })
    })
    this.setState({ checks })
  }

  /**
   * 当复选框发生改变
   */
  handleCheckboxChange(e, item) {
    let checks = [...this.state.checks]
    if (e.target.checked) {
      checks.push(item.tagCode)
    } else {
      checks = checks.filter(tagCode => {
        return tagCode !== item.tagCode
      })
    }
    this.setState({ checks })
  }

  /**
   * 获取参数
   */
  getParams() {
    let tagList = this.props.selectedData.map(item => {
      let tagInternalType = this.state.checks.some(a => {
        return a === item.tagCode
      })
      return {
        tagId: item.id,
        tagInternalType: ~~tagInternalType,
        colMapping: item.colMapping
      }
    })
    return {
      selectType: this.state.selectType,
      tagList
    }
  }

  render() {
    return (
      <div className='w-selected-tags'>
        <div className='w-selected-tags-header'>
          <span className='w-selected-tags-title' style={{ 'margin-right': '32px' }}>
            选择关系
          </span>
          <Radio.Group onChange={this.handleRadioChange} value={this.state.selectType}>
            <Radio value='and'>并且</Radio>
            <Radio value='or'>或者</Radio>
          </Radio.Group>
          <span className='w-selected-tags-text'>
            共选择 <em>{this.props.selectedData.length}</em> 个关系
          </span>
        </div>
        <div style={{ 'min-height': this.state.layouts.minHeight }}>
          {this.props.selectedData.length < 1 &&
            <div
              className='w-selected-tags-empty'
              style={{ height: this.state.layouts.minHeight }}>
              <Icon type='edit' style={{ 'margin-right': '5px' }} /> 请选择标签
            </div>
          }
          <Row gutter={this.state.layouts.gutter}>
            {this.props.selectedData.map(item => (
              <Col {...this.state.layouts.col} key={item.tagCode}>
                <div className='w-tags-theme-selected' style={{ 'padding-right': '90px' }}>
                  <div className='w-tags-theme-selected-label ellipsis' title={item.tagName}>
                    {item.tagName}
                  </div>
                  <div className='w-tags-theme-selected-checkbox-group'>
                    <Checkbox checked={this.state.checks.some(tagCode => tagCode === item.tagCode)} onChange={e => { this.handleCheckboxChange(e, item) }}>非</Checkbox>
                  </div>
                  <div className='w-tags-theme-selected-btn' onClick={() => { this.handleClose(item) }}>
                    <Icon type='close' />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    )
  }
}