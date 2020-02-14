/**
 * 选中的标签
 * @prop gutter 间距
 */
import React, { Component } from 'react'
import { Row, Col, Icon, Pagination } from 'antd'
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
      }
    }
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  /**
   * 关闭某一项
   */
  handleClose(item) {
    let selectedTags = this.props.selectedData.filter(a => a.tagCode !== item.tagCode)
    this.context.setSelectedTags(selectedTags)
  }

  /**
   * 分页Change事件
   */
  handlePaginationChange(pageNumber) {

  }
  render() {
    return (
      <div className='w-selected-tags'>
        <div className='w-selected-tags-header'>
          <div calssName='w-selected-tags-title'>
            您选择的标签数量为 {this.props.selectedData.length}
          </div>
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
              <Col {...this.state.layouts.col} key={item}>
                <div className='w-tags-theme-selected'>
                  <div className='w-tags-theme-selected-label ellipsis' title={item.tagName}>
                    {item.tagName}
                  </div>
                  <div className='w-tags-theme-selected-btn' onClick={() => { this.handleClose(item) }}>
                    <Icon type='close' />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div style={{
          'margin-top': '16px',
          'text-align': 'right',
          'display': this.props.selectedData.length > 100 ? 'block' : 'none'
        }}>
          <Pagination
            showQuickJumper
            defaultCurrent={2}
            total={500}
            onChange={this.handlePaginationChange}
          />
        </div>
      </div>
    )
  }
}