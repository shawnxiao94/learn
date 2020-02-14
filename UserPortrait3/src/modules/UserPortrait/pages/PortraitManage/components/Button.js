/**
  * description: 画像管理 - 操作按钮组件
  * author: Cathy
  * update: 注释 by Cathy 2019-09-09
  */
import React, { Component } from 'react'
import { Divider, message, Modal } from 'antd'
import TooltipCustom from '@/components/UI/TooltipCustom'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as api from '@/modules/UserPortrait/data/api/PortraitManage/Button'
import SvgIcon from '@/components/SvgIcon'
import { inject } from 'mobx-react'
import moment from 'moment'
const { confirm } = Modal

@inject('Permission')
class GroupButton extends Component {
  static contextTypes = {
    refreshPortraitManage: PropTypes.func
  }
  constructor(props) {
    super(props)
    // 禁用
    this.handleProhibit = this.handleProhibit.bind(this)
    // 禁止锚点
    this.loseEffect = this.loseEffect.bind(this)
  }
  /**
   * 禁用按钮
   */
  handleProhibit() {
    let self = this
    confirm({
      title: '失效',
      content: '此操作将失效该画像，是否继续？',
      okText: '确定',
      cancelText: '取消',
      icon: <SvgIcon iconClass='tip-error' />,
      onOk() {
        api.disableData({
          portraitId: self.props.data.id,
          createUser: 'admin'
        })
          .then(() => {
            message.success('操作成功')
            self.refreshPortraitManage()
          })
          .catch(() => {
            message.error('操作失败')
          })
          .finally(() => {})
      },
      onCancel() {}
    })
  }
  /**
   * 刷新画像管理列表
   */
  refreshPortraitManage() {
    this.context.refreshPortraitManage()
  }
  
  /**
   * 编辑禁用逻辑
   * @param  {Object} row 列表字段信息
   */
  editOrLoseDisabled() {
    let row = this.props.data
    if (Number(row.status) === 0) {
      return true
    } else if (this.props.Permission.loginedChannel.code === '00') {
      if (row.channelCode === '00') {
        return false
      } else {
        return true
      }
    } else if (Number(row.shareFlag) === 1) {
      return true
    }
  }
  // 编辑提示文本
  editOrLoseDisabledTooltipTitle() {
    let row = this.props.data
    let title
    if (!this.isRolesEq()) {
      title = '非本渠道的画像，无法编辑'
    } else if (Number(row.shareFlag) === 1) {
      title = '共享用户期间，无法编辑'
    } else {
      title = '该画像已经失效，无法编辑'
    }
    return title
  }
  
  /**
   * 失效禁用逻辑
   * @param  {Object} row 列表字段信息
   */
  loseDisabled() {
    let row = this.props.data
    if (Number(row.status) === 0) {
      return true
    } else if (this.props.Permission.loginedChannel.code === '00') {
      if (row.channelCode === '00') {
        return false
      } else {
        return true
      }
    } else if (Number(row.shareFlag) === 1) {
      return true
    }
  }
  // 失效提示文本
  loseDisabledTooltipTitle() {
    let row = this.props.data
    let title
    if (!this.isRolesEq()) {
      title = '非本渠道的画像，无法失效'
    } else if (Number(row.shareFlag) === 1) {
      title = '共享用户期间，无法手动失效'
    } else {
      title = '该画像已失效'
    }
    return title
  }

  /**
   * 标签渠道等于登录渠道 true
   */
  isRolesEq() {
    let row = this.props.data || {}
    return row.channelCode === this.props.Permission.loginedChannel.code
  }

