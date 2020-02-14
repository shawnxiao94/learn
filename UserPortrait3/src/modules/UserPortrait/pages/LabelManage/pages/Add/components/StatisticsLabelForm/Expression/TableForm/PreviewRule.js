/**
 * description 预览规则
 * author: William
 * @props form 表单原型
 * @props data 提交参数
 */
import React, { PureComponent } from 'react'
import { Button, Spin, message } from 'antd'
import { queryTagExpression } from '@/modules/UserPortrait/data/api/LabelManage/Add'
/**
 * 过滤
 */
import fitlers from '@/common/filters'
/**
 * 格式化表达式入参
 */
import { formatTagsExpressionParams } from '@/modules/UserPortrait/data/api/LabelManage/Add/StatisticsLabelForm/utils/formatParams'

class PreviewRule extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      /**
       * 数据
       */
      data: undefined,
      loading: false
    }
    // 预览规则事件
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
   * 预览规则事件
   */
  handleSubmit() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.getData()
      }
    })
  }

  /**
   * 获取预览规则数据
   */
  getData() {
    // 所有值
    let form = [...this.props.data]
    /**
     * 如果还有未保存则提示保存
     */
    if (form.some(item => { return item.edit })) {
      message.warning(`请先保存!`)
      return
    }
    this.setState({ loading: true })
    queryTagExpression(formatTagsExpressionParams(form)).then(res => {
      this.setState({
        data: res
      })
    }).catch(() => {
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ 'margin-top': '16px' }}>
          <Button
            icon='file-search'
            type='link'
            style={{ 'padding': '0' }}
            onClick={this.handleSubmit}
          >
            预览规则
          </Button>
        </div>
        <Spin spinning={this.state.loading} >
          <div style={{ padding: '16px 0' }}>
            {fitlers.empty(this.state.data)}
          </div>
        </Spin>
      </React.Fragment>
    )
  }
}

export default PreviewRule
