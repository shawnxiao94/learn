/**
  * description: 活动管理 - 操作按钮
  * author: Emma
  */
import React, { PureComponent } from 'react'
import { Divider, Modal, notification, Popover } from 'antd'
import TooltipCustom from '@/components/UI/TooltipCustom'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import SvgIcon from '@/components/SvgIcon'
import { inject } from 'mobx-react'
import * as api from '@/modules/UserPortrait/data/api/ActivityManage'
 
const { confirm } = Modal
 
 @inject('Permission')
class Button extends PureComponent {
   static contextTypes = {
     // 刷新列表
     refreshActivityManage: PropTypes.func
   }
   constructor(props) {
     super(props)
     
     /**
      * 点击结束失效
      */
     this.invalidChick = this.invalidChick.bind(this)
     /**
      * 点击文件生成
      */
     this.generateFileChick = this.generateFileChick.bind(this)
     
   }
 
   /**
    * 新增子活动 - 判断新增按钮是否隐藏、展示
    */
   addSubActivity() {
     let data = this.props.data || {}
     if (
       (!Number(data.parentId) &&
           Number(data.status) !== 0 &&
           Number(data.status) !== 3 &&
           !!Number(data.userGroupId) &&
           (!data.children ||
             (data.children && data.children.length < 3))) ||
         (!Number(data.parentId) &&
           Number(data.status) !== 0 &&
           !Number(data.userGroupId)) ||
         (!Number(data.parentId) &&
           (Number(data.status) === 0 || Number(data.status) === 3)) ||
         (!Number(data.parentId) &&
           Number(data.status) !== 0 &&
           Number(data.status) !== 3 &&
           !!Number(data.userGroupId) &&
           !(
             !data.children ||
             (data.children && data.children.length < 3)
           ))
     ) {
       return true
     } else {
       return false
     }
   }
   
   /**
    * 新增子活动 - 禁用子活动判断
    */
   addSubActivityDisabled() {
     let data = this.props.data || {}
     if (
       !(!Number(data.parentId) &&
       Number(data.status) !== 0 &&
       Number(data.status) !== 3 &&
       !!Number(data.userGroupId) &&
       (!data.children ||
       (data.children && data.children.length < 3)))
     ) {
       return true
     } else {
       return false
     }
   }
 
   /**
    * 新增子活动 - 提示文案
    */
   addSubActivityDisabledTooltipTitle() {
     let data = this.props.data || {}
     let addSubActivityDisabledTooltipTitle
     /**
      * 请先点击主活动的编辑按钮，关联用户群
      */
     if (
       !Number(data.parentId) &&
       Number(data.status) !== 0 &&
       Number(data.status) !== 3 &&
       !Number(data.userGroupId)
     ) {
       addSubActivityDisabledTooltipTitle = '请先点击主活动的编辑按钮，关联用户群'
     }
     /**
      * 状态提示
      */
     if (
       !Number(data.parentId) &&
       (Number(data.status) === 0 || Number(data.status) === 3)
     ) {
       if (Number(data.status) === 0) {
         addSubActivityDisabledTooltipTitle = '活动已结束'
       } else {
         addSubActivityDisabledTooltipTitle = '活动已满期'
       }
     }
     /**
      * 新增子活动最多三条
      */
     if (
       !Number(data.parentId) &&
       Number(data.status) !== 0 &&
       Number(data.status) !== 3 &&
       !!Number(data.userGroupId) &&
       !(
         !data.children ||
         (data.children && data.children.length < 3)
       )
     ) {
       addSubActivityDisabledTooltipTitle = '新增子活动最多三条'
     }
     return addSubActivityDisabledTooltipTitle
   }
 
   /**
    * 编辑主活动/编辑子活动 - 禁用主活动判断
    */
   updMainActivityDisabled() {
     let data = this.props.data || {}
     if (Number(data.status) === 0) {
       return true
     } else {
       return false
     }
   }
 
   /**
    * 编辑主活动/编辑子活动 - 提示文案
    */
   updMainActivityDisabledTooltipTitle() {
     return '活动已结束'
   }
 
   /**
    * 活动图表数据 - 禁用图表数据判断
    */
   viewDataDisabled() {
     let data = this.props.data || {}
     if (data.parentId === 0) {
       //  !data.children ||
       if (
         Number(data.status) === 4 ||
           Number(data.status) === 2
       ) {
         return false
       } else {
         return true
       }
     } else if (data.parentId !== 0) {
       if (Number(data.status) === 4 || Number(data.status) === 2) {
         return false
       } else {
         return true
       }
     }
   }
 
