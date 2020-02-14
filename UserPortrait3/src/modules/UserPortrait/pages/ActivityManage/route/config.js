/**
 * 页面子路由配置
 */
import Loadable from 'react-loadable'
import DelayLoading from '@/components/Loading/DelayLoading'

const Detail = Loadable({ loader: () => import(/* webpackChunkName: "ActivityManageDetail" */ '../pages/Detail'), loading: DelayLoading, delay: 3000 })
const DetailSubActivity = Loadable({ loader: () => import(/* webpackChunkName: "ActivityManageDetailSubActivity" */ '../pages/DetailSubActivity'), loading: DelayLoading, delay: 3000 })
const Add = Loadable({ loader: () => import(/* webpackChunkName: "ActivityManageAdd" */ '../pages/Add'), loading: DelayLoading, delay: 3000 })
const AddSubActivity = Loadable({ loader: () => import(/* webpackChunkName: "ActivityManageAdd" */ '../pages/AddSubActivity'), loading: DelayLoading, delay: 3000 })
const ViewData = Loadable({ loader: () => import(/* webpackChunkName: "ActivityManageAdd" */ '../pages/ViewData'), loading: DelayLoading, delay: 3000 })

export default [
  {
    name: '详情',
    path: '/activity-manage/detail/:id',
    component: Detail
  },
  {
    name: '新增',
    path: '/activity-manage/add/:id?',
    component: Add
  },
  {
    name: '子活动详情',
    path: '/activity-manage/detail-sub-activity/:id',
    component: DetailSubActivity
  },
  {
    name: '子活动新增',
    path: '/activity-manage/add-sub-activity/:id?',
    component: AddSubActivity
  },
  {
    name: '活动报表分析',
    path: '/activity-manage/view-data/:marketId/:parentId?',
    component: ViewData
  }
]
