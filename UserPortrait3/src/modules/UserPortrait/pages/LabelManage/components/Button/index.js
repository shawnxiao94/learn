/**
  * description: 标签管理 - 操作按钮
  * author: Emma
  * update: 注释 by Emma 2019-09-03 15:00:00
  */
import React, { PureComponent } from 'react'
import { Divider, message, Modal } from 'antd'
import TooltipCustom from '@/components/UI/TooltipCustom'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as api from '@/modules/UserPortrait/data/api/Home/Label'
import SvgIcon from '@/components/SvgIcon'
import { inject } from 'mobx-react'
const { confirm } = Modal

@inject('Permission')
class LabelButton extends PureComponent {
  static contextTypes = {
    // 刷新列表
    refreshLabelManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      tags: this.props.data
    }
    /**
     * 解决事件匿名函数不断触发render问题
     */
    this.handleStatus = this.handleStatus.bind(this)
    /**
     * 禁止锚点
     */
    this.loseEffect = this.loseEffect.bind(this)
  }

  /**
   * 状态更改
   */
  handleStatus() {
    const self = this
    let row = this.state.tags || {}
    // 是否失效失效该标签提示
    confirm({
      title: '失效',
      content: '此操作将失效该标签，是否继续？',
      okText: '确定',
      cancelText: '取消',
      icon: <SvgIcon iconClass='tip-error' />,
      onOk() {
        if (row.id) {
          if (row.tagType === 'manual') {
            // 手工型
            // 方法调用
            api
              .loseEfficacyTagStatus({ 'updateStateReq': { 'tagId': row.id, 'status': 0 } })
              .then(res => {
                if (res.Result.data.msg && res.Result.data.code === 2) {
                  // 操作失败
                  message.error('操作失败:' + res.Result.data.msg)
                } else {
                  message.success('操作成功')
                  self.refreshLabelManage()
                }
              })
              .catch(() => {
                // 操作失败
                message.error('操作失败')
              })
          } else if (
            row.tagType === 'statistical' ||
              row.tagType === 'algorithm'
          ) {
            // 统计型
            // 方法调用
            api
              .updateTagIsOpen({ 'updateStateReq': { 'tagId': row.id, 'status': 0 } })
              .then(res => {
                if (res.Result.data.msg && res.Result.data.code === 2) {
                  // 操作失败
                  message.error('操作失败:' + res.Result.data.msg)
                } else {
                  message.success('操作成功')
                  self.refreshLabelManage()
                }
              })
              .catch(() => {
                // 操作失败
                message.error('操作失败')
              })
          } else {
            message.error('操作失败：标签类型为空！')
          }
        }
      },
      onCancel() {
      }
    })
  }

  /**
   * 刷新标签管理列表
   */
  refreshLabelManage() {
    this.context.refreshLabelManage('刷新标签管理列表')
  }
  
  /**
   * 失效是否禁用
   */
  loseDisabled() {
    let row = this.state.tags || {}
    return (
      !row.isOpen ||
        (row.ifEffectPortrait && row.isInDate) ||
        (row.shareStatus && row.isInDate) ||
        !this.isRolesEq()
    )
  }
  // 提示文案
  loseDisabledTooltipTitle() {
    let row = this.state.tags || {}
    let loseDisabledTooltipTitle
    if (row.isOpen === 0) {
      loseDisabledTooltipTitle = '该标签已失效'
    } else if (row.ifIncludePortrait > 0) {
      loseDisabledTooltipTitle = '已关联画像的标签，无法手动失效'
    } else {
      loseDisabledTooltipTitle = '共享标签，无法手动失效'
    }
    return loseDisabledTooltipTitle
  }

  /**
   * 标签渠道等于登录渠道 true
   */
  isRolesEq() {
    let row = this.state.tags || {}
    return row.channelCode === this.props.Permission.loginedChannel.code
  }
  
  /**
   * 共享是否禁用
   */
  shareDisabled() {
    let row = this.state.tags || {}
    return !row.isOpen || !row.isInDate || !this.isRolesEq(row)
  }
  // 提示文案
  shareDisabledTooltipTitle() {
    let row = this.state.tags || {}
    let shareDisabledTooltipTitle
    if (row.isOpen === 0) {
      shareDisabledTooltipTitle = '标签已失效，无法共享'
    } else if (row.isOpen === 2) {
      shareDisabledTooltipTitle = '标签未生效，无法共享'
    }
    return shareDisabledTooltipTitle
  }

  /**
   * 编辑标签是否禁用
   */
  updateDisabled() {
    let row = this.state.tags || {}
    return (
      (row.ifEffectPortrait && row.isInDate) ||
      row.shareStatus ||
      !row.isOpen ||
      !this.isRolesEq()
    )
  }
  // 提示文案
  updateDisabledTooltipTitle() {
    let row = this.state.tags || {}
    let updateDisabledTooltipTitle
    if (!this.isRolesEq()) {
      updateDisabledTooltipTitle = '非本渠道的标签，无法编辑'
    } else if (row.ifIncludePortrait > 0) {
      updateDisabledTooltipTitle = '已关联画像的标签，无法编辑'
    } else if (row.isOpen === 0) {
      updateDisabledTooltipTitle = '标签已失效，无法编辑'
    } else {
      updateDisabledTooltipTitle = '共享标签，无法编辑'
    }
    return updateDisabledTooltipTitle
  }
  /**
   * 操作按钮禁用状态禁止锚点
   * @param { function } this.loseDisabled 禁用状态
   */
  loseEffect(e) {
    if (!this.loseDisabled()) {
      this.handleStatus()
    } else {
      e.preventDefault()
    }
  }

  render() {
    let tags = this.state.tags
    /**
     * 是否禁用失效
     */
    let loseDisabled = this.loseDisabled()
    let loseDisabledTooltipTitle = this.loseDisabledTooltipTitle()
    /**
     * 是否时本渠道的标签
     */
    let isRolesEq = this.isRolesEq()
  
    /**
     * 共享是否禁用
     */
    let shareDisabled = this.shareDisabled()
    let shareDisabledTooltipTitle = this.shareDisabledTooltipTitle()

    /**
     * 编辑标签是否禁用
     */
    let updateDisabled = this.updateDisabled()
    let updateDisabledTooltipTitle = this.updateDisabledTooltipTitle()
    return (
      <React.Fragment>
        {
        /**
         * 详情按钮
         */
        }
        <Link to={{ pathname: `/label-manage/detail/${tags.id}?clientTotals=${encodeURIComponent(tags.clientTotals)}&isOpen=${encodeURIComponent(tags.isOpen)}`, state: { data: tags }, params: { id: tags.id } }}>
          <SvgIcon iconClass='ope-detail' titleName='查看标签' isTooltip={true} />
        </Link>

        {
          /**
           * 编辑
           */
        }
        {isRolesEq &&
          <React.Fragment>
            <Divider type='vertical' />
            <TooltipCustom title={updateDisabled ? updateDisabledTooltipTitle : undefined} destroyTooltipOnHide>
              <Link
                className='tooltip-link'
                onClick={ e => updateDisabled && e.preventDefault() }
                disabled={updateDisabled}
                to={!updateDisabled &&
              {
                pathname: `/label-manage/add/${tags.id}`,
                state: { data: tags },
                params: { id: tags.id }
              }
                }>
                <SvgIcon iconClass='ope-edit' titleName='编辑标签' isTooltip={!updateDisabled} />
              </Link>
            </TooltipCustom>
          </React.Fragment>
        }

        {
          /**
           * 失效
           */
        }
        <Divider type='vertical' />
        <TooltipCustom title={loseDisabled ? loseDisabledTooltipTitle : undefined} destroyTooltipOnHide>
          <Link className='tooltip-link'
            disabled={loseDisabled}
            onClick={ this.loseEffect }>
            <SvgIcon iconClass='ope-lose' titleName='失效标签' isTooltip={!loseDisabled} />
          </Link>
        </TooltipCustom>
        
        {
          /**
           * 共享
           */
        }
        {isRolesEq &&
          <React.Fragment>
            <Divider type='vertical' />
            <TooltipCustom title={shareDisabled ? shareDisabledTooltipTitle : undefined} destroyTooltipOnHide>
              <Link
                className='tooltip-link'
                disabled={shareDisabled}
                onClick={ e => shareDisabled && e.preventDefault() }
                to={!shareDisabled &&
                {
                  pathname: `/label-manage/enjoy/${tags.id}?tagName=${encodeURIComponent(encodeURIComponent(tags.label))}`,
                  state: { data: tags },
                  params: { id: tags.id }
                }
                }>
                <SvgIcon iconClass='ope-enjoy' titleName='共享标签' isTooltip={!shareDisabled} />
              </Link>
            </TooltipCustom>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}
export default withRouter(LabelButton)