   /**
    * 活动图表数据 - 提示文案
    */
   viewDataDisabledTooltipTitle() {
     let data = this.props.data || {}
     let viewDataDisabledTooltipTitle
     if (Number(data.status) === 4) {
       viewDataDisabledTooltipTitle = '请先关联用户群'
     } else if (Number(data.status) === 2) {
       viewDataDisabledTooltipTitle = '活动未开始，无法查看'
     }
     //  else if (!data.children) {
     //    viewDataDisabledTooltipTitle = '请先创建子活动'
     //  }
     return viewDataDisabledTooltipTitle
   }
 
   /**
    * 活动失效操作 - 禁用活动失效操作判断
    */
   invalidDisable() {
     let row = this.props.data || {}
     if (Number(row.parentId) === 0) {
       if (Number(row.status) === 0 || Number(row.status) === 3) {
         return false
       } else {
         if (row.children && Number(row.status) !== 0) {
           let childStatus = row.children.every(item => {
             return Number(item.status) === 0
           })
           return childStatus
         } else if (row.children && Number(row.status) === 0) {
           return false
         } else if (!row.children && Number(row.status) !== 0) {
           return true
         }
       }
     } else if (Number(row.parentId) !== 0) {
       if (Number(row.status) !== 0 && Number(row.status) !== 3) {
         return true
       }
     }
   }
   
   /**
    * 活动失效操作 - 提示文案
    */
   invalidDisableTooltipTitle() {
     let data = this.props.data || {}
     let invalidDisableTooltipTitle
     if (Number(data.status) === 0) {
       invalidDisableTooltipTitle = '活动已结束'
     } else if (Number(data.status) === 3) {
       invalidDisableTooltipTitle = '活动已满期'
     } else if (!this.allChildFinish(data)) {
       invalidDisableTooltipTitle = '请先结束子活动'
     }
     return invalidDisableTooltipTitle
   }
 
   /**
    * 活动失效操作 - 判断所有子活动是否全部结束
    */
   allChildFinish(row) {
     let childStatus = false
     if (row.children) {
       childStatus = row.children.every(item => {
         return Number(item.status) === 0
       })
     } else {
       childStatus = false
     }
    
     return childStatus
   }
   
   /**
    * 生成文件 - 禁用判断
    */
   generateFileDisable() {
     let data = this.props.data || {}
     if (data.fileBuildStatus === '0' || data.filePath) {
       return true
     } else {
       return false
     }
   }
 
   /**
    * 生成文件 - 判断生成文件按钮是否隐藏、展示
    */
   generateFileDisableTooltipTitle() {
     let data = this.props.data || {}
     let generateFileDisableTooltipTitle
     /**
      * 请先点击主活动的编辑按钮，关联用户群
      */
     if (data.fileBuildStatus === '0') {
       generateFileDisableTooltipTitle = '文件正在生成'
     } else if (data.filePath) {
       generateFileDisableTooltipTitle = '文件已生成'
     }
     return generateFileDisableTooltipTitle
   }
 
   /**
    * 点击文件生成
    */
   generateFileChick() {
     let data = this.props.data || {}
     let self = this
     api
       .generateFormData({ marketActivitiesId: data.id })
       .then(res => {
         if (res.Result.errCode === 0) {
           if (Number(res.Result.data.fileBuildStatus) === 0) {
             // 操作成功
             notification['success']({
               message: '提示',
               description: '文件生成中'
             })
           } else if (Number(res.Result.data.fileBuildStatus) === 1) {
             // 操作成功
             notification['success']({
               message: '提示',
               description: '文件已生成'
             })
           }
           self.context.refreshActivityManage && self.context.refreshActivityManage()
         }
       })
       .catch(() => {
         // 操作失败
         notification['error']({
           message: '提示',
           description: '文件生成失败'
         })
       })
       .finally()
   }
   
