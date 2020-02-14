/**
 * 页面子路由配置
 */
import Loadable from 'react-loadable'
import DelayLoading from '@/components/Loading/DelayLoading'

const Detail = Loadable({ loader: () => import(/* webpackChunkName: "LabelManageDetail" */ '../pages/Detail'), loading: DelayLoading, delay: 3000 })
const Add = Loadable({ loader: () => import(/* webpackChunkName: "LabelManageAdd" */ '../pages/Add'), loading: DelayLoading, delay: 3000 })
const Enjoy = Loadable({ loader: () => import(/* webpackChunkName: "LabelManageEnjoy" */ '../pages/Enjoy'), loading: DelayLoading, delay: 3000 })

export default [
  {
    name: '标签新增',
    path: '/label-manage/add/:id?',
    component: Add
  },
  {
    name: '标签详情',
    path: '/label-manage/detail/:id',
    component: Detail
  },
  {
    name: '标签共享',
    path: '/label-manage/enjoy/:id',
    component: Enjoy
  }
]
