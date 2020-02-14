/**
 * 选择标签组件
 */
import React, { PureComponent } from 'react'
import { Checkbox, Row, Col, Pagination, Spin, Icon, message } from 'antd'
import PropTypes from 'prop-types'
const win = window
export default class SelectionTags extends PureComponent {
  static contextTypes = {
    // 设置标签
    setSelectedTags: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      // 标签数据
      data: [],
      // 当前页选中标签
      activePageSelectedData: [],
      // 选中的标签数据
      selectedData: this.props.selectedData || [],
      // loading
      loading: false,
      layouts: {
        gutter: this.props.gutter || 80,
        col: this.props.col || { span: 12 },
        minHeight: this.props.minHeight || '144px'
      },
      // 分页
      pagination: {
        // 当前页
        pageNumber: 1,
        // 每页显示条数
        pageSize: this.props.pageSize || 6,
        // 总数
        total: undefined
      },
      // 表单备份
      form: {
        ...this.props.params
      }
    }
    this.handleSelectedChange = this.handleSelectedChange.bind(this)
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    /**
     * 当前是添加标签行为还是减少标签行为
     * 方便做添加上限校验
     */
    this.isAdd = null
  }

  componentDidMount() {
    // 获取数据
    this.search()
  }

  /**
   * 检查全选状态
   */
  checkAllStatus() {
    if (this.state.activePageSelectedData.length === this.state.data.length && this.state.data.length) {
      // 全选
      this.props.setCheckAllStatus('all')
    } else if (this.state.activePageSelectedData.length) {
      // 半全选
      this.props.setCheckAllStatus('indeterminate')
    } else {
      // 取消
      this.props.setCheckAllStatus()
    }
  }

  // 搜索
  search(form = {}) {
    this.setState(({ pagination }) => ({ pagination: { ...pagination, pageNumber: 1 } }), () => {
      form = Object.assign({}, this.state.form, form, this.state.pagination)
      this.getData(form)
    })
  }

  /**
   * 分页Change事件
   */
  handlePaginationChange(pageNumber) {
    this.setState(({ pagination }) => ({ pagination: { ...pagination, pageNumber } }), this.search())
  }

  /**
   * 获取数据
   */
  getData(form) {
    this.setState({ loading: true, form })
    this.props.api(form)
      .then(res => {
        let pagination = { ...this.state.pagination }
        pagination.total = res.totalElements
        this.setState({ data: res.content, pagination }, () => {
          this.initSelectedTagsThisPage()
        })
        setTimeout(() => {
          this.props.onChange && this.props.onChange()
        })
      })
      .catch(res => {
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedData !== nextProps.selectedData) {
      this.initSelectedTagsThisPage(nextProps.selectedData)
    }
    if (this.props.checkType !== nextProps.checkType) {
      if (nextProps.checkType === 'all') {
        // 全选
        this.selectAll()
      } else if (nextProps.checkType === 'indeterminate') {
      } else {
        // 取消全选
        this.clearAll()
      }
    }
    if (this.props.pageSize !== nextProps.pageSize) {
      this.setState(({ pagination }) => {
        return {
          pagination: {
            ...pagination,
            pageSize: nextProps.pageSize
          }
        }
      }, this.search())
    }
  }
  // 全选
  selectAll() {
    this.handleSelectedChange(this.state.data.map(item => item.tagCode))
  }
  // 全部取消
  clearAll() {
    this.handleSelectedChange([])
  }

  /**
   * 当前页初始化选中状态
   */
  initSelectedTagsThisPage(selectedData) {
    if (!selectedData) {
      selectedData = this.state.selectedData
    } else {
      this.setState({ selectedData })
    }
    let activePageSelectedData = selectedData.filter(item => this.state.data.some(b => b.tagCode === item.tagCode)).map(item => item.tagCode)
    this.setState({ activePageSelectedData }, () => {
      this.checkAllStatus()
    })
  }

  /**
   * 标签组change
   */
  handleSelectedChange(value) {
    if (this.isAdd && !win.isEmpty(this.props.maxLength) && !this.checkMaxTags()) {
      return
    }
    let selectedData = [...this.state.selectedData].filter(item => {
      return !this.state.data.some(b => b.tagCode === item.tagCode)
    }).concat(this.state.data.filter(c => value.includes(c.tagCode)))
    this.setState({
      activePageSelectedData: value,
      selectedData
    })
    this.context.setSelectedTags(selectedData)
  }

  /**
   * 单个checkbox被点击change事件
   * 主要要知道是添加标签行为，还是减少标签行为
   */
  handleCheckboxChange(e) {
    if (e.target.checked) {
      this.isAdd = true
    }
  }

  /**
   * 判断当前最多选择多少个标签
   * @param {Boolean} isSelectedAll 是否是全选状态，因为全选个数要加入计算中
   */
  checkMaxTags(isSelectedAll) {
    this.isAdd = null
    let selectedLength = this.state.selectedData.length
    if (isSelectedAll) {
      selectedLength += this.state.data.length - this.state.activePageSelectedData.length - 1
    }
    if (this.props.maxLength <= selectedLength) {
      message.warning(`最多只能选择${this.props.maxLength}个标签!`)
      return false
    } else {
      return true
    }
  }

  render() {
    return (
      <Spin spinning={this.state.loading} >
        <Checkbox.Group style={{ width: '100%' }} value={this.state.activePageSelectedData} onChange={this.handleSelectedChange}>
          <div style={{ 'min-height': this.state.layouts.minHeight }}>
            {this.state.data.length < 1 &&
              <div
                className='w-selected-tags-empty'
                style={{ height: this.state.layouts.minHeight }}>
                <Icon type='frown' style={{ 'margin-right': '5px' }} /> 未查询到数据
              </div>
            }
            <Row gutter={this.state.layouts.gutter}>
              {this.state.data.map(item => (
                <Col {...this.state.layouts.col} key={item}>
                  <Checkbox
                    className='w-checkbox-button-group'
                    onChange={this.handleCheckboxChange}
                    value={item.tagCode}>
                    <div
                      className='w-checkbox-button-wrapper ellipsis'
                      style={{ 'width': 'calc(100% - 40px)', 'display': 'inline-block' }}
                      title={item.tagName}
                    >
                      {item.tagName}
                    </div>
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </div>
          <div style={{ 'margin-top': '16px', 'text-align': 'right' }}>
            <Pagination
              current={this.state.pagination.pageNumber}
              pageSize={this.state.pagination.pageSize}
              total={this.state.pagination.total}
              defaultCurrent={1}
              showQuickJumper
              onChange={this.handlePaginationChange}
            />
          </div>
        </Checkbox.Group>
      </Spin>
    )
  }
}