/**
  * description: 用户群管理 - 操作按钮
  * author: William
  */
import React, { PureComponent } from 'react'
import { Divider } from 'antd'
import TooltipCustom from '@/components/UI/TooltipCustom'
import { Link, withRouter } from 'react-router-dom'
import SvgIcon from '@/components/SvgIcon'
import { inject } from 'mobx-react'
import moment from 'moment'

@withRouter
@inject('Permission')
class Button extends PureComponent {
  constructor(props) {
    super(props)
  }

  /**
   * 刷新标签管理列表
   */
  refreshGroupManage() {
    this.context.refreshGroupManage()
  }

  /**
   * 标签渠道等于登录渠道 true
   */
  isRolesEq() {
    let row = this.props.row || {}
    return row.channelCode === this.props.Permission.loginedChannel.code
  }

  /**
   * 是否是主群
   */
  isMainGroup() {
    let row = this.props.row || {}
    return !row.parentId
  }
  
  /**
   * 禁用BI分析
   */
  disabledAnalysis() {
    let row = this.props.row || {}
    let newDd = moment(new Date()).format('YYYY-MM-DD')
    let crtDd = moment(new Date(row.crtTime)).format(
      'YYYY-MM-DD'
    )
    return row.status === 0 || newDd === crtDd
  }
  // 提示文案
  disabledAnalysisTooltipTitle() {
    let row = this.props.row || {}
    let newDd = moment(new Date()).format('YYYY-MM-DD')
    let crtDd = moment(new Date(row.crtTime)).format(
      'YYYY-MM-DD'
    )
    let disabledAnalysisTooltipTitle
    if (row.status === 0) {
      disabledAnalysisTooltipTitle = '用户群已失效，无法分析'
    } else if (newDd === crtDd) {
      disabledAnalysisTooltipTitle = '暂无标签无法进行BI分析，请先接收共享标签，收到后隔天进行分析'
    }
    return disabledAnalysisTooltipTitle
  }

  render() {
    let row = this.props.row || {}
    /**
     * 禁用BI分析
     */
    let disabledAnalysis = this.disabledAnalysis()
    let disabledAnalysisTooltipTitle = this.disabledAnalysisTooltipTitle()
    // 是否是主群
    let isMainGroup = this.isMainGroup()
    return (
      <React.Fragment>
        {
          /**
           * 详情按钮
           */
        }
        <Link to={{ pathname: `/group-manage/detail/${row.id}`, params: { id: row.id } }}>
          <SvgIcon iconClass='ope-detail' titleName='查看用户群' isTooltip={true} />
        </Link>

        {
          /**
           * BI自助分析
           */
        }
        {isMainGroup &&
          <React.Fragment>
            <Divider type='vertical' />
            <TooltipCustom title={disabledAnalysis ? disabledAnalysisTooltipTitle : undefined} destroyTooltipOnHide>
              <Link
                className='tooltip-link'
                disabled={disabledAnalysis}
                to={!disabledAnalysis &&
                  {
                    pathname: `/group-manage/analysis-bi/${row.id}`
                  }
                }>
                <SvgIcon iconClass='ope-bi' titleName='BI自助分析' isTooltip={!disabledAnalysis} />
              </Link>
            </TooltipCustom>
          </React.Fragment>
        }

        {
          /**
           * BI报表分析历史数据
           */
        }
        {isMainGroup &&
          <React.Fragment>
            <Divider type='vertical' />
            <TooltipCustom title={disabledAnalysis ? disabledAnalysisTooltipTitle : undefined} destroyTooltipOnHide>
              <Link
                className='tooltip-link'
                disabled={disabledAnalysis}
                to={!disabledAnalysis &&
                  {
                    pathname: `/group-manage/analysis-history/${row.id}`,
                    params: { id: row.id }
                  }
                }>
                <SvgIcon iconClass='ope-history' titleName='BI报表分析历史数据' isTooltip={!disabledAnalysis} />
              </Link>
            </TooltipCustom>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}
export default Button