/**
 * 页面子路由配置
 */
import Loadable from 'react-loadable'
import DelayLoading from '@/components/Loading/DelayLoading'

const GroupManageDetail = Loadable({ loader: () => import(/* webpackChunkName: "GroupManageDetail" */ '../pages/Detail'), loading: DelayLoading, delay: 3000 })
const GroupManageAnalysisBi = Loadable({ loader: () => import(/* webpackChunkName: "GroupManageAnalysisBi" */ '../pages/AnalysisBi'), loading: DelayLoading, delay: 3000 })
const GroupManageAnalysisHistory = Loadable({ loader: () => import(/* webpackChunkName: "GroupManageAnalysisHistory" */ '../pages/AnalysisHistory'), loading: DelayLoading, delay: 3000 })
const GroupManageAdd = Loadable({ loader: () => import(/* webpackChunkName: "GroupManageAdd" */ '../pages/Add'), loading: DelayLoading, delay: 3000 })

export default [
  {
    name: '详情',
    path: '/group-manage/detail/:id',
    component: GroupManageDetail
  },
  {
    name: 'BI自助分析',
    path: '/group-manage/analysis-bi/:userGroupId/:historyId?',
    component: GroupManageAnalysisBi
  },
  {
    name: 'BI报表分析历史数据',
    path: '/group-manage/analysis-history/:id',
    component: GroupManageAnalysisHistory,
    cache: {
      livePath: ['/group-manage/analysis-bi/:userGroupId/:historyId?', '/group-manage/add/:userGroupId/:historyId']
    }
  },
  {
    name: '新增用户子群',
    path: '/group-manage/add/:userGroupId/:historyId',
    component: GroupManageAdd
  }
]