   /**
    * 点击结束失效
    */
   invalidChick() {
     let row = this.props.data || {}
     let self = this
     // 是否失效失效该活动提示
     confirm({
       title: '结束活动',
       content: '此操作会结束活动，是否继续？',
       okText: '确定',
       cancelText: '取消',
       icon: <SvgIcon iconClass='tip-error' />,
       onOk() {
         api
           .disableActivityData({ actId: row.id })
           .then(res => {
             if (res.Result.data.msg && res.Result.data.code === 2) {
               // 操作失败
               notification['error']({
                 message: '提示',
                 description: res.Result.data.msg
               })
             } else {
               // 操作成功
               notification['success']({
                 message: '提示',
                 description: '操作成功'
               })
               self.context.refreshActivityManage && self.context.refreshActivityManage()
             }
           })
           .catch(() => {
             // 操作失败
             notification['error']({
               message: '提示',
               description: '操作失败'
             })
           })
       },
       onCancel() {
       }
     })
   }
   
   render() {
     let row = this.props.data || {}
 
     /**
      * 新增子活动
      */
     let addSubActivityDisabled = this.addSubActivityDisabled()
     let addSubActivityDisabledTooltipTitle = this.addSubActivityDisabledTooltipTitle()
     let addSubActivity = this.addSubActivity()
 
     /**
      *  编辑主活动/编辑子活动
      */
     let updMainActivityDisabled = this.updMainActivityDisabled()
     let updMainActivityDisabledTooltipTitle = this.updMainActivityDisabledTooltipTitle()
     
     /**
      *  活动图表数据查看
      */
     let viewDataDisabled = this.viewDataDisabled()
     let viewDataDisabledTooltipTitle = this.viewDataDisabledTooltipTitle()
 
     /**
      * 活动结束 - 失效ope-stop
      */
     let invalidDisable = this.invalidDisable()
     let invalidDisableTooltipTitle = this.invalidDisableTooltipTitle()
 
     /**
      * 生成文件
      */
     let generateFileDisable = this.generateFileDisable()
     let generateFileDisableTooltipTitle = this.generateFileDisableTooltipTitle()
     
     return (
       <React.Fragment>
         {
           /**
            * 新增子活动
            */
         }
         {addSubActivity &&
         <React.Fragment>
           <TooltipCustom title={addSubActivityDisabled ? addSubActivityDisabledTooltipTitle : undefined} destroyTooltipOnHide>
             <Link
               className='tooltip-link'
               disabled={addSubActivityDisabled}
               to={!addSubActivityDisabled &&
                 {
                   pathname: `/activity-manage/add-sub-activity/?parentId=${encodeURIComponent(row.id)}`,
                   state: { data: row },
                   params: { id: row.id }
                 }
               }>
               <SvgIcon iconClass='ope-add' titleName='新增子活动' isTooltip={!addSubActivityDisabled} />
             </Link>
           </TooltipCustom>
           <Divider type='vertical' />
         </React.Fragment>
         }
 
         {
           /**
            * 编辑子活动
            */
         }
         {!!Number(row.parentId) && <React.Fragment>
           <TooltipCustom title={updMainActivityDisabled ? updMainActivityDisabledTooltipTitle : undefined} destroyTooltipOnHide>
             <Link
               className='tooltip-link'
               disabled={updMainActivityDisabled}
               to={!updMainActivityDisabled &&
                 {
                   pathname: `/activity-manage/add-sub-activity/${row.id}`,
                   state: { data: row },
                   params: { id: row.id }
                 }
               }>
               <SvgIcon iconClass='ope-edit' titleName='编辑子活动' isTooltip={!updMainActivityDisabled} />
             </Link>
           </TooltipCustom>
           <Divider type='vertical' />
         </React.Fragment>}
 
         {
           /**
            * 编辑主活动
            */
         }
         {!Number(row.parentId) && <React.Fragment>
           <TooltipCustom title={updMainActivityDisabled ? updMainActivityDisabledTooltipTitle : undefined} destroyTooltipOnHide>
             <Link
               className='tooltip-link'
               disabled={updMainActivityDisabled}
               to={!updMainActivityDisabled &&
                 {
                   pathname: `/activity-manage/add/${row.id}`,
                   state: { data: row },
                   params: { id: row.id }
                 }
               }>
               <SvgIcon iconClass='ope-edit' titleName='编辑主活动' isTooltip={!updMainActivityDisabled} />
             </Link>
           </TooltipCustom>
         </React.Fragment>}
 
         {
           /**
            * 详情主活动/详情子活动
            */
           <React.Fragment>
             <Divider type='vertical' />
             <Link
               className='tooltip-link'
               to={(row.parentId) ? {
                 pathname: `/activity-manage/detail-sub-activity/${row.id}`,
                 state: { data: row },
                 params: { id: row.id }
               } : {
                 pathname: `/activity-manage/detail/${row.id}`,
                 state: { data: row },
                 params: { id: row.id }
               }}>
               <SvgIcon iconClass='ope-detail' titleName='查看详情' isTooltip={true} />
             </Link>
           </React.Fragment>
         }
         {
           /**
            * 活动图表数据查看
            */
         }
         <React.Fragment>
           <Divider type='vertical' />
           <TooltipCustom title={!viewDataDisabled ? viewDataDisabledTooltipTitle : undefined} destroyTooltipOnHide>
             <Link
               className='tooltip-link'
               disabled={!viewDataDisabled}
               to={viewDataDisabled &&
                 {
                   pathname: `/activity-manage/view-data/${row.id}/${row.parentId}`
                 }
               }>
               <SvgIcon iconClass='ope-view' titleName='查看数据' isTooltip={viewDataDisabled} />
             </Link>
           </TooltipCustom>
           <Divider type='vertical' />
         </React.Fragment>
         
         {
           /**
            * 活动结束 - 失效ope-stop
            */
        
           // <React.Fragment>
           //   <Divider type='vertical' />
           //   <TooltipCustom title={!invalidDisable ? invalidDisableTooltipTitle : undefined} destroyTooltipOnHide>
           //     <Link
           //       className='tooltip-link'
           //       disabled={!invalidDisable}
           //       onClick={invalidDisable && this.invalidChick}>
           //       <SvgIcon iconClass='ope-stop' />
           //     </Link>
           //   </TooltipCustom>
           // </React.Fragment>
         }
         {
           /**
            *  生成文件
            */
        
           // <React.Fragment>
           //   <Divider type='vertical' />
           //   <TooltipCustom title={generateFileDisable ? generateFileDisableTooltipTitle : undefined} destroyTooltipOnHide>
           //     <Link
           //       className='tooltip-link'
           //       disabled={generateFileDisable}
           //       onClick={!generateFileDisable && this.generateFileChick}>
           //       <SvgIcon iconClass='ope-export' />
           //     </Link>
           //   </TooltipCustom>
           // </React.Fragment>
         }
         {
           /**
            * 更多
            */
         }
         <React.Fragment>
           <Popover placement='left' content={
             <div className='popover-btn-mgr'>
               {
                 //  <div className='btn-space-ud'>
                 //    <React.Fragment>
                 //      <Link
                 //        className='tooltip-link'
                 //        to={(row.parentId) ? {
                 //          pathname: `/activity-manage/detail-sub-activity/${row.id}`,
                 //          state: { data: row },
                 //          params: { id: row.id }
                 //        } : {
                 //          pathname: `/activity-manage/detail/${row.id}`,
                 //          state: { data: row },
                 //          params: { id: row.id }
                 //        }}>
                 //        <SvgIcon iconClass='ope-detail' />
                 //     详情
                 //      </Link>
                 //    </React.Fragment>
                 //  </div>
               }
               <div className='btn-space-ud'>
                 <React.Fragment>
                   <TooltipCustom title={generateFileDisable ? generateFileDisableTooltipTitle : undefined} destroyTooltipOnHide>
                     <Link
                       className='tooltip-link'
                       disabled={generateFileDisable}
                       onClick={!generateFileDisable && this.generateFileChick}>
                       <SvgIcon iconClass='ope-export' />
                       生成
                     </Link>
                   </TooltipCustom>
                 </React.Fragment>
               </div>
               <div>
                 <React.Fragment>
                   <TooltipCustom title={!invalidDisable ? invalidDisableTooltipTitle : undefined} destroyTooltipOnHide>
                     <Link
                       className='tooltip-link'
                       disabled={!invalidDisable}
                       onClick={invalidDisable && this.invalidChick}>
                       <SvgIcon iconClass='ope-stop' />
                       停止
                     </Link>
                   </TooltipCustom>
                 </React.Fragment>
               </div>
             </div>
           } trigger='click'>
             <Link className='tooltip-link'>
               <SvgIcon iconClass='ope-more' />
             </Link>
           </Popover>
         </React.Fragment>
 
       </React.Fragment>
     )
   }
 }
export default withRouter(Button)