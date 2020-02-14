/**
 * description: BI自助分析
 * author: William
 */
import React, { Component } from 'react'
import { Card, Row, Col, notification } from 'antd'
import Search from '@/modules/UserPortrait/components/Page/SelectionTagsGroup/Search'
import SelectionTags from '@/modules/UserPortrait/components/Page/SelectionTagsGroup/SelectionTags'
import AntOrNot from '@/modules/UserPortrait/components/Page/SelectionTagsGroup/SelectedTags/AntOrNot'
/**
 * 用户数分析
 */
import UserNumberReport from './components/UserNumberReport'
/**
 * 用户数占比
 */
import PercentageOfUsers from './components/PercentageOfUsers'
/**
 * 按钮组
 */
import AnalysisBiButton from './components/Button'
/**
 *  获取数据
 *  findTagsByPage 获取标签数据
 *  queryHistoryDetail 回显历史分析记录数据
 *  selectTagsQuerySources 选择标签 - 所属公司部门 - 下拉框数据
 *  queryCategory 选择标签 - 标签分类 - 下拉框数据
 */
import { findTagsByPage, queryHistoryDetail } from '@/modules/UserPortrait/data/api/GroupManage/AnalysisBi'
import { selectTagsQuerySources, queryCategory } from '@/modules/UserPortrait/data/api/PortraitManage/Add/SelectTagsModal'
import PropTypes from 'prop-types'

class AnalysisBi extends Component {
  static childContextTypes = {
    // 设置标签
    setSelectedTags: PropTypes.func,
    // 设置图表数据
    setChartData: PropTypes.func
  }
  getChildContext() {
    return {
      setSelectedTags: this.setSelectedTags.bind(this),
      setChartData: this.setChartData.bind(this)
    }
  }
  constructor(props) {
    super(props)
    let { params } = window.getRouterParams(this.props.location.pathname, '/group-manage/analysis-bi/:userGroupId/:historyId?')
    this.state = {
      // 用户群ID
      userGroupId: params.userGroupId,
      // 分析历史记录ID，如果有历史记录ID，则说明是编辑
      historyId: params.historyId,
      // 全选状态
      checkType: undefined,
      // 选中标签
      selectedTags: [],
      // 每页显示条数，如果宽屏幕，每页显示9条，否则显示6条
      pageSize: 6,
      // 图表数据
      chart: {
        // loading
        loading: false,
        data: null,
        show: false
      },
      // loading
      loading: false,
      // 历史记录状态，为02失效不可再创建子群
      relationType: null
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.setCheckAllStatus = this.setCheckAllStatus.bind(this)
    this.handleSelectionTagsChange = this.handleSelectionTagsChange.bind(this)
    /**
     * 最多选择多少个标签
     */
    this.maxLength = 10000
  }

  componentDidMount() {
    this.windowResize()
    window.addEventListener('resize', this.windowResize.bind(this))
    // 编辑回显逻辑
    this.queryHistoryDetail()
  }
  componentDidUnmount() {
    window.removeEventListener('resize', this.windowResize.bind(this))
  }

  /**
   * 标签查询完触发
   * 如果是历史记录首次渲染默认查询一次图表
   */
  handleSelectionTagsChange() {
    if (!this.notFirstLoad) {
      this.notFirstLoad = true
      this.state.historyId && this.AnalysisBiButton.handleViewReport()
    }
  }

  /**
   * 编辑回显逻辑
   * @response {Array} biAnalysisHistoryTags 选中的标签
   * @response {String} selectType 并且 或者 关系
   * @response {String} relationType 历史记录状态，为02失效不可再创建子群
   */
  queryHistoryDetail() {
    if (!this.state.historyId) {
      return
    }
    this.setState({ loading: true })
    queryHistoryDetail({
      historyId: +this.state.historyId
    })
      .then(response => {
        this.setState({
          selectedTags: response.biAnalysisHistoryTags,
          relationType: response.relationType
        }, () => {
          // 设置标签中选中非的的checkbox勾选状态及并且活着逻辑关系
          this.setAntOrNotState(response)
        })
      })
      .catch(response => {
        let errMsg = (response.data && response.data.Result.errMsg) || '请联系管理员'
        notification['error']({
          message: '获取详情数据失败',
          description: errMsg
        })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }
  /**
   * 设置标签中选中非的的checkbox勾选状态及并且活着逻辑关系
   */
  setAntOrNotState(response) {
    let checks = response.biAnalysisHistoryTags.filter(item => {
      return item.tagInternalType === 1
    }).map(item => item.tagCode)
    this.AntOrNot.setState({ checks, selectType: response.selectType })
  }

  /**
   * 监听浏览器宽度，动态分页条数
   */
  windowResize() {
    if (window.innerWidth >= 1600) {
      this.setState({ pageSize: 9 })
    } else {
      this.setState({ pageSize: 6 })
    }
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
  }

  /**
   * 检查全选状态
   */
  setCheckAllStatus(checkType) {
    this.setState({ checkType })
  }

  /**
   * 设置图表数据
   */
  setChartData({ loading = false, data = null }) {
    this.setState({ chart: { loading, data, show: true } })
  }
   
  render() {
    return (
      <div>
        <Card bordered={false} title='选择标签'>
          <Search
            api={{ selectTagsQuerySources, queryCategory }}
            checkType={this.state.checkType}
            search={this.handleSearch}
            maxLength={this.maxLength}
            layout={
              { span: 8, xxl: 6 }
            }
            SelectionTags={this.SelectionTags}
            setCheckAllStatus={this.setCheckAllStatus} />
          <SelectionTags
            maxLength={this.maxLength}
            ref={SelectionTags => { this.SelectionTags = SelectionTags }}
            checkType={this.state.checkType}
            setCheckAllStatus={this.setCheckAllStatus}
            api={findTagsByPage}
            selectedData={this.state.selectedTags}
            pageSize={this.state.pageSize}
            onChange={this.handleSelectionTagsChange}
            params={{ userGroupId: this.state.userGroupId }}
            col={
              { span: 12, xxl: 8 }
            } />
          <AntOrNot
            selectedData={this.state.selectedTags}
            ref={AntOrNot => { this.AntOrNot = AntOrNot }}
            col={
              { span: 12, xxl: 8 }
            }
          />
          <AnalysisBiButton
            selectedData={this.state.selectedTags}
            ref={AnalysisBiButton => { this.AnalysisBiButton = AnalysisBiButton }}
            userGroupId={this.state.userGroupId}
            relationType={this.state.relationType}
            historyId={this.state.historyId}
            AntOrNot={this.AntOrNot} />
        </Card>
        {this.state.chart.show &&
          <Row gutter={16} style={{ 'margin-top': '16px' }}>
            <Col span='16'>
              <UserNumberReport
                loading={this.state.chart.loading}
                data={this.state.chart.data}
              />
            </Col>
            <Col span='8'>
              <PercentageOfUsers
                loading={this.state.chart.loading}
                data={this.state.chart.data}
              />
            </Col>
          </Row>
        }
      </div>
    )
  }
}
   
export default AnalysisBi