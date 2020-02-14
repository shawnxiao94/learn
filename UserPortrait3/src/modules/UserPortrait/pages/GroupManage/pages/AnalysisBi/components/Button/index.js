/**
 * 按钮组
 */
import React, { Component } from 'react'
import { Button, notification } from 'antd'
import PropTypes from 'prop-types'
import SaveModal from './SaveModal'
/**
 *  findBiAnalysisGraphicalByTag 查询BI分析结果
 */
import { findBiAnalysisGraphicalByTag } from '@/modules/UserPortrait/data/api/GroupManage/AnalysisBi'
export default class AnalysisBiButton extends Component {
  static contextTypes = {
    // 刷新列表
    setChartData: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      // 显示隐藏窗口
      saveModalVisible: false,
      // 类别 createAndAddSubgroup 为保存并创建 create 创建历史记录
      saveModalType: null
    }
    this.handleViewReport = this.handleViewReport.bind(this)
    this.handleCreateSubgroup = this.handleCreateSubgroup.bind(this)
    this.handleSaveAnalysisRecord = this.handleSaveAnalysisRecord.bind(this)
    this.handleHideModal = this.handleHideModal.bind(this)
  }

  /**
   * 查看报表
   */
  handleViewReport(e) {
    let form = this.props.AntOrNot.getParams()
    form.userGroupId = this.props.userGroupId
    this.context.setChartData({ loading: true })
    /**
     * 新增
     */
    findBiAnalysisGraphicalByTag(form).then(response => {
      this.context.setChartData({ loading: false, data: response })
    }).catch(response => {
      let errMsg = (response.data && response.data.Result.errMsg) || '请联系管理员'
      notification['error']({
        message: '保存失败',
        description: errMsg
      })
      this.context.setChartData({ loading: false })
    })
  }

  /**
   * 保存并创建子群
   */
  handleCreateSubgroup(e) {
    this.setState({ saveModalVisible: true, saveModalType: 'createAndAddSubgroup' })
  }

  /**
   * 保存分析记录
   */
  handleSaveAnalysisRecord(e) {
    this.setState({ saveModalVisible: true, saveModalType: 'create' })
  }

  /**
   * 关闭窗口
   */
  handleHideModal() {
    this.setState({ saveModalVisible: false })
  }

  render() {
    return (
      <React.Fragment>
        {this.props.selectedData && !!this.props.selectedData.length &&
          <div className='w-selected-tags-btns'>
            <Button
              type='primary'
              onClick={this.handleViewReport}>
              查看报表
            </Button>
            <Button
              type='primary'
              disabled={this.props.relationType === '02'}
              onClick={this.handleCreateSubgroup}
              style={{ 'margin-left': '16px' }}>
              创建用户群
            </Button>
            <Button
              type='primary'
              disabled={this.props.relationType === '02'}
              onClick={this.handleSaveAnalysisRecord}
              style={{ 'margin-left': '16px' }}>
              保存分析记录
            </Button>
          </div>
        }
        <SaveModal
          visible={this.state.saveModalVisible}
          type={this.state.saveModalType}
          userGroupId={this.props.userGroupId}
          historyId={this.props.historyId}
          AntOrNot={this.props.AntOrNot}
          handleHideModal={this.handleHideModal} />
      </React.Fragment>
    )
  }
}