  /**
   * 渠道用户共享画像禁用逻辑：1、画像未生效，2、画像已失效，3、当天创建的画像
   * @param  {Object} row 列表字段信息
   */
  enjoyDisabled() {
    let row = this.props.data
    if (
      Number(row.status) === 0 ||
      Number(row.status) === 2 ||
      moment(row.crtTime)
        .startOf('day')
        .valueOf() ===
        moment()
          .startOf('day')
          .valueOf()
    ) {
      return true
    }
  }
  // 提示文本
  enjoyDisabledTooltipTitle() {
    let row = this.props.data
    let title
    if (Number(row.status) === 0) {
      title = '画像已失效，无法共享用户'
    } else if (Number(row.status) === 2) {
      title = '画像未生效，无法共享用户'
    } else {
      title = '当天创建的画像，无法共享用户'
    }
    return title
  }
  /**
   * 操作按钮禁用状态禁止锚点
   * @param { function } this.loseDisabled 禁用状态
   */
  loseEffect(e) {
    if (!this.loseDisabled()) {
      this.handleProhibit()
    } else {
      e.preventDefault()
    }
  }
  render() {
    /**
     * 编辑禁用逻辑
     */
    let editOrLoseDisabled = this.editOrLoseDisabled()
    let editOrLoseDisabledTooltipTitle = this.editOrLoseDisabledTooltipTitle()

    /**
     * 失效禁用逻辑
     */
    let loseDisabled = this.loseDisabled()
    let loseDisabledTooltipTitle = this.loseDisabledTooltipTitle()

    /**
     * 渠道用户共享画像禁用逻辑
     */
    let enjoyDisabled = this.enjoyDisabled()
    let enjoyDisabledTooltipTitle = this.enjoyDisabledTooltipTitle()

    let data = this.props.data
    return (
      <React.Fragment>
        {
          /**
           * 编辑
           */
        }
        <React.Fragment>
          <TooltipCustom title={editOrLoseDisabled ? editOrLoseDisabledTooltipTitle : undefined} destroyTooltipOnHide>
            <Link
              onClick={ e => { editOrLoseDisabled && e.preventDefault() }}
              className='tooltip-link'
              disabled={editOrLoseDisabled}
              to={!editOrLoseDisabled &&
                  {
                    pathname: `/portrait-manage/add/${data.id}`,
                    state: { data: data },
                    params: { id: data.id }
                  }
              }>
              <SvgIcon iconClass='ope-edit' titleName='编辑画像' isTooltip={!editOrLoseDisabled} />
            </Link>
          </TooltipCustom>
          <Divider type='vertical' />
        </React.Fragment>

        {
          /**
           * 失效
           */
        }
        <TooltipCustom title={loseDisabled ? loseDisabledTooltipTitle : undefined} destroyTooltipOnHide>
          <Link
            className='tooltip-link'
            disabled={loseDisabled}
            onClick={ this.loseEffect }>
            <SvgIcon iconClass='ope-lose' titleName='失效画像' isTooltip={!loseDisabled} />
          </Link>
        </TooltipCustom>
        <Divider type='vertical' />

        {
          /**
           * 详情
           */
        }
        <Link
          to={{
            pathname: `/portrait-manage/detail/${data.id}`,
            state: { data: data },
            params: { id: data.id }
          }}
          key={data.id}>
          <SvgIcon iconClass='ope-detail' titleName='查看画像详情' isTooltip={true} />
        </Link>
        <Divider type='vertical' />
        
        {
          /**
           * 共享
           */
        }
        <React.Fragment>
          <TooltipCustom title={enjoyDisabled ? enjoyDisabledTooltipTitle : undefined} destroyTooltipOnHide>
            <Link
              className='tooltip-link'
              disabled={enjoyDisabled}
              onClick={ e => { enjoyDisabled && e.preventDefault() }}
              to={!enjoyDisabled &&
                {
                  pathname: `/portrait-manage/enjoy/${data.id}?portraitName=${encodeURIComponent(data.portraitName)}?startDate=${encodeURIComponent(data.effDate)}?endDate=${encodeURIComponent(data.expDate)}`,
                  state: { data: data },
                  params: { id: data.id }
                }
              }
              key={data.id}
            >
              <SvgIcon iconClass='ope-enjoy' titleName='共享用户' isTooltip={!enjoyDisabled} />
            </Link>
          </TooltipCustom>
        </React.Fragment>
        
        {
          /**
           * 画像
           */
          
          // <Divider type='vertical' />
          // <Link>
          //   <SvgIcon iconClass='ope-group' />
          // </Link>
        }
      </React.Fragment>
    )
  }
}
export default GroupButton