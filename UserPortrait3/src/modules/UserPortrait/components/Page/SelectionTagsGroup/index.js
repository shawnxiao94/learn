/**
 * 选择标签综合组件
 * @props selectTags 获取标签数据
 * @props selectTagsQuerySources 选择标签 - 所属公司部门 - 下拉框数据
 * @props queryCategory 选择标签 - 标签分类 - 下拉框数据
 */
import React, { Component } from 'react'
import SelectionTags from './SelectionTags'
import MySearch from './Search'
import SelectedTags from './SelectedTags'
import PropTypes from 'prop-types'
import { deepClone } from '@/common/utils'
export default class SelectionTagsGroup extends Component {
  static childContextTypes = {
    // 设置标签
    setSelectedTags: PropTypes.func
  }
  getChildContext() {
    return {
      setSelectedTags: this.setSelectedTags.bind(this)
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      // 当前选中标签
      selectedTags: [],
      // 全选状态
      checkType: undefined
    }
    this.setCheckAllStatus = this.setCheckAllStatus.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  /**
   *  查询
   */
  handleSearch(form) {
    this.SelectionTags.search(form)
  }

  /**
   * 设置选中标签
   */
  setSelectedTags(selectedTags) {
    this.setState({ selectedTags })
    this.props.onChange && this.props.onChange(selectedTags)
  }

  /**
   * 检查全选状态
   */
  setCheckAllStatus(checkType) {
    this.setState({ checkType })
  }

  /**
   * 数据回显
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible && nextProps.visible) {
      let value = this.props.value || []
      this.setState({ selectedTags: deepClone(value) }, () => {
        this.SelectionTags.handlePaginationChange(1)
      })
    }
  }

  render() {
    return (
      <div>
        <MySearch
          api={this.props.api}
          checkType={this.state.checkType}
          search={this.handleSearch}
          SelectionTags={this.SelectionTags}
          setCheckAllStatus={this.setCheckAllStatus} />
        <SelectionTags
          ref={SelectionTags => { this.SelectionTags = SelectionTags }}
          checkType={this.state.checkType}
          setCheckAllStatus={this.setCheckAllStatus}
          api={this.props.api.selectTags}
          selectedData={this.state.selectedTags} />
        <SelectedTags selectedData={this.state.selectedTags} />
      </div>
    )
  }
}